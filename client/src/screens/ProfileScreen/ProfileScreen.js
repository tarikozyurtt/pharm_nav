import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../AuthContext';


const PharmacyItem = ({ code, drugs, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.replace("Dashboard", code) }}>
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
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getHistory = async (body) => {
    return await fetch('https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':"Bearer " + user.token
      },
      body: body,
    });
  };

  useEffect(() => {
    // console.log(user.userId)
    getHistory(
      JSON.stringify({
        userId: user.userId
      })).then(async prop => {
        const result = await prop.json()
        console.log("profile res: ", result.pastPrescriptions)
        setHistory(result.pastPrescriptions)
      })
      .catch(error => {
        console.log(error)
        Alert.alert('Failed fetching history!', "Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        {!isLoading && (
          history.map((data, index) => (
            <PharmacyItem key={index} {...data} navigation={navigation} />
          ))
        )}
        {!isLoading && (
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogOut}
          >
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        )}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading history...</Text>
          </View>
        )}
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
  },
  slider: {
    width: "100%",
    height: "100%",
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
  loadingContainer: {
    paddingTop: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white background
  },
});
