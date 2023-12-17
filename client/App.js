import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import AboutScreen from './src/screens/AboutScreen/AboutScreen';
import SupportScreen from './src/screens/SupportScreen/SupportScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}