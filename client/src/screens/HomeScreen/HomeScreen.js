import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useAuth } from '../../AuthContext';
import * as Location from 'expo-location';

export default function HomeScreen({ route, navigation }) {
    const prop = route.params || '';
    const { user, signOut } = useAuth();
    const [prescriptionCode, setPrescriptionCode] = useState(prop.code);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [codeInputEnable,setCodeInputEnable] = useState(false)

    const searchPrescriptionCode = async (body) => {
        return await fetch('https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/pharmacy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':"Bearer " + user.token
            },
            body: body,
        });
    };


    useEffect(() => {

        (async () => {
            console.log("looooooooo",user)
            setCodeInputEnable(false)
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Error', 'Permission to access location was denied.');
                return;
            }

            Location.getCurrentPositionAsync({}).then(async prop => {
                setLocation({
                    latitude: prop.coords.latitude,
                    longitude: prop.coords.longitude
                });
                setCodeInputEnable(true)
                console.log("current location: ", prop.coords.latitude)
            })


        })();
    }, []);
    

    const handleSearch = async () => {
        console.log("--------kod-------",prescriptionCode);
        // Validate if the entered code is exactly 6 characters
        if (prescriptionCode.length === 6) {

            // Convert to uppercase
            const code = prescriptionCode.toUpperCase();

            Keyboard.dismiss();
            setIsLoading(true);
            if (location) {
                searchPrescriptionCode(JSON.stringify({
                    code: code,
                    location: location,
                    userId: user.userId
                })).then(async prop => {
                    const result = await prop.json();
                    console.log("Search Result: ", JSON.stringify(result), user.token)
                    if(result.message){
                        throw new Error();
                    }
                    navigation.navigate("PharmacyList", result)
                })
                    .catch(error => {
                        Alert.alert('Searching Prescription Code Failed!', "An error occurred while searching. Please try again.");
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
            else {
                Alert.alert('Alert', 'Please make sure you given the location access properly.');
                setIsLoading(false);
            }
        } else {
            // Notify the user about the invalid code
            Alert.alert('Invalid Prescription Code', 'Please enter a valid 6-digit code.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.container}>
                <Text style={styles.headerText}>PharmNav</Text>
                <Image
                    source={require('../../../assets/pharm-nav-icon.png')}
                    style={styles.logo}
                />
                {!isLoading && (
                    <View style={styles.bottomContainer}>
                        <TextInput
                            editable={codeInputEnable}
                            style={styles.input}
                            placeholder="Enter Prescription Code"
                            onChangeText={(text) => setPrescriptionCode(text)}
                            value={prescriptionCode}
                            maxLength={6}
                            autoCapitalize="characters"
                            placeholderTextColor="#AFB1B6"
                        />
                        <TouchableOpacity
                            disabled={!codeInputEnable}
                            style={styles.findButton}
                            onPress={handleSearch}
                        >
                            {
                                codeInputEnable ? 
                                (<Text style={styles.buttonText}>
                                    Find Pharmacies
                                </Text>)
                                :
                                (<Text style={styles.buttonText}>
                                    Wait Location
                                </Text>)
                            }
                            
                        </TouchableOpacity>
                    </View>
                )}

                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Searcing nearest appropriate pharmacies...</Text>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
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
        color: "#ac99d2"
    },
    input: {
        height: 40,
        width: '60%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: '7%',
        padding: 10,
        borderRadius: 10
    },
    logo: {
        width: 250,
        height: 250,
        borderRadius: 150,
        marginTop: '8%',
    },
    findButton: {
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
        top: '20%',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white background
    },
});
