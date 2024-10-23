import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebaseConfig'; // Ensure this path is correct
import { collection, getDocs, addDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';

const initialState = {
  services: [],
  loading: false,
  error: null,
};

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
    addService: (state, action) => {
      state.services.push(action.payload);
    },
    updateService: (state, action) => {
      const index = state.services.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.services[index] = action.payload;
      }
    },
    deleteService: (state, action) => {
      state.services = state.services.filter(s => s.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setServices, addService, updateService, deleteService, setLoading, setError } = serviceSlice.actions;

export const addOrUpdateServiceInFirestore = (service) => async (dispatch) => {
  dispatch(setLoading(true));
  
  try {
    
    if (service.id) {
      await setDoc(doc(db, 'services', service.id), service); // Use setDoc with doc() for updating
      dispatch(updateService(service));
    } else {
      const docRef = await addDoc(collection(db, 'services'), service); // Use addDoc for adding
      const newService = { ...service, id: docRef.id };
      dispatch(addService(newService));
      dispatch(addService(service));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchServicesFromFirestore = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const snapshot = await getDocs(collection(db, 'services')); 
    const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch(setServices(services));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteServiceFromFirestore = (serviceId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await deleteDoc(doc(db, 'services', serviceId)); // Use deleteDoc with doc()
    dispatch(deleteService(serviceId));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default serviceSlice.reducer;
