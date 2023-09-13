<script lang="ts">
	// import { marked } from "marked";  // TODO implement markdown support on chat messages
	import { onDestroy, onMount, tick } from 'svelte';
	import { Chatbot } from './Chatbot';

	import { derived, type Unsubscriber } from 'svelte/store';

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

	const messages = derived(chatbot.messageStore, ($messageStore) => $messageStore);

	async function sendMessage(event: KeyboardEvent) {
		if (chatbot.awaitingAssistantResponse || userMessage.trim() === '') return;

		// commit user message
		chatbot.awaitingAssistantResponse = true;
		chatbot.appendUserMessage(userMessage);
		userMessage = '';

		// get assistant response
		await chatbot.generateResponse();
		chatbot.awaitingAssistantResponse = false; // TODO move to Chatbot.ts?
	}

	let unsubscribe: Unsubscriber;

	onMount(() => {
		unsubscribe = chatbot.messageStore.subscribe((messages) => {
			scrollToBottom(scrollDiv);
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<div class="message-box" bind:this={scrollDiv}>
	{#each $messages as message}
		<div class="message-wrapper {message.role}">
			<div class="message {message.role}">
				{#if message.name}
					<span class="function-name">RESULT {message.name}</span><br />
				{:else if message.function_call}
					<span class="function-name">CALL {message.function_call.name}</span><br />
				{/if}
				<!--Sometimes the OpenAI API seems to return message content alongside a function call; so we account for that possibility here-->
				{#if message.function_call}
					<b>{message.function_call.arguments}</b><br />
				{/if}
				{message.content || ''}
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

<style>
	.message-box {
		width: 100%;
		box-sizing: border-box;
		max-height: 40vh;
		overflow-y: auto;
		border-radius: 5px;

		/* Scrollbar styling for Firefox */
		scrollbar-width: thin;
		scrollbar-color: var(--accent) transparent;
	}

	/* Scrollbar styling for Webkit browsers */
	.message-box::-webkit-scrollbar {
		width: 4px;
	}
	.message-box::-webkit-scrollbar-track {
		background: transparent;
	}
	.message-box::-webkit-scrollbar-thumb {
		background-color: var(--accent);
		border-radius: 4px;
	}

	.message {
		display: inline-block;
		padding: 0.5em;
		margin: 0.5em;
		border-radius: 10px;
		border: 1px solid var(--text);

		max-width: 13vw; /* prevent messages from getting too wide */
	}
	.message.user {
		background-color: var(--chat-user);
		border-radius: 10px 10px 0px 10px;
	}
	.message.assistant {
		background-color: var(--chat-assistant);
		border-radius: 10px 10px 10px 0px;
	}
	.message.system {
		background-color: var(--chat-system);
	}
	.message.function {
		background-color: var(--chat-function);
		overflow-wrap: break-word;
		word-wrap: break-word; /* Older browsers */
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
		border-style: solid;
		border-radius: 10px 10px 0px 10px;
		border-color: var(--accent);
		background-color: var(--chat-input-box);
		color: var(--text);

		/* border: 2px solid transparent; */
		transition: border-color 0.3s ease;
	}
	.user-input:focus {
		border-color: var(--accent);
		outline: none; /* Remove the default browser outline */
	}
	.user-input::placeholder {
		color: var(--text);
		font-style: italic;
		opacity: 0.5;
	}

	.typing-indicator {
		display: inline-block;
		padding: 0.5rem;
		margin: 0.5rem;
		border-radius: 5px;
		background-color: var(--chat-assistant);
		border-radius: 10px 10px 10px 0px;
		border: 1px solid var(--text);
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
		background: var(--text);
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
