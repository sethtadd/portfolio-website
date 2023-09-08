<script lang="ts">
	import ExpandableCard from '$lib/ExpandableCard.svelte';
	import SethGpt from '$lib/SethGPT.svelte';
	import { projects as importedProjects } from '$lib/projectData';
	import { skillsAndExperiences as importedSkillsAndExperiences } from '$lib/skillsAndExperienceData';

	let projects = importedProjects || [];
	let skillsAndExperiences = importedSkillsAndExperiences || [];
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
		{#if projects && projects.length}
			{#each projects as card (card.title)}
				<ExpandableCard
					bind:expanded={card.isExpanded}
					title={card.title}
					summary={card.summary}
					content={card.content}
				/>
			{/each}
		{:else}
			<p>No projects available.</p>
		{/if}
	</div>
	<div class="column">
		<h1>Skills & Experience</h1>
		{#if skillsAndExperiences && skillsAndExperiences.length}
			{#each skillsAndExperiences as card (card.title)}
				<ExpandableCard
					bind:expanded={card.isExpanded}
					title={card.title}
					summary={card.summary}
					content={card.content}
				/>
			{/each}
		{:else}
			<p>No projects available.</p>
		{/if}
	</div>
</div>

<style>
	h1 {
		color: orange;
	}
	.grid-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		background-color: #333;
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
		border-radius: 5px;
	}

	.chatbot-card {
		padding: 1rem;
		background-color: #555;
		margin-bottom: 1rem;

		border-radius: 5px;

		border-width: 2px;
		border-style: solid;
		border-color: transparent;
		transition: box-shadow 0.1s ease-in-out;
		transition: border-color 0.05s ease-in-out;
	}
	.chatbot-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
	}
</style>
