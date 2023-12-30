import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard, Image, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../../AuthContext';

const authenticateUser = async (body) => {
    return await fetch('https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body,
    });
};

const simulateFunctionCall = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Function call completed");
        }, 2000); // 2000 milliseconds = 2 seconds
    });
};

export default function SignInScreen({ navigation }) {
    const { user, signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const route = useRoute(0);
    const signUp = route.params?.signUpSuccess;
    const [mandatoryFull, setMandatoryFull] = useState(true);
    const [mandatoryFields, setMandatoryFields] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignin = async () => {
        const emptyFields = []
        if (!email) {
            emptyFields.push('email')
        }
        if (!password) {
            emptyFields.push('password')
        }
        setMandatoryFields(emptyFields);
        if (emptyFields.length > 0) {
            setMandatoryFull(false)
            return;
        }
        else {
            setMandatoryFull(true)
        }
        try {
            Keyboard.dismiss();
            setIsLoading(true);

            authenticateUser(
                JSON.stringify({
                    email: email,
                    password: password,
                })).then(async prop => {
                    const result = await prop.json();
                    console.log("Res: ",result)
                    if (!result?.userToken) {
                        Alert.alert('Sign In Failed', 'Invalid email or password. Please try again.')
                        throw new Error('Sign in failed');
                    }
                    signIn(result.userToken, result.userInfo);
                    navigation.replace("Dashboard")
                })
             
        } catch (error) {
            Alert.alert('Sign In Failed', 'Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
            setPassword('')
        }
    };

    useEffect(() => {
        if (signUp === 1) {
            Alert.alert('Sign Up Successful', 'Your sign up was successful!');
        }
    }, [signUp]);

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/pharm-nav-icon.png')}
                    style={styles.logo}
                />
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>Sign in to your account</Text>
                </View>
                {!isLoading && (<TextInput
                    style={[styles.input, mandatoryFields.includes('email') && styles.mandatory]}
                    placeholder="Email*"
                    placeholderTextColor="#AFB1B6"
                    value={email}
                    onChangeText={setEmail}
                />)}
                {!isLoading && (<TextInput
                    style={[styles.input, mandatoryFields.includes('password') && styles.mandatory]}
                    placeholder="Password*"
                    placeholderTextColor="#AFB1B6"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />)}
                {!mandatoryFull && (
                    <Text style={{ color: 'red' }}>You did not fill all mandatory fields!</Text>
                )}
                {!isLoading && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignin}
                    >
                        <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableOpacity>)}

                {!isLoading && (
                    <View style={styles.signUpContainer}>
                        <Text style={styles.dontHaveAccountText}>
                            Don't have an account yet?{' '}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>)}
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>We are logging you in...</Text>
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
    headerView: {
        width: "80%"
    },
    headerText: {
        fontSize: 30,
        marginTop: '5%',
        fontWeight: "bold",
        textAlign: "center"
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 150,
        marginTop: '4%',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: '5%',
        padding: 10,
        borderRadius: 10,
    },
    signInButton: {
        marginTop: '5%',
        width: '80%',
        height: 50,
    },
    signUpButton: {
        margin: 10,
    },
    button: {
        backgroundColor: '#6f70ff',
        padding: 10,
        margin: '4%',
        width: '80%',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    dontHaveAccountText: {
        fontSize: 16,
    },
    signUpText: {
        color: '#6f70ff',
        fontSize: 16,
    },
    signUpContainer: {
        flexDirection: 'row',
    },
    mandatory: {
        borderColor: 'red', // Change border color to red for mandatory fields
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
