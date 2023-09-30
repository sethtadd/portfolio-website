import { writable } from "svelte/store";

export const sessionId = writable('');

export const projectStore = writable(
    [
        {
            title: 'Improved Ray Marcher',
            date: 'November 2022',
            summary: 'A shader script for Unity3D that "accurately" simulates light propagation with ray marching; chromatic dispersion, Fresnel equations, etc.',
            content: `This shader is an improvement on my previous ray marching program. It's written for Unity but can easily be used in other contexts; it's just a GPU shader. I wrote this shader to explore a few light-transport concepts including chromatic dispersion, light reflection/refraction and the Fresnel equations, etc. As it's just a shader, I have thrown the code into a <a href="https://gist.github.com/sethtadd/f240458b76309ffd7a53d17558487fa1">GitHub Gist for your viewing pleasure :).</a>
            <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;margin-top:1rem;">
                <video controls loop muted style="max-width: 100%;height: auto;">
                    <source src="ray-marcher.webm" type="video/webm">
                    <source src="ray-marcher.mp4" type="video/mp4">
                    Your browser does not support the video tag or the file format of this video.
                </video>
                <p style="text-align:center;margin-top:0.5rem;">Reflections and refractions</p>
            </div>
            <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;margin-top:1rem;">
                <video controls loop muted style="max-width: 100%;height: auto;">
                    <source src="ray-marcher-chromatic.webm" type="video/webm">
                    <source src="ray-marcher-chromatic.mp4" type="video/mp4">
                    Your browser does not support the video tag or the file format of this video.
                </video>
                <p style="text-align:center;margin-top:0.5rem;">Chromatic distortion</p>
            </div>
            `,
            isExpanded: false,
            isHighlighted: false
        },
        {
            title: 'Gomoku Game',
            date: 'November 2022',
            summary: 'A pygame implementation of Gomoku with a few AI players.',
            content:
                `This project is intended to be a platform to build my own baby AlphaZero on. However, I got sidetracked adding features and making it into a fun little game with PyGame and haven't gotten around to training a model to play Gomoku. Whoops!
                <img src="/gomoku.jpg" height="256px" style="display:block;margin: 1rem auto 0.5rem auto;" />
                <p style="text-align:center;margin-top:0.5rem;margin-bottom:1rem">Brute force (black) vs player (white)</p>
                For now, it exists as a small python program that allows you to match players and engines against each other. <a href="https://github.com/sethtadd/gomoku/tree/master">Here is the code;</a> it's decently organized but I think my implementation of the <a href="https://github.com/sethtadd/gomoku/blob/master/BoardGUI.py#L62">GUI on a separate thread</a> might be shaky.`,
            isExpanded: false,
            isHighlighted: false
        },
        {
            title: 'Chess + ML',
            date: 'July 2022',
            summary: 'A neural-network-backed chess engine.',
            content:
                `A few years after <a href="https://www.nature.com/articles/nature24270.epdf?author_access_token=VJXbVjaSHxFoctQQ4p2k4tRgN0jAjWel9jnR3ZoTv0PVW4gB86EEpGqTRDtpIz-2rmo8-KG06gqVobU5NSCFeHILHcVFUeMsbvwS-lxjqQGg98faovwjxeTUgZAUMnRQ">AlphaZero</a> came out I became curious about chess again and decided to train some models. My approach in this project uses supervised learning to guide a neural network to predict the score or evaluation of a game state. For example, Stockfish will look at the state of a chess game and output a score between -1 and 1 depending of if black or white is winning, respectively, with 0 meaning an equal game.<br /><br />The goal is to use Stockfish to label data for supervised training of a neural network evaluation function. But, instead of attempting to mimic just a single-pass evaluation from Stockfish, I want to see if a neural network (without rollout) can learn evaluations that Stockfish with rollout generates. Effectively, I'm trying to compress a few rollouts of Stockfish evaluations into a single-pass neural network evaluation. Every chess player performs some rollout in their head when playing chess, and the best chess players can see a position and immediately assess the rollout without manually thinking through the rollout. My line of thinking is that good chess players compress and abstractly represent game rollouts in their head, and I want to see if a neural network can mimic this.<br /><br />You can <a href="https://github.com/sethtadd/ml-chess">check out the code here.</a> Basically, after generating tons of data and letting the model train for a few hours, I was able to train up a model that felt like it had good intuition and a few variations can actually crush me in the middle game, but the model is wrapped in a naive minimax algorithm with 2 step rollout which clearly hurts it's endgame. In the endgame long rollouts are preferred over positional intuition.<br /><br />Something to consider: the evaluation model is trained to mimic Stockfish at 6-step rollout, and so using the model in 2 step rollout is somewhat like doing a "soft" 7 or 8 step rollout. They say a grandmaster can "see" 20 moves ahead; I'm guessing that is a "soft" 20 moves rather than a "hard", calculated 20 moves, if that makes sense.`,
            isExpanded: false,
            isHighlighted: false
        },
        { // TODO add alt text to images
            title: 'Mandelbulb Ray Marcher',
            date: 'November 2019',
            summary: 'A ray marching engine that renders the Mandelbulb fractal (real-time rendering).',
            content: `This is my first ray marcher. It renders the Mandelbulb fractal in real-time with lighting and reflections. There were quite a few challenges I had to overcome which made this a lot of fun to build. Lighting and reflections require normals, but how do you calculate normals for a fractal?! You use pseudo-mathematics! Once you hit the surface, shoot tiny rays out in orthogonal directions and then measure their proximity to the surface, and use those measurements as the components of your normal vector! It's probably easiest to understand by <a href="https://github.com/sethtadd/gl-mandelbulb/blob/35975b7cc06e8998a8ba58a08ba43c9fc188d417/fragEff.glsl#L111C1-L121C2">just looking at the code :).</a>
            <img src="/mandelbulb-greyscale.jpg" height="256px" style="display:block;margin: 1rem auto 0.5rem auto;" />
            <p style="text-align:center;margin-top:0.5rem;">Full Mandelbulb (no color)</p>
            <img src="/mandelbulb-color.jpg" height="256px" style="display:block;margin: 1rem auto 0.5rem auto;" />
            <p style="text-align:center;margin-top:0.5rem;">Zoomed in Mandelbulb (color and reflections)</p>
            <a href="https://github.com/sethtadd/gl-mandelbulb">Here's the code.</a>`,
            isExpanded: false,
            isHighlighted: false
        },
        {
            title: 'Ray Tracer',
            date: 'March 2019',
            summary: 'A ray tracing engine that calculates lighting for .obj files.',
            content: `This project is my first attempt at creating a rendering engine. It uses OpenGL with computer shaders to compute lighting in a mesh-defined scene (.obj files.) Compute shaders are used in order to allow data to be written back to CPU from GPU; it is not real time, it renders static images.
            <img src="/ray-traced-monkey-90q.jpg" height="256px" style="display:block;margin: 1rem auto 0.5rem auto;" />
            <p style="text-align:center;margin-top:0.5rem;">Normals not interpolated</p>
            <img src="/ray-traced-monkey-smooth-90q.jpg" height="256px" style="display:block;margin: 1rem auto 0.5rem auto;" />
            <p style="text-align:center;margin-top:0.5rem;">Normals interpolated</p>
            <a href="https://github.com/sethtadd/ray-tracer">The code is here.</a>`,
            isExpanded: false,
            isHighlighted: false
        },
        {
            title: 'Chengine',
            date: 'October 2018',
            summary: "Chengine is Seth's first chess engine!",
            content:
                `Chengine, my first chess engine, uses <a href="https://en.wikipedia.org/wiki/Minimax">Minimax</a> to explore potential game lines and a <a href="https://github.com/sethtadd/chengine/blob/master/StateTree.cpp#L956">custom evaluation function</a> to tell it how "good" any given board state is for a player. The evaluation function doesn't consider any dynamic positional information i.e. pieces attacked/defended/pinned/etc. (<em>This has the funny consequence that if the king is in check and move lookahead is set to 1 then Chengine might sac it's king!</em>) Instead, the engine relies on Minimax to perform move-rollout. Move-rollout, even with a static evaluation function, compensates for the lack of dynamic info in the raw evaluations.<br /><br />This engine has MANY issues. It's slow, inefficient, and the code quality is lacking. Please don't be too critical, I was a child! <a href="https://github.com/sethtadd/chengine">Here's the repo,</a> it's all C++.`,
            isExpanded: false,
            isHighlighted: false
        },
    ]
);

