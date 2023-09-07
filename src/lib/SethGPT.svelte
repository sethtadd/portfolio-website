<script lang="ts">
	// import { marked } from "marked";
	import { onMount, tick } from 'svelte';
	import { Chatbot } from './Chatbot';

	// for auto scroll-to-bottom in chat box:
	// https://svelte.dev/repl/990f4b539fa44d48aaf9091c697076dd?version=3.48.0
	let scrollDiv: HTMLDivElement;
	let userMessage = '';
	let chatbot = new Chatbot();

	async function scrollToBottom(node: HTMLDivElement) {
		await tick();
		node.scroll({
			top: node.scrollHeight,
			behavior: 'smooth'
		});
	}

	async function sendMessage(event: KeyboardEvent) {
		if (chatbot.awaitingAssistantResponse || userMessage.trim() === '') return;

		// commit user message
		chatbot.awaitingAssistantResponse = true;
		chatbot.appendUserMessage(userMessage);
		userMessage = '';
		scrollToBottom(scrollDiv);

		// get assistant response
		await chatbot.generateResponse();
		chatbot.awaitingAssistantResponse = false; // TODO move to Chatbot.ts?
		scrollToBottom(scrollDiv);
	}

	onMount(() => {
		scrollToBottom(scrollDiv);
	});
</script>

<div class="message-box">
	<div class="message-list" bind:this={scrollDiv}>
		{#each chatbot.messages as message}
			<div class="message-wrapper {message.role}">
				<div class="message {message.role}">
					{#if message.name}
						<span class="function-name">RESULT {message.name}</span><br />
					{:else if message.function_call}
						<span class="function-name">CALL {message.function_call.name}</span><br />
					{/if}
					{message.content || message.function_call?.arguments || ''}
				</div>
			</div>
		{/each}
		{#if chatbot.awaitingAssistantResponse}
			<div class="typing-indicator-wrapper">
				<div class="typing-indicator">
					<span />
					<span />
					<span />
				</div>
			</div>
		{/if}
	</div>
	<input
		type="text"
		class="user-input"
		placeholder="Type a message..."
		bind:value={userMessage}
		on:keydown={(e) => {
			if (e.key === 'Enter') sendMessage(e);
		}}
	/>
</div>

<style>
	.message-box {
		/* max-height: 60vh; */
	}
	.message-list {
		width: 100%;
		box-sizing: border-box;
		max-height: 40vh;
		overflow-y: auto;

		/* For Firefox */
		scrollbar-width: thin;
		scrollbar-color: orange transparent;

		border-color: orange;
		border-radius: 5px;
	}

	/* For Webkit browsers */

	.message-list::-webkit-scrollbar {
		width: 4px; /* Width of the scrollbar */
	}

	.message-list::-webkit-scrollbar-track {
		background: transparent; /* Background color for the track */
	}

	.message-list::-webkit-scrollbar-thumb {
		background-color: orange; /* Color of the thumb */
		border-radius: 4px; /* Roundness of the scrollbar thumb */
	}
	.message {
		display: inline-block;
		padding: 0.5em;
		margin: 0.5em;
		border-radius: 10px;
	}
	.message.user {
		background-color: orange;
		border-radius: 10px 10px 0px 10px;
	}
	.message.assistant {
		background-color: #858585;
		border-radius: 10px 10px 10px 0px;
	}
	.message.system {
		background-color: #9d8484;
	}
	.message.function {
		background-color: #b99d0e;
	}
	.function-name {
		font-weight: bold;
		background-color: black;
	}
	.message-wrapper {
		text-align: left;
	}
	.message-wrapper.user {
		text-align: right;
	}

	.user-input {
		width: 100%;
		box-sizing: border-box;

		padding: 0.5em;
		margin-top: 1em;
		border-style: none;
		border-radius: 5px 5px 0px 5px;
		background-color: #797979;
		color: white;

		border: 2px solid transparent; /* Set transparent border */
		transition: border-color 0.3s ease; /* Transition on border color */
	}
	.user-input:focus {
		border-color: orange; /* Change border color on focus */
		outline: none; /* Remove the default browser outline */
	}
	.user-input::placeholder {
		color: #a7a7a7;
		font-style: italic;
	}

	.typing-indicator {
		display: inline-block;
		padding: 0.5rem;
		margin: 0.5rem;
		border-radius: 5px;
		background-color: #858585;
		border-radius: 10px 10px 10px 0px;
	}
	.typing-indicator-wrapper {
		text-align: left;
	}
	.typing-indicator span {
		display: inline-block;
		width: 5px;
		height: 5px;
		margin-left: 2px;
		margin-right: 2px;
		background: #ffffff;
		border-radius: 50%;
		animation: bounce 1.4s infinite ease-in-out both;
	}
	.typing-indicator span:nth-child(1) {
		animation-delay: -0.32s;
	}
	.typing-indicator span:nth-child(2) {
		animation-delay: -0.16s;
	}
	@keyframes bounce {
		0%,
		80%,
		100% {
			transform: scale(0);
		}
		40% {
			transform: scale(1);
		}
	}
</style>
