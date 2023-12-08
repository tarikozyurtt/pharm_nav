import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../AuthContext';

const authenticateUser = (email, password) => {
    // authentication logic here
    return true;
};

export default function SignInScreen({ navigation }) {
    const { user, signOut } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = () => {
        const isSigninSuccessful = authenticateUser(email, password);

        if (isSigninSuccessful) {
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('user:', user)
            navigation.navigate('Home');
        } else {
            // Notify the user about unsuccessful login
            Alert.alert('Sign In Failed', 'Invalid email or password. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/pharm-nav-icon.png')}
                style={styles.logo}
            />
            <Text style={styles.headerText}>Sign in to your account</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignin}
            >
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
                <Text style={styles.dontHaveAccountText}>
                    Don't have an account yet?{' '}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                    <Text style={styles.signUpText}>Sign Up</Text>
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
    headerText: {
        fontSize: 30,
        marginTop: '5%',
    },
    logo: {
        width: 250,
        height: 250,
        borderRadius: 150,
        marginTop: '8%',
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
    }
});
