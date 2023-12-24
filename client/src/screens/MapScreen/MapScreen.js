import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
    const [location, setLocation] = useState(null);
    const [location2, setLocation2] = useState({
        latitude: 41.1328,
        longitude: 29.0160
    });
    const [mid, setMid] = useState(null);

    useEffect(() => {
        (async () => {

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
                latitude: (loc.coords.latitude + location2.latitude) / 2,
                longitude: (loc.coords.longitude + location2.longitude) / 2,
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
                    <Marker coordinate={location2} title="You are here" />
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
