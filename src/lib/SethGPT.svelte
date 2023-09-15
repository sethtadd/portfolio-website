<script lang="ts">
	// import { marked } from "marked";  // TODO implement markdown support on chat messages
	import { onDestroy, onMount, tick } from 'svelte';
	import { derived, type Unsubscriber } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import { Chatbot } from './Chatbot';

	let messagesScrollDiv: HTMLDivElement;
	let userMessage = '';
	let chatbot = new Chatbot();
	let messagesHidden = true;

	async function scrollToEndOfChat() {
		await tick();
		messagesScrollDiv.scroll({
			top: messagesScrollDiv.scrollHeight,
			behavior: 'smooth'
		});
	}

	const messages = derived(chatbot.messageStore, ($messageStore) => $messageStore);

	async function sendMessage(event: Event) {
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
			scrollToEndOfChat();
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<div id="component-root">
	<div class="message-box" bind:this={messagesScrollDiv}>
		{#each $messages as message}
			<!--Only show system/function messages if not hidden-->
			{#if !messagesHidden || !(message.role === 'system' || message.role === 'function' || message.function_call)}
				<div
					class="message-wrapper {message.role}"
					transition:slide={{ duration: 500 }}
					on:introend={scrollToEndOfChat}
					on:outroend={scrollToEndOfChat}
				>
					<div class="message {message.role}">
						{#if message.name}
							<span class="hidden-message">RESULT {message.name}</span><br />
						{:else if message.function_call}
							<span class="hidden-message">CALL {message.function_call.name}</span><br />
						{:else if message.role === 'system'}
							<span class="hidden-message">SYSTEM</span><br />
						{/if}
						<!--Sometimes the OpenAI API seems to return message content alongside a function call; so we account for that possibility here-->
						{#if message.function_call}
							<b>{message.function_call.arguments}</b><br />
						{/if}
						{message.content || ''}
					</div>
				</div>
			{/if}
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
	<div class="user-input">
		<button
			id="toggle-hidden-messages"
			title="Toggle hidden messages"
			on:click={() => {
				messagesHidden = !messagesHidden;
				scrollToEndOfChat();
			}}
		>
			<img src={messagesHidden ? '/eye-closed.svg' : '/eye-open.svg'} alt="eye" height="30rem" />
		</button>
		<input
			type="text"
			class="textbox"
			placeholder="Type a message..."
			bind:value={userMessage}
			on:keydown={(e) => {
				if (e.key === 'Enter') sendMessage(e);
			}}
		/>
		<button id="send" title="Send message" on:click={sendMessage}>
			<img
				src="/send.svg"
				alt="An icon to indicate that the button sends the message."
				height="25rem"
			/>
		</button>
	</div>
</div>

<style>
	#component-root {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		height: 50vh;
		padding: 1rem;
		background-color: var(--primary);
		margin-bottom: 1rem;
		border-radius: 5px;
	}

	.message-box {
		width: 100%;
		box-sizing: border-box;
		overflow-y: auto;
		border-radius: 5px;

		/* Scrollbar styling for Firefox */
		scrollbar-width: 2px;
		scrollbar-color: var(--text) transparent;
	}

	/* Scrollbar styling for Webkit browsers */
	.message-box::-webkit-scrollbar {
		width: 2px;
	}
	.message-box::-webkit-scrollbar-track {
		background: transparent;
	}
	.message-box::-webkit-scrollbar-thumb {
		background-color: var(--text);
		border-radius: 4px;
	}

	.message-wrapper.user {
		text-align: right;
	}

	.message-wrapper .user {
		text-align: left;
	}

	.message {
		display: inline-block;
		padding: 0.5em;
		margin: 0.25em 0.5em;
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
	.hidden-message {
		display: inline-block;
		padding: 0.25rem;
		margin: 0.25rem 0;
		background-color: var(--background);
		font-weight: bold;
		border-radius: 5px;
		border: 1px solid var(--text);
	}

	.user-input {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;

		margin-top: 0.5rem;
		align-items: center;
		justify-content: center;
	}

	.user-input .textbox {
		width: 100%;
		box-sizing: border-box;

		padding: 0.5em;
		/* margin-top: 1em; */
		border-radius: 10px 10px 0px 10px;
		border: 1px solid var(--text);
		background-color: var(--primary);
		color: var(--text);

		transition: box-shadow 0.3s ease;
	}
	.user-input .textbox:hover {
		box-shadow: 0 0 1px 1px var(--text);
	}
	.user-input .textbox:focus {
		box-shadow: 0 0 1px 1px var(--text);
		outline: none; /* Remove the default browser outline */
	}
	.user-input .textbox::placeholder {
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

	#toggle-hidden-messages {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
	}

	#toggle-hidden-messages img {
		vertical-align: middle;
	}
	#send {
		border: none;
		padding: 0;
		margin: 0;
		background: none;
		cursor: pointer;
	}

	#send img {
		vertical-align: middle;
	}
</style>
