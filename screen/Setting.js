import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { clearUser } from '../store/slices/authSlice';

export const SettingScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [displayName, setDisplayName] = useState(user?.displayName || '');

  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  const [isEditing, setIsEditing] = useState(false); // Trạng thái để theo dõi có đang chỉnh sửa hay không

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
    }
  }, []);

  const handleSave = async () => {
    try {
      await auth().currentUser.updateProfile({ displayName });
      if (password) {
        await auth().currentUser.updatePassword(password);
      }
      Alert.alert('Success', 'Profile updated successfully!');
      setIsEditing(false); 
    } catch (error) {
      console.error('Error updating profile: ', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleclearUser = () => {
    dispatch(clearUser());
    auth().signOut().catch((error) => console.log('Error logging out: ', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.subHeader}>
        Change your basic account settings here. You may also want to{' '}
        <Text style={styles.link} onPress={() => setIsEditing(!isEditing)} >edit your profile</Text>.
      </Text>

      <TextInput
        value={displayName}
        onChangeText={setDisplayName}
        editable={isEditing} 
        style={styles.input}
        placeholder="Your name"
      />
    
      <TextInput
        value={email}
        onChangeText={setEmail}
        editable={isEditing} 
        style={styles.input}
        placeholder="Your email"
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        editable={isEditing} 
        style={styles.input}
        placeholder="***********"
        secureTextEntry
      />
      
    
      {isEditing && (
        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Save updates
        </Button>
      )}

      <Button 
        mode="outlined" 
        onPress={() => setIsEditing(!isEditing)} 
        style={styles.button}>
        {isEditing ? 'Cancel' : 'Edit'} 
      </Button>

      <Button mode="outlined" onPress={handleclearUser} style={styles.button}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 16,
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  input: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 8,
    fontSize: 16,
  },
  button: {
    marginBottom: 16,
  },
});

export default SettingScreen;
