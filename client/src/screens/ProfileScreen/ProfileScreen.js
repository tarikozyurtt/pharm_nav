import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ navigation }) {

  const handleLogOut = async () => {
    // Logic for signing out (e.g., clearing authentication tokens, resetting user state, etc.)
    console.log('user signed out')
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
    return true
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogOut}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#6f70ff',
    padding: 10,
    margin: '4%',
    width: '80%',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
