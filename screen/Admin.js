import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const AdminScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Services')}
        style={styles.button}
      >
        Manage Services
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Transactions')}
        style={styles.button}
      >
        View Transactions
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    marginBottom: 16,
  },
});