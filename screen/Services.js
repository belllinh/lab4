import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServicesFromFirestore } from '../store/slices/serviceSlice';
import { Text } from 'react-native-paper';

const ServicesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchServicesFromFirestore());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.serviceItem}
      onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}
    >
      <View style={styles.serviceRow}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.servicePrice}>
          {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {  
    console.log(error);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách dịch vụ</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search services..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredServices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNewService')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#e6e6e6',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 1,
  },
  serviceItem: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  serviceName: {
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#ff4081',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    right: 25,
    bottom: 20,
    width: 60,
    height: 60,
  },
  addButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default ServicesScreen;
