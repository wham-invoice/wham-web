<script context="module" type="ts">
	// module runs once per module and is shared across all instances of that module.

	import { DownloadInvoicePDF, loadInvoiceDetail } from '../../stores/InvoiceStore';

	// The load function is reactive, and will re-run when its parameters change,
	// but only if they are used in the function. The function runs server-side and also client-side,
	// allowing you to retrieve data either at build time or run time.

	export async function load({ params }) {
		const id = params.id;

		return { props: { id } };
	}
</script>

<script type="ts">
	import { onMount } from 'svelte';

	export let id: string;

	// TODO - add a loading state
	// TODO - get contact & user from their ids
	/*
  It's recommended to put the fetch in onMount rather than at the top level of the <script> because of server-side rendering (SSR). With the exception of onDestroy, lifecycle functions don't run during SSR, which means we can avoid fetching data that should be loaded lazily once the component has been mounted in the DOM.
  */

	let invoice;

	onMount(async () => {
		invoice = await loadInvoiceDetail(id);
	});

	function handleClick() {
		console.log(invoice);
		DownloadInvoicePDF(invoice.PDFID);
	}
</script>

<!-- TODO: styling - use a svelte UI Library? use Tailwind CSS? -->
<div>
	{#if invoice}
		<main>{invoice.Description}</main>
		<main>{invoice.Contact.FirstName}</main>
		<main>{invoice.DueDate}</main>
		<main>{invoice.Rate}</main>
		<main>{invoice.Paid}</main>
		<main>{invoice.PDFID}</main>
		<button on:click={handleClick}>Download Invoice</button>
	{/if}
</div>
