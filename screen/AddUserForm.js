import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
import { UserPlus } from 'lucide-react-native';

export default function AddUserForm({ onUserAdded }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddUser = async () => {
    if (name.trim() && department.trim()) {
      setLoading(true);
      try {
        await onUserAdded({ name: name.trim(), department: department.trim() });
        setName('');
        setDepartment('');
        Alert.alert('Success', 'User added successfully');
      } catch (error) {
        Alert.alert('Error', 'Failed to add user. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Error', 'Name and department are required');
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>New User</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={department}
        onChangeText={setDepartment}
        placeholderTextColor="#999"
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddUser}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <>
            <UserPlus size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Add User</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  input: {
    height: 48,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#333333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 8,
  },
});