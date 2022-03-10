import { saveAs } from 'file-saver';
import { writable } from 'svelte/store';

export const invoices = writable([]);

// TODO - another endpoint that returns all invoices sent by the user. Then we can display outgoing and incoming invoices.

// loadAllPlatform returns all invoices sent to the user.
export const loadUserInvoices = async () => {
	fetch('localhost:3000/invoice/getAll')
		.then((response) => response.json())
		.then((data) => {
			data.forEach((inv) => {
				invoices.update((invoices) => {
					return [...invoices, inv];
				});
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

// loadOnePlatform returns a single invoice. No auth is needed for this request.
export const loadInvoice = async (invoiceID: string) => {
	const response = await fetch(`http://localhost:8080/invoice/get/${invoiceID}`);

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		throw new Error('Could not load invoice.');
	}
};

// loadInvoiceDetail returns a single invoice including associated user and contact. No auth is needed for this request.
export const loadInvoiceDetail = async (invoiceID: string) => {
	const response = await fetch(`http://localhost:8080/invoice/view/${invoiceID}`);

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		throw new Error('Could not load invoice detail.');
	}
};

export const DownloadInvoicePDF = async (pdfID: string) => {
	try {
		const response = await fetch(`http://localhost:8080/pdf/${pdfID}`);

		if (!response.ok) {
			throw new Error('Could not download PDF. ');
		}

		// Extract filename from header
		const filename = response.headers
			.get('content-disposition')
			.split(';')
			.find((n) => n.includes('filename='))
			.replace('filename=', '')
			.trim();
		const blob = await response.blob();

		// Download the file
		saveAs(blob, filename);
	} catch (e) {
		throw new Error(e);
	}
};
