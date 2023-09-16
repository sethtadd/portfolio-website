export const focusCardJson = {
    "name": "focus_card",
    "description": "Brings a specific card to prominence by moving it to the top, expanding it, and highlighting it.",
    "parameters": {
        "type": "object",
        "properties": {
            "card_title": {
                "type": "string",
                "description": "Title of the target card.",
            },
        },
        "required": ["card_title"],
    },
}


export const getCardContentJson = {
    "name": "get_card_content",
    "description": "Fetches content of a specified card. While discussing a card, briefly summarize and offer more details if the user is interested. Typically focus_card should be called alongside this function.",
    "parameters": {
        "type": "object",
        "properties": {
            "card_title": {
                "type": "string",
                "description": "Title of the target card.",
            },
        },
        "required": ["card_title"],
    },
}


export const setCardExpandedJson = {
    "name": "set_card_expanded",
    "description": "Expands or collapses a specific card.",
    "parameters": {
        "type": "object",
        "properties": {
            "card_title": {
                "type": "string",
                "description": "Title of the target card.",
            },
            "expanded": {
                "type": "boolean",
                "description": "True for expansion, false for collapse.",
            },
        },
        "required": ["card_title", "expanded"],
    },
}


export const highlightCardJson = {
    "name": "highlight_card",
    "description": "Highlights a card by pulsing its color. User can hover over the card to stop the effect.",
    "parameters": {
        "type": "object",
        "properties": {
            "card_title": {
                "type": "string",
                "description": "Title of the target card.",
            },
        },
        "required": ["card_title"],
    },
}


export const setProjectCardsOrderJson = {
    "name": "set_project_cards_order",
    "description": "Reorders cards in the project section, top to bottom.",
    "parameters": {
        "type": "object",
        "properties": {
            "project_order": {
                "type": "array",
                "items": {
                    "type": "string"
                },
                "description": "Ordered list of project card titles for display."
            }
        },
        "required": ["project_order"]
    }
}


export const setSkillsAndExperienceCardsOrderJson = {
    "name": "set_skills_experience_cards_order",
    "description": "Reorders cards in the skills and experience section, top to bottom.",
    "parameters": {
        "type": "object",
        "properties": {
            "skills_experience_order": {
                "type": "array",
                "items": {
                    "type": "string"
                },
                "description": "Ordered list of skills and experience card titles for display."
            }
        },
        "required": ["skills_experience_order"]
    },
}
