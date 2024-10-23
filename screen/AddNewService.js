import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert,Text } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateServiceInFirestore, fetchServicesFromFirestore } from '../store/slices/serviceSlice';

const generateHexId = (length = 8) => {
  return 'sAlt' + [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

const AddNewService = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState(null);
  const minPrice = 1000; // Giá trị min
  const maxPrice = 99999999; // Giá trị max

  const user = useSelector((state) => state.auth.user);
  const creator = user ? user.displayname : 'anonymous'; 
  

  const services = useSelector((state) => state.service.services);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params?.serviceId) {
      const service = services.find(s => s.id === route.params.serviceId);
      if (service) {
        setName(service.name);
        setDescription(service.description);
        setPrice(service.price.toString());
        setId(service.id);
      }
    }
  }, [route.params?.serviceId, services]);  



  const handlePriceChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    
    if (numericValue !== '') {
      setPrice(numericValue);    
    } else {
      setPrice('');
    }
    if (!isNaN(numericValue) && numericValue >= minPrice && numericValue <= maxPrice) {
      setPrice(value);
    } else {
      // Nếu giá trị không hợp lệ, bạn có thể chọn không làm gì hoặc thông báo cho người dùng
      console.log('Giá trị không hợp lệ. Phải nằm trong khoảng từ 0 đến 1000000.');
    }
  };


  const handleSaveService = () => {
    if (!name || !description || !price) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      Alert.alert('Validation Error', 'Price must be a valid number.');
      return;
    }
    console.log(id + ' truoc khi luu');
    const service = {
      id: id || generateHexId(),      
      name,
      description,
      price: parsedPrice,
      creator,      
      finalUpdate: Date.now(), 
    };
    if (!id) {
      service.time = Date.now();
    }else {
      const existingService = services.find(s => s.id === id);
      if (existingService) {
        service.time = existingService.time;
      }
    }
    console.log(service);
    dispatch(addOrUpdateServiceInFirestore(service));
    dispatch(fetchServicesFromFirestore());
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Headline style={styles.headline}>{id ? 'Update Service' : 'New Service'}</Headline>

      <TextInput
        label="Service Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      <TextInput
        label="Price"
        value={price}        
        onChangeText={handlePriceChange}
        keyboardType="numeric"
        style={styles.input}     
      />
       {price && (parseFloat(price) < minPrice || parseFloat(price) > maxPrice) && (
        <Text style={styles.errorText}>Giá trị phải nằm trong khoảng từ {minPrice} đến {maxPrice}.</Text>
      )}
      <Button mode="contained" onPress={handleSaveService} style={styles.button}>
        {id ? 'Update' : 'Add'}
      </Button>
    </ScrollView>
  );
};

export default AddNewService;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    elevation: 2
  },
  headline: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    color: '#f50062',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#f50062',
    borderRadius:15,
  },
});
