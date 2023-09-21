import { get, writable, type Writable } from "svelte/store";
import * as ChatbotFunctionJsons from "./ChatbotFunctionJsons";
import * as ChatbotFunctions from "./ChatbotFunctions";
import { projectStore, skillsAndExperienceStore } from "./stores";

export class Chatbot {
    public awaitingAssistantResponse: boolean = false;

    public messageStore: Writable<{ role: string; name?: string; content: string; function_call?: { name: any; arguments: any; } }[]> = writable([
        {
            role: "system",
            content: "You are SethGPT, the AI guide on Seth's portfolio website. Provide information about Seth based on function calls, drawing from the portfolio cards. If you lack specific information or access, notify the user. Respond in markdown and do not show media."
        },
        {
            role: "system",
            content: "The portfolio layout consists of three columns, each containing cards. Column 1: You, the SethGPT chatbot card. Column 2: Cards detailing Seth's personal projects. Column 3: Cards showcasing Seth's skills and work experience. The next system message will show the current state of the portfolio, updated dynamically with user interactions. Use it to understand the layout and the user's current focus; you are able to see which cards are expanded at any given time."
        },
        {
            role: "system",
            content: "ERROR: This message is meant to contain the current layout of the cards on the site. If you are seeing this message, then card layout retrieval failed."
        },
        {
            role: "assistant",
            content: "Hello!"
        },
        {
            role: "assistant",
            content: "I'm SethGPT, your guide through the cards on Seth's portfolio."
        },
        {
            role: "assistant",
            content: "Feel free to ask about any of Seth's projects, skills, or experience you're curious about!"
        }
    ]);

    private updateCardLayoutMessage() {
        // get the current card layout
        const cardLayout: string = JSON.stringify({
            projects: get(projectStore).map(card => ({ ...card, content: "" })),
            skillsAndExperience: get(skillsAndExperienceStore).map(card => ({ ...card, content: "<call `get_card_content` to view contents>" }))
        });

        // update the message store with the current card layout
        this.messageStore.update(messages => {
            messages[2].content = cardLayout;
            return messages;
        });
    }

    constructor() {
        // Initial card layout message update
        this.updateCardLayoutMessage();

        // Card layout message update on projectStore change
        projectStore.subscribe(() => this.updateCardLayoutMessage());

        // Card layout message update on skillsAndExperienceStore change
        skillsAndExperienceStore.subscribe(() => this.updateCardLayoutMessage());
    }

    private function_jsons: any[] = [
        ChatbotFunctionJsons.getCardContentJson,
        ChatbotFunctionJsons.focusCardJson,
        ChatbotFunctionJsons.setCardExpandedJson,
        ChatbotFunctionJsons.highlightCardJson,
        ChatbotFunctionJsons.setProjectCardsOrderJson,
        ChatbotFunctionJsons.setSkillsAndExperienceCardsOrderJson,
    ]

    private functions: { [key: string]: (...args: any[]) => string } = {
        "get_card_content": ChatbotFunctions.getCardContent,
        "focus_card": ChatbotFunctions.focusCard,
        "set_card_expanded": ChatbotFunctions.setCardExpanded,
        "set_project_cards_order": ChatbotFunctions.setProjectCardsOrder,
        "set_skills_experience_cards_order": ChatbotFunctions.setSkillsAndExperienceCardsOrder,
        "highlight_card": ChatbotFunctions.highlightCard,
    };

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
