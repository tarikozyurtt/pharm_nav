import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { useAuth } from './AuthContext';

export default function SignUpScreen({ navigation }) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const password1 = useRef('');
    const password2 = useRef('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleSignUp = async () => {
        setPasswordsMatch(true);
        if (password1.current !== password2.current) {
            setPasswordsMatch(false);
            return;
        }

        try {
            const response = await fetch('https://splendorous-praline-960c1f.netlify.app/.netlify/functions/index/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password1.current,
                }),
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }

            // Registration successful, handle the response if needed
            const result = await response.json();
            console.log('Registration successful:', result);
            navigation.navigate("Sign In")
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Create an account</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#AFB1B6"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Surname"
                placeholderTextColor="#AFB1B6"
                value={surname}
                onChangeText={setSurname}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#AFB1B6"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                placeholderTextColor="#AFB1B6"
                value={age}
                onChangeText={setAge}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#AFB1B6"
                secureTextEntry
                value={password1}
                onChangeText={(text) => (password1.current = text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#AFB1B6"
                secureTextEntry
                value={password2}
                onChangeText={(text) => (password2.current = text)}
            />

            {!passwordsMatch && (
                <Text style={{ color: 'red' }}>Passwords do not match</Text>
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
                <Text style={styles.dontHaveAccountText}>
                    Already have an account?{' '}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
                    <Text style={styles.signUpText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    }
});
