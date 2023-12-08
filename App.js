import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LogInScreen from './src/screens/LogInScreen/LogInScreen';
import AboutScreen from './src/screens/AboutScreen/AboutScreen';
import SupportScreen from './src/screens/SupportScreen/SupportScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Log In">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Log In" component={LogInScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
