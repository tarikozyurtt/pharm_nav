import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useAuth } from '../../AuthContext';

export default function WelcomeScreen({ navigation }) {
    const { user, signOut } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Looking for the right pharmacy for your prescription?</Text>
            </View>
            <Image
                source={require('../../../assets/pharm-nav-icon.png')}
                style={styles.logo}
            />
            <TouchableOpacity
                onPress={() => user ? navigation.navigate('Dashboard') : navigation.navigate('Sign In')}
                style={styles.letsGoButton}
            ><Text style={styles.letsGoText}>Let's Go {'>'}</Text>
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
    headerView:{
        width:"80%",
        marginTop: 30,
        borderRadius:10,

    },
    headerText: {
        width:"100%",
        textAlign: 'center',
        fontSize: 25,
        padding:5
    },
    logo: {
        width: 250,
        height: 250,
        borderRadius: 150,
        marginTop: '10%',
    },
    letsGoButton:{
        borderWidth:2,
        marginTop: '30%',
        borderRadius:7

    },
    letsGoText: {
        color: 'black',
        fontSize: 20,
        padding:7,
    },
});
