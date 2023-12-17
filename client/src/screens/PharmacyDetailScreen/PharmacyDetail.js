import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback, SafeAreaView, Dimensions } from 'react-native';
import Ionicon from "@expo/vector-icons/Ionicons"
import SvgComponentBlack from '../../items/star_black';
import SvgComponentYellow from '../../items/star_yellow';
import TabViewExample from '../../items/TabViewPharmacy';
import CarouselCardDetailPage from '../../items/CarouselCardDetailPage';



export default function PharmacyDetailScreen({ navigation }) {
    const [prescriptionCode, setPrescriptionCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    return (
        <ScrollView>
        <View style={styles.container}>
            <TouchableOpacity style={styles.return} onPress={()=>navigation.navigate("PharmacyList")}>
                <Ionicon style={{fontSize: 30}} name = "chevron-back-outline"/>
            </TouchableOpacity>

            <Text style={styles.detailText}>Pharmacy Detail</Text>

            <SafeAreaView style={styles.container1}>
                <CarouselCardDetailPage />
            </SafeAreaView>

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
                <Text style={{fontSize:12, fontWeight:"bold", marginLeft:2}}> 4.5</Text>
                </View>
            </View>

        </View>
            <TabViewExample />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerDetail: {
        width:"90%",
        flexDirection: 'row', // Arrange children in a row
        justifyContent: 'space-between', // Spread children to each end of the row
        paddingHorizontal: 16, // Adjust as needed
        marginTop: 20, // Adjust as needed
      },
      leftAlign: {
        alignItems: 'flex-start', // Align children to the start (left)
        flex:1,
        flexDirection: "row",
      },
      leftAlignText:{
        fontSize:20,
      },
      rightAlign: {
        alignItems: 'flex-end', // Align children to the end (right)
        textAlign: "center",
        justifyContent: 'center'
      },
      rightAlignText:{
        fontSize:15,
        fontWeight:"bold",
      },
    detailText: {
        fontSize: 25,
        marginTop: 10,
    },
    container1: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30,
      },
    return:{
        marginTop:15,
        marginLeft:15,
        marginRight:"auto"
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    scene: {
        flex: 1,
      },
});
