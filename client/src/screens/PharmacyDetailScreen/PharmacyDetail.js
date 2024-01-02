import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback, SafeAreaView, Dimensions } from 'react-native';
import Ionicon from "@expo/vector-icons/Ionicons"
import SvgComponentBlack from '../../items/star_black';
import SvgComponentYellow from '../../items/star_yellow';
import TabViewExample from '../../items/TabViewPharmacy';
import CarouselCardDetailPage from '../../items/CarouselCardDetailPage';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const renderSvgComponents = (x) => {
    const components = [];

    for (let i = 0; i < 5; i++) {
        if (i < x) {
            components.push(<SvgComponentYellow key={i} />);
        } else {
            components.push(<SvgComponentBlack key={i} />);
        }
    }

    return components;
};

const getDetail = async (body) => {
    return await fetch('https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/pharmacyinfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    });
};


export default function PharmacyDetailScreen({ route, navigation }) {
    const prop = route?.params;
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [uri] = useState(prop.uri);
    const [rating, setRating] = useState(0);
    const [distance, setDistance] = useState(0);
    const [tabviewprops, setTabviewprops] = useState({});

    useEffect(() => {
        // console.log("detail -> ", prop)
        setDistance(Math.floor(prop.distance))

        try {
            getDetail(
                JSON.stringify({
                    pharmId: prop.user_id
                })).then(async prop => {
                    const result = await prop.json()
                    // if (!result?.userEmail) {
                    //   Alert.alert('Sign Up Failed', result)
                    //   throw new Error('Sign up failed');
                    // }
                    console.log("detail res: ", result)
                    setName(result.pharmacyData.name)
                    setTabviewprops({comments: result.pharmacyData.comments, description: result.pharmacyData.name})
                    setRating(Math.floor(result.pharmacyData.rating.totalRatings))
                })

        } catch (error) {
            Alert.alert('Error registering user:', error);
        } finally {
            // setIsLoading(false);
        }

    }, []);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.detailImages}>
                    <Image source={{ uri: uri }} style={styles.image} />
                </View>

                <View style={styles.containerDetail}>
                    <View style={styles.leftAlign}>
                        <Text style={styles.leftAlignText}>{name}</Text>
                    </View>
                    <View style={styles.rightAlign}>
                        <Text style={styles.rightAlignText}>{distance} m</Text>
                    </View>
                </View>

                <View style={styles.containerDetail}>
                    <View style={styles.leftAlign}>
                        {renderSvgComponents(rating)} 
                        <Text style={{ fontSize: 12, fontWeight: "bold", marginLeft: 2 }}>{rating}</Text>
                    </View>
                </View>

            </View>
            <TabViewExample prop={tabviewprops} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    containerDetail: {
        width: "90%",
        flexDirection: 'row', // Arrange children in a row
        justifyContent: 'space-between', // Spread children to each end of the row
        paddingTop: 5
    },
    leftAlign: {
        alignItems: 'flex-start', // Align children to the start (left)
        flex: 1,
        flexDirection: "row",
    },
    leftAlignText: {
        fontSize: 20,
    },
    rightAlign: {
        alignItems: 'flex-end', // Align children to the end (right)
        textAlign: "center",
        justifyContent: 'center'
    },
    rightAlignText: {
        fontSize: 15,
        fontWeight: "bold",
    },
    detailText: {
        fontSize: 25,
        marginTop: 10,
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: "40%",
    },
    scene: {
        flex: 1,
    },
    image: {
        width: ITEM_WIDTH + 20,
        height: 200,
    },
});
