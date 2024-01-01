import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../AuthContext';

const getHistory = async (body) => {
  return await fetch('https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
};

export default function ProfileScreen({ navigation }) {
  const { user, signOut } = useAuth();
  useEffect(() => {
    console.log(user.userId)

    try {
      getHistory(
        JSON.stringify({
          userId: user.userId
        })).then(async prop => {
          const result = await prop.json()
          // if (!result?.userEmail) {
          //   Alert.alert('Sign Up Failed', result)
          //   throw new Error('Sign up failed');
          // }
          console.log("profile res: ", result)
        })

    } catch (error) {
      Alert.alert('Error registering user:', error);
    } finally {
      // setIsLoading(false);
    }

  }, []);

  const handleLogOut = async () => {
    // Logic for signing out (e.g., clearing authentication tokens, resetting user state, etc.)
    console.log('user signed out')
    signOut();
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
