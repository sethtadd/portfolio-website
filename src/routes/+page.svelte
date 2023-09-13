<script lang="ts">
	import ExpandableCard from '$lib/ExpandableCard.svelte';
	import SethGpt from '$lib/SethGPT.svelte';
	import { projectStore, skillsAndExperienceStore } from '$lib/stores';
	import { flip } from 'svelte/animate';
</script>

<div class="grid-container">
	<div class="column">
		<h1>Chatbot</h1>
		<div class="chatbot-card">
			<SethGpt />
		</div>
	</div>
	<div class="column">
		<h1>Projects</h1>
		<!--using <ul> for animate:flip effect on <li>, no styling-->
		<ul style="list-style-type:none;padding:0;margin:0;">
			{#if $projectStore.length}
				{#each $projectStore as card (card.title)}
					<li animate:flip={{ duration: 500 }} style="padding:0;margin:0;">
						<ExpandableCard
							bind:expanded={card.isExpanded}
							bind:highlighted={card.isHighlighted}
							title={card.title}
							summary={card.summary}
							content={card.content}
						/>
					</li>
				{/each}
			{:else}
				<p>Oops, nothing here!</p>
			{/if}
		</ul>
	</div>
	<div class="column">
		<h1>Skills & Experience</h1>
		<!--using <ul> for animate:flip effect on <li>, no styling-->
		<ul style="list-style-type:none;padding:0;margin:0;">
			{#if $skillsAndExperienceStore.length}
				{#each $skillsAndExperienceStore as card (card.title)}
					<li animate:flip={{ duration: 500 }} style="padding:0;margin:0;">
						<ExpandableCard
							bind:expanded={card.isExpanded}
							bind:highlighted={card.isHighlighted}
							title={card.title}
							summary={card.summary}
							content={card.content}
						/>
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
	.grid-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		background-color: var(--secondary);
		padding: 2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		max-width: 60vw;
		margin: 0 auto;
	}

	.column {
		position: relative;
		padding: 0 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
		
		max-width: 20vw;

		border-radius: 5px;
		border-style: solid;
		border-width: 3px 0 0 0;
		border-color: var(--accent);
	}

	.chatbot-card {
		padding: 1rem;
		background-color: var(--primary);
		margin-bottom: 1rem;

		border-style: solid;
		border-width: 2px;
		border-color: transparent;
		border-radius: 5px;
		transition: box-shadow 0.2s ease-in-out;
	}
	.chatbot-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
	}
</style>
