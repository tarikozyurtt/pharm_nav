import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, StyleSheet, Keyboard } from 'react-native';
// import { useAuth } from './AuthContext';

const callRegister = async (body) => {
    return await fetch('https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/registerPatient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    });
};

const simulateFunctionCall = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Function call completed");
        }, 4000); // 2000 milliseconds = 2 seconds
    });
};

export default function SignUpScreen({ navigation }) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [mandatoryFull, setMandatoryFull] = useState(true);
    const [mandatoryFields, setMandatoryFields] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        const emptyFields = []
        if (!name) {
            emptyFields.push('name')
        }
        if (!surname) {
            emptyFields.push('surname')
        }
        if (!email) {
            emptyFields.push('email')
        }
        if (!password1) {
            emptyFields.push('password1')
        }
        if (!password2) {
            emptyFields.push('password2')
        }
        setMandatoryFields(emptyFields);

        if (emptyFields.length > 0) {
            setMandatoryFull(false)
            return;
        }
        else {
            setMandatoryFull(true)
        }

        setPasswordsMatch(true);
        if (password1 !== password2) {
            setPasswordsMatch(false);
            return;
        }

        try {
            Keyboard.dismiss();
            setIsLoading(true);
            console.log("asda", JSON.stringify({
                userRole: 1,
                name: name,
                email: email,
                password: password1,
            }))
            callRegister(
                JSON.stringify({
                    userRole: 1,
                    name: name,
                    email: email,
                    password: password1,
                })).then(async prop => {
                    const result = await prop.json()
                    if(!result?.userEmail) {
                        Alert.alert('Sign Up Failed', result)
                        throw new Error('Sign up failed');
                    }
                    console.log("Signup res: ",result)
                    navigation.navigate("Sign In", { signUpSuccess: 1 })
                })
            
        } catch (error) {
            Alert.alert('Error registering user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.container}>
                {!isLoading && (<View style={styles.headerView}>
                    <Text style={styles.headerText}>Create an account</Text>
                </View>)}
                {!isLoading && (<TextInput
                    style={[styles.input, mandatoryFields.includes('name') && styles.mandatory]}
                    placeholder="Name*"
                    placeholderTextColor="#AFB1B6"
                    value={name}
                    onChangeText={setName}
                />)}
                {!isLoading && (<TextInput
                    style={[styles.input, mandatoryFields.includes('surname') && styles.mandatory]}
                    placeholder="Surname*"
                    placeholderTextColor="#AFB1B6"
                    value={surname}
                    onChangeText={setSurname}
                />)}
                {!isLoading && (<TextInput
                    style={[styles.input, mandatoryFields.includes('email') && styles.mandatory]}
                    placeholder="Email*"
                    placeholderTextColor="#AFB1B6"
                    value={email}
                    onChangeText={setEmail}
                />)}
                {!isLoading && (<TextInput
                    style={styles.input}
                    placeholder="Birthyear"
                    keyboardType="numeric"
                    placeholderTextColor="#AFB1B6"
                    value={age}
                    onChangeText={setAge}
                />)}
                {!isLoading && (<TextInput
                    style={[styles.input, mandatoryFields.includes('password1') && styles.mandatory]}
                    placeholder="Password*"
                    placeholderTextColor="#AFB1B6"
                    secureTextEntry
                    value={password1}
                    onChangeText={setPassword1}
                />)}
                {!isLoading && (<TextInput
                    style={[styles.input, mandatoryFields.includes('password2') && styles.mandatory]}
                    placeholder="Confirm Password*"
                    placeholderTextColor="#AFB1B6"
                    secureTextEntry
                    value={password2}
                    onChangeText={setPassword2}
                />)}

                {!mandatoryFull && (
                    <Text style={{ color: 'red' }}>You did not fill all mandatory fields!</Text>
                )}

                {!passwordsMatch && mandatoryFull && (
                    <Text style={{ color: 'red' }}>Passwords do not match</Text>
                )}

                {!isLoading && (<TouchableOpacity
                    style={styles.button}
                    onPress={handleSignUp}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>)}
                {!isLoading && (<View style={styles.signUpContainer}>
                    <Text style={styles.dontHaveAccountText}>
                        Already have an account?{' '}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
                        <Text style={styles.signUpText}>Sign In</Text>
                    </TouchableOpacity>
                </View>)}
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Registering...</Text>
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
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: '3%',
        padding: 10,
        borderRadius: 10,
    },
    mandatory: {
        borderColor: 'red', // Change border color to red for mandatory fields
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
