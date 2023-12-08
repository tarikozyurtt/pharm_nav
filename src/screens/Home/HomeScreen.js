import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
    const handleLogin = () => {
        console.log('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Pharm Nav</Text>
            <Image
                source={require('../../../assets/pharm-nav-icon.png')}
                style={styles.logo}
            />
            <TextInput
                style={styles.input}
                placeholder="Username/Email"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
                <View
                    style={styles.loginButton}>
                    <Button
                        title="Login"
                        onPress={handleLogin}
                    /></View>
                <View
                    style={styles.signUpButton}>
                    <Button
                        title="Sign Up"
                        onPress={() => navigation.navigate('SignUp')}
                    /></View>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('About')}
                style={styles.aboutButton}
            ><Text style={styles.aboutText}>About</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 70,
    },
    headerText: {
        fontSize: 30,
        marginBottom: 20,
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
        marginBottom: 20,
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
});
