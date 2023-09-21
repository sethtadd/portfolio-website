<div id="nav-container">
	<nav>
		<h1>SETHTADD <span style="color:red;">- THIS PORTFOLIO IS IN PROGRESS</span></h1>
	</nav>
</div>

<main>
	<slot />
</main>

<style>
	main {
		display: flex;
		justify-content: center;
	}

	#nav-container {
		display: flex;
		justify-content: center;
	}

	nav {
		width: 70rem;
		padding: 2rem;
		margin: 2rem;

		background-color: var(--secondary);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);

		border-style: solid;
		border-width: 3px 0 0 0;
		border-color: var(--accent);
		border-radius: 5px;
	}

	nav h1 {
		margin: 0;

		color: var(--text);
	}
</style>
