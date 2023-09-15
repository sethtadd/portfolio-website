import { get, writable } from "svelte/store";
import * as ChatbotFunctionJsons from "./ChatbotFunctionJsons";
import * as ChatbotFunctions from "./ChatbotFunctions";

export class Chatbot {
    public awaitingAssistantResponse: boolean = false;

    private initialMessages: { role: string; name?: string; content: string; function_call?: { name: any; arguments: any; } }[] = [
        {
            role: "system",
            content:
                "You are an AI assistant named SethGPT. You live in the real Seth's portfolio website and help users interested in Seth's projects get to know him. Do not make up information or hypotheticals about Seth, only use information provided through function calls. If you don't have access to info or don't know the answer, say so. Instead of dumping information onto the user, ask the user more details about what they want to know so that you can narrow down the length your responses to be more concise.",
        },
        {
            role: "system",
            content: "Your job is also to rearrange and emphasize parts of the website for users. You can use function calls to accomplish this.",
        },
        {
            role: "assistant",
            content: "Hi, I'm Seth",
        },
        {
            role: "assistant",
            content:
                "Just kidding! It's not actually me, just my placeholder, SethGPT. BUT! I can tell you all about Seth's interests and skills and direct you to projects he's worked on :)",
        },
        {
            role: "assistant",
            content:
                'Feel free to ask me questions like "show me a random project" or "tell me about his skills"',
        },
    ];

    public messageStore = writable(this.initialMessages);

    private function_jsons: any[] = [
        ChatbotFunctionJsons.getCardsLayoutJson,
        ChatbotFunctionJsons.getCardContentJson,
        ChatbotFunctionJsons.focusCardJson,
        ChatbotFunctionJsons.setCardExpandedJson,
        ChatbotFunctionJsons.highlightCardJson,
        ChatbotFunctionJsons.setProjectCardsOrderJson,
        ChatbotFunctionJsons.setSkillsAndExperienceCardsOrderJson,
    ]

    private functions: { [key: string]: (...args: any[]) => string } = {
        "get_cards_layout": ChatbotFunctions.getCardsLayout,
        "get_card_content": ChatbotFunctions.getCardContent,
        "focus_card": ChatbotFunctions.focusCard,
        "set_card_expanded": ChatbotFunctions.setCardExpanded,
        "set_project_cards_order": ChatbotFunctions.setProjectCardsOrder,
        "set_skills_and_experience_cards_order": ChatbotFunctions.setSkillsAndExperienceCardsOrder,
        "highlight_card": ChatbotFunctions.highlightCard,
    };

    constructor(messages?: { role: string; content: string; }[]) {
        if (messages) this.messageStore.set(messages);
    }

    public async chatCompletionRequest(
        messages: any[],
        functions?: any,
        functionCall?: any,
        model: string = "gpt-4"
    ): Promise<object> {
        const headers = {
            "Content-Type": "application/json",
        };

        let json_data: any = {
            model: model,
            messages: messages,
        };

        if (functions) {
            json_data.functions = functions;
        }

        if (functionCall) {
            json_data.functionCall = functionCall;
        }

        try {
            const response = await fetch(
                "https://openaiproxy-3j6yohvq7a-uc.a.run.app/sethgpt",
                {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(json_data),
                }
            );

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error("Network response was not ok");
            }
        } catch (e) {
            console.error("Unable to generate ChatCompletion response");
            console.error(`Exception: ${e}`);
            return Object(e);
        }
    }

    public appendUserMessage(message: string) {
        // TODO dompurify this
        this.messageStore.update(messages => [...messages, { role: "user", content: message }]);
    }

    public async generateResponse(
        model: string = "gpt-4"
    ) {
        try {
            let response: { [key: string]: any } = await this.chatCompletionRequest(get(this.messageStore), this.function_jsons, model);

            // TODO have API forward raw OpenAI response, use this line once that's done
            // response = response["choices"][0];
            let message = response["message"];
            this.messageStore.update(messages => [...messages, message]);

            // function handling
            if (response["finish_reason"] === "function_call") {
                let func_name = response["message"]["function_call"]["name"];
                let func = this.functions[func_name];
                let func_args = JSON.parse(response["message"]["function_call"]["arguments"]);
                let func_response = func(...Object.values(func_args));
                this.messageStore.update(messages => [...messages, {
                    role: "function",
                    name: func_name,
                    content: func_response,
                }]);

                await this.generateResponse();
            } else if (response["finish_reason"] === "stop") {
                // message already appended
            } else {
                console.error("Unhandled finish reason:", response.finish_reason);
            }
        } catch (error) {
            console.error("Error in generateResponse: " + error);
        }
    }
}
