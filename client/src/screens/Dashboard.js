import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicon from "@expo/vector-icons/Ionicons"
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from './HomeScreen/HomeScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import AboutScreen from './AboutScreen/AboutScreen';
import SupportScreen from './SupportScreen/SupportScreen';


const AlertDialog = (title, message) =>
  Alert.alert(title, message, [
    { text: 'OK', onPress: () => console.log('OK Pressed') },
  ]);

export default function Dashboard() {
  const getTabBarIconColor = (focused) => (focused ? "#FFFFFF" : "#C6B2EC");
  const Tabs = createBottomTabNavigator()

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [{
          display: 'flex',
          backgroundColor: "#6f70ff",
        },
        null]
      })}
      // tabBarOptions={{
      //   keyboardHidesTabBar: true, // This hides the tab bar when the keyboard is open
      // }}
      keyboardAvoidingView="position" // Use 'position' to avoid the tab bar overlapping the keyboard
    >
      <Tabs.Screen name="Home" component={HomeScreen} options={{ title: "Home", tabBarShowLabel: false, headerShown: false, tabBarIcon: (props) => <Ionicon name="home-outline" style={{ color: getTabBarIconColor(props.focused) }} size={25} {...props} /> }} />
      <Tabs.Screen name="ProfileStack" component={ProfileScreen} options={{ title: "Profile", tabBarShowLabel: false, headerShown: false, tabBarIcon: (props) => <Ionicon name="person" style={{ color: getTabBarIconColor(props.focused) }} {...props} /> }} />
      <Tabs.Screen name="FriendListStack" component={AboutScreen} options={{ title: "About", tabBarShowLabel: false, headerShown: false, tabBarIcon: (props) => <Ionicon name="information-circle-outline" style={{ color: getTabBarIconColor(props.focused) }} {...props} /> }} />
      <Tabs.Screen name="Support" component={SupportScreen} options={{ title: "Support", tabBarShowLabel: false, headerShown: false, tabBarIcon: (props) => <Ionicon name="build-outline" style={{ color: getTabBarIconColor(props.focused) }} {...props} /> }} />
    </Tabs.Navigator>
  )
}
const styles = StyleSheet.create({
  home: {
  },
});