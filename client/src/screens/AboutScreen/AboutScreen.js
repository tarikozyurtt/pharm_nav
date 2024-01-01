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
        <Text style={styles.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a 
        type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more 
        recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
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
