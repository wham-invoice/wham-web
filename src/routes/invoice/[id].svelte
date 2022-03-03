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
	export let id: string;

	// TODO - add a loading state
	// TODO - get contact & user from their ids
	let promise = loadOne(id);
</script>

{#await promise}
	<h1>...loading</h1>
{:then invoice}
	<h1>{invoice.id}</h1>
	<main>{invoice.data().contact_id}</main>
	<main>{invoice.data().description}</main>
	<main>{invoice.data().due_date}</main>
	<main>{invoice.data().hours}</main>
	<main>{invoice.data().paid}</main>
	<main>{invoice.data().rate}</main>
	<main>{invoice.data().user_id}</main>
{:catch error}
	<!-- TODO assert error has message property -->
	<p style="color: red">{error.message}</p>
{/await}
