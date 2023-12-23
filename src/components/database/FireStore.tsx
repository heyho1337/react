// components/database/FireStore.tsx

import { DbProps } from '@types/DbProps';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, addDoc, DocumentData } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export class FireStore implements DbProps {
	private app: any;
	private firestore: any;

	constructor(){
		this.app = initializeApp(firebaseConfig);
		this.firestore = getFirestore(this.app);
	}

	async isDoc(table: string, data: DocumentData) {
		const collectionRef = collection(this.firestore, table);
	  
		// Build a dynamic query based on the properties of teamPlayerData
		let dynamicQuery = collectionRef;
		Object.entries(data).forEach(([key, value]) => {
		  dynamicQuery = query(dynamicQuery, where(key, '==', value));
		});
	  
		const existingDocs = await getDocs(dynamicQuery);
	  
		return existingDocs.empty;
	}

	async set(table: string, data: DocumentData) {
		const collectionRef = collection(this.firestore, table);
		
		let dynamicQuery = collectionRef;
		Object.entries(data).forEach(([key, value]) => {
		  dynamicQuery = query(dynamicQuery, where(key, '==', value));
		});
		const existingDocs = await getDocs(dynamicQuery);
	  
		if (existingDocs.empty) {
		  	const docRef = await addDoc(collectionRef, data);
		  	return docRef;
		}
		else {
		  	return null;
		}
	}
}

const db = new FireStore();
export default db;