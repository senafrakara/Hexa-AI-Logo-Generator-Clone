import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from "./FBConfig";

export const createLogoRequest = async (logoData) => {
    try {
        const docRef = await addDoc(collection(db, 'logos'), {
            ...logoData,
            status: 'processing',
            createdAt: new Date(),
        });

        return docRef.id;
    } catch (error) {
        console.error('Error creating logo request:', error);
        throw error;
    }
};
