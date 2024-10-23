import React from 'react';
import { View, StyleSheet, SafeAreaView,Text } from 'react-native';


export const CustomerScreen = () => {
 
  return (
    <SafeAreaView style={styles.container}>
     <View><Text>Customer</Text></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});