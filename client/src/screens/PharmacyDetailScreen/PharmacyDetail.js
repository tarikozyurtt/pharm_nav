import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback, SafeAreaView, Dimensions } from 'react-native';
import Ionicon from "@expo/vector-icons/Ionicons"
import SvgComponentBlack from '../../items/star_black';
import SvgComponentYellow from '../../items/star_yellow';
import TabViewExample from '../../items/TabViewPharmacy';
import CarouselCardDetailPage from '../../items/CarouselCardDetailPage';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

export default function PharmacyDetailScreen({ route, navigation }) {
    const prop = route?.params;
    const [prescriptionCode, setPrescriptionCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("detail", prop)
    }, []);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.detailImages}>
                    <Image source={{ uri: prop.image }} style={styles.image}/>
                </View>

                <View style={styles.containerDetail}>
                    <View style={styles.leftAlign}>
                        <Text style={styles.leftAlignText}>Pharmacy Faruk</Text>
                    </View>
                    <View style={styles.rightAlign}>
                        <Text style={styles.rightAlignText}>400 m</Text>
                    </View>
                </View>

                <View style={styles.containerDetail}>
                    <View style={styles.leftAlign}>
                        <SvgComponentYellow />
                        <SvgComponentYellow />
                        <SvgComponentYellow />
                        <SvgComponentYellow />
                        <SvgComponentBlack />
                        <Text style={{ fontSize: 12, fontWeight: "bold", marginLeft: 2 }}> 4.5</Text>
                    </View>
                </View>

            </View>
            <TabViewExample />
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
        width: ITEM_WIDTH+20,
        height: 200,
      },
});
