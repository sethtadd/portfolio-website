import { writable } from "svelte/store";

export const projectStore = writable(
    [
        {
            title: 'Chengine',
            summary: "Chengine is Seth's first chess engine!",
            content:
                `Chengine, my first chess engine, uses <a href="https://en.wikipedia.org/wiki/Minimax">Minimax</a> to explore potential game lines and a <a href="https://github.com/sethtadd/chengine/blob/master/StateTree.cpp#L956">custom evaluation function</a> to tell it how "good" any given board state is for a player. The evaluation function doesn't consider any dynamic positional information i.e. pieces attacked/defended/pinned/etc. (<em>This has the funny consequence that if the king is in check and move lookahead is set to 1 then Chengine might sac it's king!</em>) Instead, the engine relies on Minimax to perform move-rollout. Move-rollout, even with a static evaluation function, compensates for the lack of dynamic info in the raw evaluations.<br /><br />This engine has MANY issues. It's slow, inefficient, and the code quality is lacking. Please don't be too critical, I was a child! <a href="https://github.com/sethtadd/chengine">Here's the repo,</a> it's all C++.`,
            isExpanded: false,
            isHighlighted: false
        },
        {
            title: 'Chess + ML',
            summary: 'A neural-network-backed chess engine.',
            content:
                `A few years after <a href="https://www.nature.com/articles/nature24270.epdf?author_access_token=VJXbVjaSHxFoctQQ4p2k4tRgN0jAjWel9jnR3ZoTv0PVW4gB86EEpGqTRDtpIz-2rmo8-KG06gqVobU5NSCFeHILHcVFUeMsbvwS-lxjqQGg98faovwjxeTUgZAUMnRQ">AlphaZero</a> came out I became curious about chess again and decided to train some models. My approach in this project uses supervised learning to guide a neural network to predict the score or evaluation of a game state. For example, Stockfish will look at the state of a chess game and output a score between -1 and 1 depending of if black or white is winning, respectively, with 0 meaning an equal game.<br /><br />The goal is to use Stockfish to label data for supervised training of a neural network evaluation function. But, instead of attempting to mimic just a single-pass evaluation from Stockfish, I want to see if a neural network (without rollout) can learn evaluations that Stockfish with rollout generates. Effectively, I'm trying to compress a few rollouts of Stockfish evaluations into a single-pass neural network evaluation. Every chess player performs some rollout in their head when playing chess, and the best chess players can see a position and immediately assess the rollout without manually thinking through the rollout. My line of thinking is that good chess players compress and abstractly represent game rollouts in their head, and I want to see if a neural network can mimic this.<br /><br />You can <a href="https://github.com/sethtadd/ml-chess">check out the code here.</a> Basically, after generating tons of data and letting the model train for a few hours, I was able to train up a model that felt like it had good intuition and a few variations can actually crush me in the middle game, but the model is wrapped in a naive minimax algorithm with 2 step rollout which clearly hurts it's endgame. In the endgame long rollouts are preferred over positional intuition.<br /><br />Something to consider: the evaluation model is trained to mimic Stockfish at 6-step rollout, and so using the model in 2 step rollout is somewhat like doing a "soft" 7 or 8 step rollout. They say a grandmaster can "see" 20 moves ahead; I'm guessing that is a "soft" 20 moves rather than a "hard", calculated 20 moves, if that makes sense.`,
            isExpanded: false,
            isHighlighted: false
        },
        {
            title: 'Gomoku Game',
            summary: 'A pygame implementation of Gomoku with a few AI players.',
            content:
                `This project is intended to be a platform to build my own baby AlphaZero on. However, I got sidetracked adding features and making a fun little program with PyGame and haven't gotten around to training a model to play Gomoku. Whoops!<br /><br />For now, it exists as a small python program that allows you to match players and engines against each other. <a href="https://github.com/sethtadd/gomoku/tree/master">Here is the code;</a> it's decently organized but I think my implementation of the <a href="https://github.com/sethtadd/gomoku/blob/master/BoardGUI.py#L62">GUI on a separate thread</a> might be shaky.`,
            isExpanded: false,
            isHighlighted: false
        }
    ]
);

export const skillsAndExperienceStore = writable(
    [
        {
            title: 'Skills',
            summary: 'I love Python and C++ and Svelte!',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            isExpanded: false,
            isHighlighted: false
        },
        {
            title: 'Experience',
            summary: 'I worked at OptTek Systems for 2 years!',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            isExpanded: false,
            isHighlighted: false
        },
    ]
);
