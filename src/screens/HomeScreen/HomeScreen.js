import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';

const searchPrescriptionCode = async (code) => {
    // Simulating a service call, replace with actual service call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { "aspirin": 2, "paracetamol": 1 }; // service call here
            resolve(data);
        }, 1000);
    });
};

export default function HomeScreen({ navigation }) {
    const [prescriptionCode, setPrescriptionCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        // Validate if the entered code is exactly 6 characters
        if (prescriptionCode.length === 6) {
            // Convert to uppercase
            const uppercaseCode = prescriptionCode.toUpperCase();

            try {
                Keyboard.dismiss();
                setIsLoading(true);

                const result = await searchPrescriptionCode(uppercaseCode);
                console.log('Search Result:', result);
                // Handle the result as needed
            } catch (error) {
                console.error('Error searching prescription code:', error);
                // Notify the user about the error
                Alert.alert('Error', 'An error occurred while searching. Please try again.');
            }
            finally {
                setIsLoading(false); // Stop loading, whether the call was successful or not
            }
        } else {
            // Notify the user about the invalid code
            Alert.alert('Invalid Prescription Code', 'Please enter a valid 6-digit code.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
        <View style={styles.container}>
            <Text style={styles.headerText}>Pharm Nav</Text>
            <Image
                source={require('../../../assets/pharm-nav-icon.png')}
                style={styles.logo}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Prescription Code"
                onChangeText={(text) => setPrescriptionCode(text)}
                value={prescriptionCode}
                maxLength={6}
                autoCapitalize="characters"
            />
            <View
                style={styles.signUpButton}>
                <Button
                    title="Find Nearest Pharmacies"
                    onPress={handleSearch}
                /></View>

            <TouchableOpacity
                onPress={() => navigation.navigate('About')}
                style={styles.aboutButton}
            ><Text style={styles.aboutText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Support')}
                style={styles.aboutButton}
            ><Text style={styles.aboutText}>Support</Text>
            </TouchableOpacity>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Searcing Nearest Appropriate Pharmacies...</Text>
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
    headerText: {
        fontSize: 30,
        marginVertical: 30,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    logo: {
        width: '56%',
        height: '32%',
        marginBottom: 50,
    },
    aboutText: {
        color: 'black',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    loginButton: {
        margin: 10,
    },
    signUpButton: {
        margin: 10,
    },
    aboutButton: {
        margin: 10,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    },
});
