<script context="module" type="ts">
	// module runs once per module and is shared across all instances of that module.

	import { loadOne } from '../../stores/InvoiceStore';

	// The load function is reactive, and will re-run when its parameters change,
	// but only if they are used in the function. The function runs server-side and also client-side,
	// allowing you to retrieve data either at build time or run time.

	export async function load({ params }) {
		const id = params.id;

		return { props: { id } };
	}
</script>

<script type="ts">
	import { user } from '../../stores/AuthStore';
	export let id: string;

	let promise;

	if ($user != null) {
		promise = loadOne(id);
	}
</script>

{#await promise}
	<h1>...loading</h1>
{:then invoice}
	<h1>{invoice.id}</h1>
	<main>{invoice.data().description}</main>
{/await}
