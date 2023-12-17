import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Looking for the right pharmacy for your prescription?</Text>
            <Image
                source={require('../../../assets/pharm-nav-icon.png')}
                style={styles.logo}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Sign In')}
            ><Text style={styles.letsGoText}>Lets Go {'>'}</Text>
            </TouchableOpacity>
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
        marginTop: '20%',
    },
    logo: {
        width: 250,
        height: 250,
        borderRadius: 150,
        marginTop: '10%',
    },
    letsGoText: {
        color: 'black',
        fontSize: 20,
        marginTop: '30%',
    },
});
