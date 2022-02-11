import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    // TODO sort secret mgmt.
;

const firebaseInit = () => {
    if (getApps().length === 0) {
        console.error("firebase not initialised. initialising...")
        initializeApp(firebaseConfig);
    }

    return getApp();
}

export const firebaseDB = () => {
    const app = firebaseInit();
    return getFirestore(app);
};
