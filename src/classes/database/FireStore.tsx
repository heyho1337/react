// components/database/FireStore.tsx

import DbProps from '@customTypes/DbProps';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, getDoc, addDoc, DocumentData, deleteDoc, doc, updateDoc } from 'firebase/firestore';

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

	async del(table: string, data: DocumentData) {
		const collectionRef = collection(this.firestore, table);
		
		let dynamicQuery = collectionRef;
		Object.entries(data).forEach(([key, value]) => {
		  	dynamicQuery = query(dynamicQuery, where(key, '==', value));
		});
		const existingDocs = await getDocs(dynamicQuery);
	  
		if (!existingDocs.empty) {
			const docToDelete = existingDocs.docs[0];
			await deleteDoc(docToDelete.ref);
			return true;
		}
		else {
		  	return null;
		}
	}

	async get(table: string, data: DocumentData) {
		const collectionRef = collection(this.firestore, table);
		let dynamicQuery = collectionRef;
		Object.entries(data).forEach(([key, value]) => {
			dynamicQuery = query(dynamicQuery, where(key, '==', value));
		});
	
		const existingDocs = await getDocs(dynamicQuery);
	
		if (!existingDocs.empty) {
			const foundDocs = existingDocs.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
			return foundDocs;
		} else {
			return [];
		}
	}

	async getById(table: string, id: string) {
		try {
			const documentRef = doc(this.firestore, table, id);
			const documentSnapshot = await getDoc(documentRef);
			if (documentSnapshot.exists()) {
				const documentData = documentSnapshot.data();
				return documentData;
			} else {
				console.log('Document does not exist');
				return null;
			}
		} catch (error) {
			console.error('Error getting document:', error);
			return null;
		}
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

	async change(collectionName: string, updateData: any, updateCondition: any) {
		try {
			// Get a reference to the collection
			const collectionRef = collection(this.firestore, collectionName);

			// Build a dynamic query based on the update condition
			let dynamicQuery = collectionRef;
			Object.entries(updateCondition).forEach(([key, value]) => {
				dynamicQuery = query(dynamicQuery, where(key, '==', value));
			});

			// Execute the query to find matching documents
			const existingDocs = await getDocs(dynamicQuery);

			// Update each matching document with the update data
			for (const docRef of existingDocs.docs) {
				await updateDoc(docRef.ref, updateData);
			}
			return true;
		} catch (error) {
			console.error('Error updating documents:', error);
			return false;
		}
	}

}

const db = new FireStore();
export default db;