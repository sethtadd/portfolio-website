<script lang="ts">
	import { slide } from 'svelte/transition';

	export let expanded = false;
	export let highlighted = false;
	export let title: string;
	export let summary: string;
	export let content: string;

	function toggleExpand() {
		expanded = !expanded;
	}
</script>

<div
	class="card {expanded ? 'expanded' : ''} {highlighted ? 'highlighted' : ''}"
	on:mouseover={() => (highlighted = false)}
	on:focus={() => (highlighted = false)}
	role="button"
	tabindex="0"
	aria-roledescription="Mousing over or focusing this card will stop the highlight animation."
>
	<h2>{title}</h2>
	{#if expanded}
		<p transition:slide>{content}</p>
	{:else}
		<p transition:slide>{summary}</p>
	{/if}
	<button
		class="toggle"
		on:click={toggleExpand}
		aria-label={expanded ? 'Collapse content' : 'Expand Content'}
		><span class="content" title={expanded ? 'Collapse content' : 'Expand Content'}>▼</span></button
	>
</div>

<style>
	.card {
		padding: 1rem;
		background-color: var(--primary);
		margin-bottom: 1rem;

		border-radius: 5px;

		border-style: solid;
		border-width: 3px;
		border-color: transparent;
		transition: box-shadow 0.2s ease-in-out;
		transition: background-color 0.2s ease-in-out;
	}
	.card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
	}

	.card:hover:not(.expanded) {
		background: var(--accent);
	}

	.card.highlighted {
		animation: pulse 1.5s;
		animation-iteration-count: infinite;
	}

	button.toggle {
		background: none;
		color: var(--secondary);
		border: none;
		padding: 0.25rem 1rem;
		margin: 0;
		font-size: 1.5em;

		cursor: pointer;
		transition: transform 0.3s ease-in-out;
	}

	button.toggle .content {
		display: inline-block;
	}

	.card.expanded button.toggle .content {
		transform: rotate(180deg);
	}

	.card:hover:not(.card.expanded) button.toggle .content {
		animation: bounce 1s;
		animation-iteration-count: infinite;
	}

	h2 {
		margin: 0;
	}

	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-5px);
		}
		60% {
			transform: translateY(-2px);
		}
	}

	@keyframes pulse {
		0%,
		100% {
			background: var(--primary);
		}
		50% {
			background: var(--accent);
		}
	}
</style>
