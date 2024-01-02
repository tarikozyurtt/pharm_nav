import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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

const PharmacyItem = ({ code, drugs, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {navigation.replace("Dashboard", code)}}>
      <Text style={styles.code}>{code}</Text>
      <View style={styles.drugsContainer}>
        {Object.entries(drugs).map(([drugName, quantity]) => (
          <View key={drugName} style={styles.drugItem}>
            <Text style={styles.drugName}>{drugName}</Text>
            <Text style={styles.quantity}>{`Quantity: ${quantity}`}</Text>
          </View>
        ))}
      </View>
      </TouchableOpacity>
    </View>
    
  );
};

export default function ProfileScreen({ navigation }) {
  const { user, signOut } = useAuth();
  const [history, setHistory] = useState([])

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
          console.log("profile res: ", result.pastPrescriptions)
          setHistory(result.pastPrescriptions)
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
    <View style={styles.main}>
      <ScrollView style={styles.slider}>
      {history.map((data, index) => (
        <PharmacyItem key={index} {...data} navigation={navigation} />
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogOut}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  slider: {
    width: "100%",
  },
  text: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#6f70ff',
    padding: 10,
    margin: '8%',
    width: '80%',
    borderRadius: 5,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  code: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  drugsContainer: {
    flexDirection: 'column',
  },
  drugItem: {
    marginBottom: 8,
  },
  drugName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 14,
  },
});
