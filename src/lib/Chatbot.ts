import { projectStore, skillsAndExperienceStore } from "$lib/stores";
import { get } from "svelte/store";

export class Chatbot {
    public awaitingAssistantResponse: boolean = false;

    public messages: { role: string; name?: string; content: string; function_call?: { name: any; arguments: any; } }[] = [
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

    private function_jsons: any[] = [
        {
            "name": "alert_message",
            "description": "Calls alert() in the browser.",
            "parameters": {
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string",
                        "description": "The message to be passed to alert().",
                    },
                },
                "required": ["message"],
            },
        },
        {
            "name": "randomize_cards_order",
            "description": "Randomizes the order of the cards on the page.",
            "parameters": {
                "type": "object",
                "properties": {},
                "required": [],
            },
        },
        {
            "name": "expand_cards",
            "description": "Expands all the cards on the page.",
            "parameters": {
                "type": "object",
                "properties": {},
                "required": [],
            },
        },
        {
            "name": "collapse_cards",
            "description": "Collapses all the cards on the page.",
            "parameters": {
                "type": "object",
                "properties": {},
                "required": [],
            },
        },
    ]

    private functions: { [key: string]: (...args: any[]) => string } = {
        "alert_message": this.alert_message,
        "randomize_cards_order": this.randomizeCardsOrder,
        "expand_cards": this.expandCards,
        "collapse_cards": this.collapseCards,
    };


    private alert_message(message: string): string {
        alert(message);
        return `Done.`;
    }

    private randomizeCardsOrder(): string {
        const projects = get(projectStore);
        const skillsAndExperience = get(skillsAndExperienceStore);
        projectStore.set(projects.sort(() => Math.random() - 0.5));
        skillsAndExperienceStore.set(skillsAndExperience.sort(() => Math.random() - 0.5));

        return `Done.`;
    }

    private expandCards() {
        const projects = get(projectStore);
        const skillsAndExperience = get(skillsAndExperienceStore);
        projectStore.set(projects.map((card) => {
            card.isExpanded = true;
            return card;
        }));
        skillsAndExperienceStore.set(skillsAndExperience.map((card) => {
            card.isExpanded = true;
            return card;
        }));

        return `Done.`;
    }

    private collapseCards() {
        const projects = get(projectStore);
        const skillsAndExperience = get(skillsAndExperienceStore);
        projectStore.set(projects.map((card) => {
            card.isExpanded = false;
            return card;
        }));
        skillsAndExperienceStore.set(skillsAndExperience.map((card) => {
            card.isExpanded = false;
            return card;
        }));

        return `Done.`;
    }

    constructor(messages?: { role: string; content: string; }[]) {
        if (messages) this.messages = messages;
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
        this.messages.push({ role: "user", content: message })
    }

    public async generateResponse(
        model: string = "gpt-4"
    ) {
        let response: { [key: string]: any } = await this.chatCompletionRequest(this.messages, this.function_jsons);
        let message = response["message"];
        this.messages.push(message);

        // function handling
        if (response["finish_reason"] === "function_call") {
            let func_name = response["message"]["function_call"]["name"];
            let func = this.functions[func_name];
            let func_args = JSON.parse(response["message"]["function_call"]["arguments"]);
            console.log("Function call: " + func_name);
            let func_response = func.apply(null, Object.values(func_args));
            this.messages.push({
                role: "function",
                name: func_name,
                content: func_response,
            });

            await this.generateResponse();
            console.log(this.messages);
        } else if (response["finish_reason"] === "stop") {
            // message already appended
        } else {
            console.error("Unhandled finish reason");
        }
    }
}
