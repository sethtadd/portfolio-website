<script>
</script>

<div class="grid-container">
	<div class="column">
		<h1>Chatbot</h1>
		<div class="content-card">
			<h2>SethGPT</h2>
			<p>Placeholder for SethGPT chatbot component.</p>
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
	}

	.column {
		position: relative;
		padding: 0 1rem;
	}

	.column:not(:last-child)::after {
		content: '';
		position: absolute;
		top: 10%;
		bottom: 10%;
		right: 0;
		width: 2px;
		background-color: orange;
	}

	.content-card {
		padding: 1rem;
		background-color: #555;
		margin-bottom: 1rem;
		border-radius: 5px;
		text-align: center;
	}

	/* Just to remove margin from the last demo box */
	.content-card:last-child {
		margin-bottom: 0;
	}
</style>
