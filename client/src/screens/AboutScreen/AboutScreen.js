import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Image
                source={require('../../../assets/pharm-nav-icon.png')}
                style={styles.logo}
      />
      <Text style={styles.headerText}>About PharmNav</Text>
      <View style={styles.textView}>
        <Text style={styles.text}>
        PharmNav is a pioneering mobile application designed to revolutionize the process of accessing prescription medication from pharmacies. The core objective is to create a user-friendly application that efficiently connects customers with nearby pharmacies and provides real-time inventory management for pharmacy owners. PharmNav goes beyond basic functionalities by offering alternative pharmacy suggestions and generating comprehensive reports for drug producers.
        </Text>
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    color:"#ac99d2"
  },
  textView:{
    width:"80%",
    marginTop:20,
    
  },
  text:{
    fontSize:15,
    textAlign:"center",
    color:"#786b93"
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 150,
    marginTop: '5%',
  },
});
