import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function SupportScreen() {

  const [pharmacyName, setPharmacyName] = useState('');
  const [pharmacistName, setPharmacistName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [problem, setProblem] = useState('');

  const sendSupport = () => {
    
  };
 
  return (
    <View style={styles.container}>
      <Image
                source={require('../../../assets/pharm-nav-icon.png')}
                style={styles.logo}
      />
      <Text style={styles.headerText}>Support</Text>

      <TextInput style={styles.input} placeholder={'Pharmacy Name'} placeholderTextColor="#AFB1B6"  value={pharmacyName} onChangeText={(text)=>setPharmacyName(text)}/>
      <TextInput style={styles.input} placeholder={'Pharmacist Name'} placeholderTextColor="#AFB1B6"  value={pharmacistName} onChangeText={(text)=>setPharmacistName(text)}/>
      <TextInput style={styles.input} placeholder={'Email'} placeholderTextColor="#AFB1B6" value={email} onChangeText={(text)=>setEmail(text)}/>   
      <TextInput style={styles.input} placeholder={'Prescription Code'} placeholderTextColor="#AFB1B6" value={code} onChangeText={(text)=>setCode(text)}/>   
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
