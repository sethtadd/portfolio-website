<nav>
	<h1>sethtadd's portfolio!</h1>
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
		background-color: #333;
		padding: 2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		max-width: 60vw;
		margin: 2rem auto;
		z-index: 1000;
	}

	nav h1 {
		margin: 0;
		text-align: center;
		font-size: 1.5rem;

		color: orange;
	}
</style>
