import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_apiKey,
	authDomain: import.meta.env.VITE_authDomain,
	projectId: import.meta.env.VITE_projectId,
	storageBucket: import.meta.env.VITE_storageBucket,
	messagingSenderId: import.meta.env.VITE_messagingSenderId,
	appId: import.meta.env.VITE_appId,
	measurementId: import.meta.env.VITE_measurementId
};

const firebaseInit = () => {
	if (getApps().length === 0) {
		console.error('firebase not initialised. initialising...');
		initializeApp(firebaseConfig);
	}

	return getApp();
};

export const firebaseDB = () => {
	const app = firebaseInit();
	return getFirestore(app);
};
