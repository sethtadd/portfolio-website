import { get } from "svelte/store";
import { projectStore, skillsAndExperienceStore } from "./stores";


export function getCardContent(cardTitle: string): string {
    const projectCard = get(projectStore).find(card => card.title === cardTitle);
    if (projectCard) return projectCard.content;

    const skillsAndExperienceCard = get(skillsAndExperienceStore).find(card => card.title === cardTitle);
    if (skillsAndExperienceCard) return skillsAndExperienceCard.content;

    return "Card not found.";
}


export function focusCard(cardTitle: string): string {
    // collapse and un-highlight all cards
    projectStore.update(projects => projects.map(card => ({ ...card, isExpanded: false, isHighlighted: false })));
    skillsAndExperienceStore.update(cards => cards.map(card => ({ ...card, isExpanded: false, isHighlighted: false })));

    // move focused card to top
    projectStore.update(projects => {
        const card = projects.find(card => card.title === cardTitle);
        if (card) {
            return [card, ...projects.filter(card => card.title !== cardTitle)];
        }
        return projects;
    });

    setCardExpanded(cardTitle, true);
    highlightCard(cardTitle);

    return "Done."
}


export function setCardExpanded(cardTitle: string, expanded: boolean): string {
    const projectCardFound = expandCardInStore(projectStore, cardTitle, expanded);
    if (projectCardFound) return `${expanded ? "Expanded" : "Collapsed"} card ${cardTitle}.`;

    const skillsAndExperienceCardFound = expandCardInStore(skillsAndExperienceStore, cardTitle, expanded);
    if (skillsAndExperienceCardFound) return `${expanded ? "Expanded" : "Collapsed"} card ${cardTitle}.`;
    else return `Card ${cardTitle} not found.`;
}


export function highlightCard(cardTitle: string): string {
    const projectCardFound = highlightCardInStore(projectStore, cardTitle);
    if (projectCardFound) return `Highlighted card ${cardTitle}.`;

    const skillsAndExperienceCardFound = highlightCardInStore(skillsAndExperienceStore, cardTitle);
    if (skillsAndExperienceCardFound) return `Highlighted card ${cardTitle}.`;
    else return `Card ${cardTitle} not found.`;
}


export function setProjectCardsOrder(projectOrder: string[]): string {
    setStoreOrder(projectStore, projectOrder);
    return "Done.";
}


export function setSkillsAndExperienceCardsOrder(skillsAndExperienceOrder: string[]): string {
    setStoreOrder(skillsAndExperienceStore, skillsAndExperienceOrder);
    return "Done.";
}


// ---------------- //
// HELPER FUNCTIONS //
// ---------------- //


function expandCardInStore(store: any, cardTitle: string, expanded: boolean): boolean {
    let cardFound = false;

    // TODO figure out correct type for store, instead of any[]
    store.update((cards: any[]) => {
        return cards.map((card: { title: string; }) => {
            if (card.title === cardTitle) {
                cardFound = true;
                return { ...card, isExpanded: expanded };
            }
            return card;
        });
    });

    return cardFound;
}


function highlightCardInStore(store: any, cardTitle: string): boolean {
    let cardFound = false;

    // TODO figure out correct type for store, instead of any[]
    store.update((cards: any[]) => {
        return cards.map((card: { title: string; }) => {
            if (card.title === cardTitle) {
                cardFound = true;
                return { ...card, isHighlighted: true };
            }
            return card;
        });
    });

    return cardFound;
}


function setStoreOrder(store: any, order: string[]): void {
    // TODO figure out correct type for store, instead of any[]
    store.update((cards: any[]) => {
        return order.reduce((acc, title) => {
            const foundCard = cards.find(card => card.title === title);
            if (foundCard) {
                acc.push(foundCard);
            }
            return acc;
        }, [] as typeof cards);
    });
}
