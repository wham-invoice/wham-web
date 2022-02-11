<script>
	import Auth from '../components/Auth.svelte';
</script>

<div>
	<div class="container mx-auto my-6 max-w-lg">
		<Auth let:loggedIn let:loginWithGoogle>
			{#if loggedIn}
				<slot />
			{:else}
				<div class="mt-3">
					<button type="button" on:click|preventDefault={loginWithGoogle}>
						Sign In with Google
					</button>
				</div>
			{/if}
		</Auth>
	</div>
</div>
