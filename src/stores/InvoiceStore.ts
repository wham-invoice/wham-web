import { writable } from 'svelte/store';
import {
    collection,
    getDocs,
    getDoc,
    query,
    doc,
    where,
} from 'firebase/firestore';
import { firebaseDB } from '../firebase';


export const invoices = writable([]);

const invoicesCollection = collection(firebaseDB(), 'invoices');

export const loadAll = async (userID: string) => {
    try {
        const q = query(invoicesCollection, where("user_id", "==", userID))
        const docsSnap = await getDocs(q);

        docsSnap.forEach((doc) => {
            invoices.update((invoices) => {
                return [...invoices, doc];
            });
        });
    } catch (e) { console.error(e) }

};

export const loadOne = async (invoiceID: string) => {
    try {
        const ref = doc(invoicesCollection, invoiceID)

        return await getDoc(ref);

    } catch (e) { console.error(e) }

};
