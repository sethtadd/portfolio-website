import { writable } from "svelte/store";

export const projectStore = writable(
    [
        {
            title: 'Project 1',
            summary: 'Some info about project 1',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
            isExpanded: false
        },
        {
            title: 'Project 2',
            summary: 'Some info about project 2',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            isExpanded: false
        },
        {
            title: 'Project 3',
            summary: 'Some info about project 3',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
            isExpanded: false
        }
    ]
);
