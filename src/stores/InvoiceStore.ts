import { writable } from 'svelte/store';
import { collection, getDocs, getDoc, query, doc, where } from 'firebase/firestore';
import { firebaseDB } from '../firebase';

export const invoices = writable([]);

const invoicesCollection = collection(firebaseDB(), 'invoices');

export const loadAll = async (userID: string) => {
	try {
		const q = query(invoicesCollection, where('user_id', '==', userID));
		const docsSnap = await getDocs(q);

		docsSnap.forEach((doc) => {
			invoices.update((invoices) => {
				return [...invoices, doc];
			});
		});
	} catch (e) {
		console.error(e);
	}
};

export const loadOne = async (invoiceID: string) => {
	try {
		const ref = doc(invoicesCollection, invoiceID);

		return await getDoc(ref);
	} catch (e) {
		console.error(e);
	}
};

// loadAllPlatform returns all invoices sent to the user.
// TODO - another endpoint that returns all invoices sent by the user. Then we can display outgoing and incoming invoices.
export const loadAllPlatform = async () => {
	fetch('localhost:3000/invoice/getAll')
		.then((response) => response.json())
		.then((data) => {
			console.log(data);

			data.forEach((invoice) => {
				invoices.update((invoices) => {
					return [...invoices, invoice];
				});
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

// loadOnePlatform returns a single invoice. No auth is needed for this request.
export const loadOnePlatform = async (invoiceID: string) => {
	const response = await fetch(`http://localhost:8080/invoice/get/${invoiceID}`);

	if (response.ok) {
		const data = await response.json();
		console.log(data);
		return data.invoice;
	} else {
		console.log(response.status);
		throw new Error('Could not load invoice.');
	}
};