export const skillsAndExperienceStore = writable(
    [
        {
            title: 'Skills',
            summary: 'Python + Linux is my jam, and I love learning new things!',
            date: 'Skills are temporary, experience is forever!',
            content:
                `
                <b>Programming</b>
                <br /><br />
                <ul>
                    <li>
                        Python
                    </li>
                    <li>
                        Java
                    </li>
                    <li>
                        C++
                    </li>
                    <li>
                        Shaders (HLSL)
                    </li>
                    <li>
                        Mathematica
                    </li>
                    <li>
                        PyTorch
                    </li>
                </ul>
                <br /><br />
                <b>Mathematical Modeling</b>
                <br /><br />
                <ul>
                    <li>
                        Numerical methods
                    </li>
                    <li>
                        Linear algebra
                    </li>
                    <li>
                        Finite element methods
                    </li>
                    <li>
                        Distance-to-surface estimation
                    </li>
                </ul>
                <br /><br />
                <b>Logistics</b>
                <br /><br />
                <ul>
                    <li>
                        Linux
                    </li>
                    <li>
                        Git
                    </li>
                    <li>
                        Docker
                    </li>
                    <li>
                        GCP
                    </li>
                </ul>
                `,
            isExpanded: false,
            isHighlighted: false
        },
        {
            title: 'OptTek Systems',
            summary: 'I optimized simulations!',
            date: 'July 2021 - May 2023 (2 years)',
            content:
                `
                <ul>
                    <li>
                        Designed, implemented, and maintained a suite of mathematical optimization tools
                    </li>
                    <li>
                        Optimized large-scale systems for commercial and government simulations, enhancing automation and efficiency in task execution and analysis
                    </li>
                    <li>
                        Created Python wrappers for our tools, leading to new business opportunities
                    </li>
                    <li>
                        Built GUIs to facilitate user interaction with complex tooling
                    </li>
                `,
            isExpanded: false,
            isHighlighted: false
        },
    ]
);
