import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import SvgComponentYellow from './star_yellow';
import SvgComponentBlack from './star_black';

const data = [
  { empty: false, name: 'Pharmacy Faruk', image: "https://artozalit.com/wp-content/uploads/2022/12/eczane-tabelasi.jpg", distance: 100, star: 2 },
  { name: 'Pharmacy Emre', image: "https://www.zengrafik.com/wp-content/uploads/2020/12/yeni-eczane-tabelasi-12.jpg", distance: 200, star: 2 },
  { name: 'Pharmacy Yunus', image: "https://lh3.googleusercontent.com/p/AF1QipPYkRw61EBuQXCHzBwb21c4PMt1cOkCkJJNjT7d=w1080-h608-p-no-v0", distance: 300, star: 2 },
  { name: 'Pharmacy Hilmi', image: "https://www.zengrafik.com/wp-content/uploads/2020/12/yeni-eczane-tabelasi-12.jpg", distance: 400, star: 2 },
  { name: 'Pharmacy Robert', image: "https://lh3.googleusercontent.com/p/AF1QipPYkRw61EBuQXCHzBwb21c4PMt1cOkCkJJNjT7d=w1080-h608-p-no-v0", distance: 500, star: 2 },
];


const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 2;


export default function PharmacyListGrid({ navigation }){
  const renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity style={styles.item} onPress={()=>navigation.replace("PharmacyDetail")}>
        <Image source={{ uri: item.image }} style={styles.image2} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDistance}>{item.distance} m</Text>
        <View style={styles.rating}>
          <SvgComponentYellow />
          <SvgComponentYellow />
          <SvgComponentYellow />
          <SvgComponentYellow />
          <SvgComponentBlack />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={formatData(data, numColumns)}
      style={styles.container}
      renderItem={renderItem}
      numColumns={numColumns}
    />
  );
};

const styles = StyleSheet.create({
  image2: {
    width: '95%',
    resizeMode:"cover",
    aspectRatio: 1, 
    marginBottom:20,
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
  itemDistance:{
    borderWidth:1,
    borderRadius:3,
    marginVertical:15,
    paddingHorizontal:3,
    paddingVertical:2,
  },
  rating:{
    flex:1,
    flexDirection: "row",
    marginVertical:5
  },
});
