import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking, Platform, Image  } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen({ route }) {
    prop = route.params
    const pharmLocation = {
        latitude: prop.coordinates[1],
        longitude: prop.coordinates[0]
    }  
    const [location, setLocation] = useState(null);
    const [mid, setMid] = useState(null);

    const handlePress = (latitude, longitude) => {
        const googleMapsURL = `comgooglemaps://?daddr=${latitude},${longitude}`;
        const appleMapsURL = `http://maps.apple.com/?daddr=${latitude},${longitude}`;
    
        Linking.canOpenURL(googleMapsURL)
          .then((supported) => {
            if (supported) {
              return Linking.openURL(googleMapsURL);
            } else {
              return Linking.openURL(appleMapsURL);
            }
          })
          .catch((err) => console.error('An error occurred', err));
      };

      
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
                    
                    <Marker coordinate={pharmLocation} title="Your target pharmacy" onPress={() => handlePress(prop.coordinates[1], prop.coordinates[0])}>
                        <Image source={require('D:/pharmnavPush/pharm_nav/client/assets/pharm_icon.jpg')} style={{height: 35, width:35 }} />
                    </Marker>
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