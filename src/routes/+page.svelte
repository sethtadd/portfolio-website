<script>
	import SethGpt from '$lib/SethGPT.svelte';
</script>

<div class="grid-container">
	<div class="column">
		<h1>Chatbot</h1>
        <hr />
		<div class="content-card">
			<!-- <SethGpt /> -->
		</div>
	</div>
	<div class="column">
		<h1>Projects</h1>
		<div class="content-card">
			<h2>Project 1</h2>
			<p>Some info about project 1</p>
		</div>
		<div class="content-card">
			<h2>Project 2</h2>
			<p>Some info about project 2</p>
		</div>
	</div>
	<div class="column">
		<h1>Skills & Experience</h1>
		<div class="content-card">
			<h2>Skills</h2>
			<p>Sleeping</p>
		</div>
		<div class="content-card">
			<h2>Experience</h2>
			<p>Eating</p>
		</div>
	</div>
</div>

<style>
	h1 {
		color: orange;
	}
	/* Grid container styling */
	.grid-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		background-color: #333;
		padding: 2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		max-width: 60vw; /* or any other constraint */
		margin: 0 auto;
	}

	.column {
		position: relative;
		padding: 0 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
		border-radius: 5px;
	}

	.content-card {
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
	.content-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
		border-color: orange;
	}
</style>
