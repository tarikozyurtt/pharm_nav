import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import Ionicon from "@expo/vector-icons/Ionicons"
import CarouselCards from '../../items/CarouselCardListPage';
import GridView from '../../items/GridView';

export default function PharmacyListScreen({ navigation }) {
    const [prescriptionCode, setPrescriptionCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
   
    return (
        <ScrollView>
        <View style={styles.container}>
            <TouchableOpacity style={styles.return} onPress={()=>navigation.navigate("Dashboard")}>
                <Ionicon style={{fontSize: 30}} name = "chevron-back-outline"/>
            </TouchableOpacity>

            <Text style={styles.sponsorText}>Sponsor Pharmacies</Text>

            <SafeAreaView style={styles.container1}>
                <CarouselCards />
            </SafeAreaView>

            <View style={styles.grid}>
                <GridView navigation={navigation}/>
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    grid:{
        width:"100%",
        alignItems: 'center',
    },
    sponsorText: {
        fontSize: 30,
        marginTop: '5%',
    },
    container1: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30,
      },
    return:{
        marginTop:15,
        marginLeft:15,
        marginRight:"auto"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bottomContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    headerText: {
        fontSize: 35,
        marginTop: '10%',
        color:"#ac99d2"
    },
    input: {
        height: 40,
        width: '60%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: '7%',
        padding: 10,
        borderRadius:10
    },
    logo: {
        width: 250,
        height: 250,
        borderRadius: 150,
        marginTop: '8%',
    },
    findButton:{
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
    loadingContainer: {
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white background
    },
    sponsor:{
        fontSize:50,
        fontWeight:"bold"
    },
});
