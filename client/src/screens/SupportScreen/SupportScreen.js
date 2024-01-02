import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Keyboard, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

export default function SupportScreen() {
  const [email, setEmail] = useState('');
  const [problem, setProblem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendTicket = async (body) => {
    return await fetch('https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/sendticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
  };

  const sendSupport = () => {
    Keyboard.dismiss();
    setIsLoading(true);
    sendTicket(
      JSON.stringify({
        email: email,
        description: problem
      })).then(async prop => {
        const result = await prop.json()
        console.log("profile res: ", result)
        if (!result?.email) {
          throw new Error();
        }
        else {
          Alert.alert('Success!', 'You succesfully submitted your form!')
        }
      })
      .catch(error => {
        Alert.alert('There has been a problem...');
      })
      .finally(() => {
        setIsLoading(false);
    });
    }

return (
  <View style={styles.container}>
    <Image
      source={require('../../../assets/pharm-nav-icon.png')}
      style={styles.logo}
    />
    <Text style={styles.headerText}>Support</Text>

    {!isLoading && (
    <TextInput style={styles.input} placeholder={'Email'} placeholderTextColor="#AFB1B6" value={email} onChangeText={(text) => setEmail(text)} />
    )}
    {!isLoading && (
    <TextInput multiline={true} style={styles.inputProblem} placeholder={'Explain Your Problem'} placeholderTextColor="#AFB1B6" value={problem} onChangeText={(text) => setProblem(text)} />
    )}
    {!isLoading && (
    <TouchableOpacity
      style={styles.sendButton}
      onPress={sendSupport}
    >
      <Text style={styles.buttonText}>
        Send Message
      </Text>
    </TouchableOpacity>
    )}
    {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>We are logging you in...</Text>
                    </View>
                )}
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  headerText: {
    fontSize: 35,
    color: "#ac99d2"
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 150,
    marginTop: '5%',
  },
  input: {
    backgroundColor: "#FFF",
    width: "80%",
    paddingHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#AFB1B6",
    marginTop: 20,
  },
  inputProblem: {
    backgroundColor: "#FFF",
    width: "80%",
    paddingHorizontal: 4,
    height: 60,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#AFB1B6",
    marginTop: 20,
  },
  sendButton: {
    marginTop: 20,
    backgroundColor: "#6f70ff",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  buttonText: {
    fontSize: 17,
    color: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white background
},
});
