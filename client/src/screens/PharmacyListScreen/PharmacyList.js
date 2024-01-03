import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CarouselCards from '../../items/CarouselCardListPage';
import SvgComponentYellow from '../../items/star_yellow';
import SvgComponentBlack from '../../items/star_black';
import StarRating from 'react-native-star-rating-widget';


const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data?.length / numColumns);

    let numberOfElementsLastRow = data?.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }
    return data;
};

const numColumns = 2;

export default function PharmacyListScreen({ route, navigation }) {
    const data = route?.params?.pharmacyData;

    useEffect(() => {
        console.log("pharmacy list params -> ", data)
    }, []);

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

    const renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        console.log("look rating: ", item.rating)
        return (
            <TouchableOpacity style={styles.item} onPress={() => {
                // console.log("asdasd")
                // console.log("item : ", item)
                navigation.navigate("PharmacyDetail", {pharmId: item._id, distance: Math.floor(item.distance), uri: item.pharmImages[0]})
            }}>
                {item?.pharmImages && (
                    <Image source={{ uri: item.pharmImages[0] }} style={styles.image2} />
                )}
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDistance}>{Math.floor(item.distance)} m</Text>
                <View style={styles.rating}>
                <StarRating
                    rating={item?.rating?.totalRatings / item?.rating?.raters.length}
                    onChange={()=>{}}
                    color="#FFA500"
                    starSize="17"
                />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headerText}>Sponsor Pharmacies</Text>
            <View style={styles.carousel}>
                <CarouselCards data={data.premiumPharmacies} navigation={navigation} />
            </View>
            <FlatList
                data={formatData(data.pharmacies, numColumns)}
                style={styles.containerFlatList}
                renderItem={renderItem}
                numColumns={numColumns}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    containerFlatList: {
        width: '100%',
    },
    image2: {
        width: '92%',
        resizeMode: "cover",
        aspectRatio: 1,
        marginBottom: 20,
    },
    container: {
        width: "90%",
        flex: 1,
        marginVertical: 20,
    },
    item: {
        borderColor: "#4D243D",
        alignItems: 'center',
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 15,
        alignSelf: 'auto',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // for Android
        borderRadius: 3,
    },
    itemInvisible: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 15,
        height: Dimensions.get('window').width / numColumns, // approximate a square
        shadowOpacity: 0,
    },
    itemName: {
        color: '#000',
    },
    itemDistance: {
        borderWidth: 1,
        borderRadius: 3,
        marginVertical: 15,
        paddingHorizontal: 3,
        paddingVertical: 2,
    },
    rating: {
        flex: 1,
        flexDirection: "row",
        marginVertical: 5
    },
    carousel: {
        height: "34%",
        width: "100%",
    },
});
