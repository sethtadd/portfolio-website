export const getCardsLayoutJson = {
    "name": "get_cards_layout",
    "description": "Returns the current layout of the cards on the page. The order of the card matches what the user sees. The content of each card is omitted for conciseness, you can use get_card_content to retrieve the content of a specific card.",
    "parameters": {
        "type": "object",
        "properties": {},
        "required": [],
    },
}


export const focusCardJson = {
    "name": "focus_card",
    "description": "Focuses a card by moving it to the top of the page, expanding it, and highlighting it. This is useful when you want to emphasize a specific card to the user.",
    "parameters": {
        "type": "object",
        "properties": {
            "card_title": {
                "type": "string",
                "description": "The title of the card you want to focus. Case sensitive.",
            },
        },
        "required": ["card_title"],
    },
}


export const getCardContentJson = {
    "name": "get_card_content",
    "description": "Returns the content of a specific card. It is recommended to subsequently move the card to the top (set_project_cards_order), expand it, and then highlight it to emphasize the card you are talking about. The user can read the contents of the card, so be VERY brief when talking about it and then ask the user if they want to know more.",
    "parameters": {
        "type": "object",
        "properties": {
            "card_title": {
                "type": "string",
                "description": "The title of the card whose content you want to retrieve. Case sensitive.",
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
                "description": "The title of the card you want to expand or collapse. Case sensitive.",
            },
            "expanded": {
                "type": "boolean",
                "description": "Whether you want to expand or collapse the card.",
            },
        },
        "required": ["card_title", "expanded"],
    },
}


export const highlightCardJson = {
    "name": "highlight_card",
    "description": "Highlights a specific card by making it pulse another color. You cannot stop the highlight effect, but the user can mouse over the card to stop the pulsing.",
    "parameters": {
        "type": "object",
        "properties": {
            "card_title": {
                "type": "string",
                "description": "The title of the card you want to highlight. Case sensitive.",
            },
        },
        "required": ["card_title"],
    },
}


export const setProjectCardsOrderJson = {
    "name": "set_project_cards_order",
    "description": "Sets the order of cards in the project section.",
    "parameters": {
        "type": "object",
        "properties": {
            "project_order": {
                "type": "array",
                "items": {
                    "type": "string"
                },
                "description": "An ordered list of project card titles dictating the display order. Titles not in this list will be removed from display."
            }
        },
        "required": ["project_order"]
    }
}


export const setSkillsAndExperienceCardsOrderJson = {
    "name": "highlight_card",
    "description": "Highlights a specific card by making it pulse another color. You cannot stop the highlight effect, but the user can mouse over the card to stop the pulsing.",
    "parameters": {
        "type": "object",
        "properties": {
            "card_title": {
                "type": "string",
                "description": "The title of the card you want to highlight. Case sensitive.",
            },
        },
        "required": ["card_title"],
    },
}
