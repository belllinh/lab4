import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ServicesScreen from '../screen/Services';
import AddNewService from '../screen/AddNewService';
import ServiceDetail from '../screen/ServiceDetail';

const Stack = createStackNavigator();

export const ServiceStack = () => {
  return (
    <Stack.Navigator>
   
      <Stack.Screen 
        name="Services" 
        component={ServicesScreen} 
        options={{ headerShown: false }}    />
      

      <Stack.Screen 
        name="AddNewService" 
        component={AddNewService} 
        options={{ headerTitle: 'Service', headerShown: true }} 
      />
      

      <Stack.Screen 
        name="ServiceDetail" 
        component={ServiceDetail} 
        options={{
          headerTitle: 'Thông tin dịch vụ',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: 'bold',
    },
  }}
/>
    </Stack.Navigator>
  );
};

