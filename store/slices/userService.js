import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: userData.name,
      department: userData.department,
      createdAt: new Date().toISOString()
    });
    alert("User added successfully!");
    return docRef.id;
  } catch (error) {
    console.error("Error adding user: ", error);
    alert("Error adding user.");
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
};

export const updateUser = async (userId, updatedUser) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, updatedUser);
    alert("User updated successfully!");
  } catch (error) {
    console.error("Error updating user: ", error);
    alert("Error updating user.");
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
    alert("User deleted successfully!");
  } catch (error) {
    console.error("Error deleting user: ", error);
    alert("Error deleting user.");
    throw error;
  }
};

export const updateUserServices = async (userId, services) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      services: services,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error updating user services: ", error);
    throw error;
  }
};

export const getUserServices = async (userId) => {
  try {
    const userDoc = await getDocs(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data().services || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching user services: ", error);
    throw error;
  }
};