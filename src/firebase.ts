import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_apiKey.toString(),
	authDomain: import.meta.env.VITE_authDomain.toString(),
	databaseURL: import.meta.env.VITE_databaseURL.toString(),
	projectId: import.meta.env.VITE_projectId.toString(),
	storageBucket: import.meta.env.VITE_storageBucket.toString(),
	messagingSenderId: import.meta.env.VITE_messagingSenderId.toString(),
	appId: import.meta.env.VITE_appId.toString(),
	measurementId: import.meta.env.VITE_measurementId.toString()
};

export const firebaseInit = () => {
	if (getApps().length === 0) {
		console.error('firebase not initialised. initialising...');
		initializeApp(firebaseConfig);
	}

	return getApp();
};
