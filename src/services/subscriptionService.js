import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export const getUserSubscription = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            return userDoc.data().subscription || { status: 'none', plan: 'none' };
        }
        return { status: 'none', plan: 'none' };
    } catch (error) {
        console.error("Error fetching subscription:", error);
        return { status: 'none', plan: 'none' };
    }
};

export const subscribeToFreePlan = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userRef);

        const subscriptionData = {
            status: 'active',
            plan: 'Free Learning Plan',
            price: 0,
            startDate: new Date().toISOString()
        };

        if (userDoc.exists()) {
            await updateDoc(userRef, { subscription: subscriptionData });
        } else {
            await setDoc(userRef, { subscription: subscriptionData });
        }
        return true;
    } catch (error) {
        console.error("Error subscribing:", error);
        return false;
    }
};
