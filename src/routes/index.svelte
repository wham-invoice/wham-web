<script type="ts">
	import { loadUserInvoices, invoices } from '../stores/InvoiceStore';
	import { user } from '../stores/AuthStore';

	$user != null && loadUserInvoices();
</script>

<main>
	<h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl ">
		My ${$user.displayName} Invoices
	</h1>

	{#each $invoices as invoice (invoice.id)}
		<a href={`/invoice/${invoice.id}`}>{invoice.data().description}</a>
	{/each}
</main>
