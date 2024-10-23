import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { CustomerScreen, SettingScreen, TransactionScreen } from '../screen/index';
import { ServiceStack } from './RouterService';
import { House, UsersRound, Banknote, Settings } from 'lucide-react-native';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#e91e63"
    inactiveColor="black"
    barStyle={{ 
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#f4f4f4',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    }}
    shifting={false}
    labeled={false}
  >
    <Tab.Screen
      name="Home"
      component={ServiceStack}
      options={{
        tabBarIcon: ({ color }) => (
          <House
            size={28}
            color={color}
            style={{ width: 24, height: 24 }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Customer"
      component={CustomerScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <UsersRound
            size={28}
            color={color}
            style={{ width: 24, height: 24 }}
          />
        ),
      }}
    />   
    <Tab.Screen
      name="Setting"
      component={SettingScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Settings
            size={24}
            color={color}
            style={{ width: 24, height: 24 }}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

// Wrap TabNavigator in Stack Navigator
const AppStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: 'white' }
      }}
    >
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export { AppStack };