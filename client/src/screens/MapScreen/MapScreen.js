import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen({ route }) {
    prop = route.params
    const pharmLocation = {
        latitude: prop.coordinates[0],
        longitude: prop.coordinates[1]
    }  
    const [location, setLocation] = useState(null);
    const [mid, setMid] = useState(null);

    useEffect(() => {
        (async () => {
            // console.log("pharm loc -> ", pharmLocation)

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Error', 'Permission to access location was denied.');
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});

            setLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.02
            });

            setMid({
                latitude: (loc.coords.latitude + pharmLocation.latitude) / 2,
                longitude: (loc.coords.longitude + pharmLocation.longitude) / 2,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            })
        })();
    }, []);

    return (
        <View style={styles.container}>
            {location ? (
                <MapView style={styles.map} region={mid}>
                    <Marker coordinate={location} title="You are here" />
                    <Marker coordinate={pharmLocation} title="Your target pharmacy"/>
                </MapView>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    map: {
        flex: 1,
        width: '100%',
    },
});