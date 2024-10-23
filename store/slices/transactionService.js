import { db } from '../firebaseConfig'; 
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

export const saveTransaction = async (transactionData) => {
  try {
    const transactionsRef = collection(db, 'transactions');
    const docRef = await addDoc(transactionsRef, {
      ...transactionData,
      createdAt: serverTimestamp(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error saving transaction:', error);
    throw error;
  }
};

export const getTransactions = async (userId = null) => {
  try {
    const transactionsRef = collection(db, 'transactions');
    let q = query(transactionsRef, orderBy('createdAt', 'desc'));
    
    if (userId) {
      q = query(
        transactionsRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
