<nav>
	<h1>SETHTADD</h1>
</nav>

<main>
	<slot />
</main>

<style>
	main {
		display: flex;
		justify-content: center;
	}

	nav {
		background-color: var(--secondary);
		padding: 2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		max-width: 60vw;
		margin: 2rem auto;
	}

	nav h1 {
		color: var(--text);
		margin: 0;
	}
</style>
