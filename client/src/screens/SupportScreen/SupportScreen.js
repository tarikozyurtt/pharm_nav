import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';

export default function SupportScreen() {
  const [email, setEmail] = useState('');
  const [problem, setProblem] = useState('');

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
    try {
      sendTicket(
        JSON.stringify({
          email: email,
          description: problem
      })).then(async prop => {
          const result = await prop.json()
          console.log("profile res: ", result)
          if (!result?.email) {
            Alert.alert('There has been a problem...')
            throw new Error('There has been a problem...');
          }
          else{
            Alert.alert('You succesfully submitted your form!')
          }
        })
        

    } catch (error) {
      Alert.alert('There has been a problem...');
    } 

  };
 
  return (
    <View style={styles.container}>
      <Image
                source={require('../../../assets/pharm-nav-icon.png')}
                style={styles.logo}
      />
      <Text style={styles.headerText}>Support</Text>

      <TextInput style={styles.input} placeholder={'Email'} placeholderTextColor="#AFB1B6" value={email} onChangeText={(text)=>setEmail(text)}/>   
      <TextInput  multiline={true} style={styles.inputProblem} placeholder={'Explain Your Problem'} placeholderTextColor="#AFB1B6" value={problem} onChangeText={(text)=>setProblem(text)}/>   
      
      <TouchableOpacity
        style={styles.sendButton}
        onPress={sendSupport}
      >
        <Text style={styles.buttonText}>
            Send Message
        </Text>
      </TouchableOpacity>
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
    color:"#ac99d2"
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 150,
    marginTop: '5%',
  },
  input:{
    backgroundColor:"#FFF",
    width:"80%",
    paddingHorizontal:4,
    paddingVertical:10,
    borderRadius:6,
    borderWidth:2,
    borderColor:"#AFB1B6",
    marginTop:20,
  },
  inputProblem:{
    backgroundColor:"#FFF",
    width:"80%",
    paddingHorizontal:4,
    height:60,
    borderRadius:6,
    borderWidth:2,
    borderColor:"#AFB1B6",
    marginTop:20,
  },
  sendButton:{
    marginTop:20,
    backgroundColor:"#6f70ff",
    borderRadius:5,
    paddingHorizontal:20,
    paddingVertical:4,
  },
  buttonText:{
    fontSize:17,
    color:"#FFFFFF",
    paddingHorizontal:20,
    paddingVertical:4,
},
});
