import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CarouselCards from '../../items/CarouselCardListPage';
import SvgComponentYellow from '../../items/star_yellow';
import SvgComponentBlack from '../../items/star_black';

// const data = [
//     { name: 'Pharmacy Faruk', image: "https://artozalit.com/wp-content/uploads/2022/12/eczane-tabelasi.jpg", distance: 100, star: 2 },
//     { name: 'Pharmacy Emre', image: "https://www.zengrafik.com/wp-content/uploads/2020/12/yeni-eczane-tabelasi-12.jpg", distance: 200, star: 2 },
//     { name: 'Pharmacy Yunus', image: "https://lh3.googleusercontent.com/p/AF1QipPYkRw61EBuQXCHzBwb21c4PMt1cOkCkJJNjT7d=w1080-h608-p-no-v0", distance: 300, star: 2 },
//     { name: 'Pharmacy Hilmi', image: "https://www.zengrafik.com/wp-content/uploads/2020/12/yeni-eczane-tabelasi-12.jpg", distance: 400, star: 2 },
//     { name: 'Pharmacy Robert', image: "https://lh3.googleusercontent.com/p/AF1QipPYkRw61EBuQXCHzBwb21c4PMt1cOkCkJJNjT7d=w1080-h608-p-no-v0", distance: 500, star: 2 },
// ];

// const carouselData = [
//     {
//       title: "Eczane DHMFNBMSND",
//       body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
//       imgUrl: "https://lh3.googleusercontent.com/p/AF1QipPYkRw61EBuQXCHzBwb21c4PMt1cOkCkJJNjT7d=w1080-h608-p-no-v0",
//     },
//     {
//       title: "Eczane Feyza",
//       body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
//       imgUrl: "https://www.zengrafik.com/wp-content/uploads/2020/12/yeni-eczane-tabelasi-12.jpg",
//     },
//     {
//       title: "Eczane Yalı",
//       body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
//       imgUrl: "https://artozalit.com/wp-content/uploads/2022/12/eczane-tabelasi.jpg",
//     },
//   ]

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
    const [prescriptionCode, setPrescriptionCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("data -> ", data)
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
        return (
            <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate("PharmacyDetail", item._id)
            console.log("item : ", item._id)}}>
                <Image source={{ uri: item.pharmImage }} style={styles.image2} />
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDistance}>{item.distance} m</Text>
                <View style={styles.rating}>
                {renderSvgComponents(Math.floor(item?.rating?.totalRatings / item?.rating?.totalUsers))}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headerText}>Sponsor Pharmacies</Text>
            <View style={styles.carousel}>
                <CarouselCards data={data.premiumPharmacies}/>
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
