<script lang="ts">
	import Chatbot from '$lib/Chatbot.svelte';
	import ExpandableCard from '$lib/ExpandableCard.svelte';
	import { projectStore, skillsAndExperienceStore } from '$lib/stores';
	import { flip } from 'svelte/animate';
</script>

<div id="component-root">
	<div class="column">
		<h1>SethGPT</h1>
		<div class="card">
			<Chatbot />
		</div>
	</div>
	<div class="column">
		<h1>Projects</h1>
		<ul class="no-list">
			{#if $projectStore.length}
				{#each $projectStore as card (card.title)}
					<li animate:flip={{ duration: 500 }} class="no-padding-margin">
						<div class="card">
							<ExpandableCard
								bind:expanded={card.isExpanded}
								bind:highlighted={card.isHighlighted}
								title={card.title}
								date={card.date}
								summary={card.summary}
								content={card.content}
							/>
						</div>
					</li>
				{/each}
			{:else}
				<p>Oops, nothing here!</p>
			{/if}
		</ul>
	</div>
	<div class="column">
		<h1>Skills & Experience</h1>
		<ul class="no-list">
			{#if $skillsAndExperienceStore.length}
				{#each $skillsAndExperienceStore as card (card.title)}
					<li animate:flip={{ duration: 500 }} class="no-padding-margin">
						<div class="card">
							<ExpandableCard
								bind:expanded={card.isExpanded}
								bind:highlighted={card.isHighlighted}
								title={card.title}
								date={card.date}
								summary={card.summary}
								content={card.content}
							/>
						</div>
					</li>
				{/each}
			{:else}
				<p>Oops, nothing here!</p>
			{/if}
		</ul>
	</div>
</div>

<style>
	h1 {
		color: var(--text);
	}
	#component-root {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		padding: 2rem;
		margin: 0 2rem 2rem 2rem;
		gap: 2rem;

		background-color: var(--secondary);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
		border-radius: 5px;
	}

	.column {
		padding: 0 1rem;

		background-color: var(--secondary);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);

		border-style: solid;
		border-width: 3px 0 0 0;
		border-color: var(--accent);
		border-radius: 5px;
	}

	.card {
		width: 20rem;
		margin-bottom: 1rem;

		transition: box-shadow 0.2s ease-in-out;
	}

	.card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
	}

	.no-list {
		padding: 0;
		margin: 0;

		list-style-type: none;
	}

	.no-padding-margin {
		padding: 0;
		margin: 0;
	}
</style>
