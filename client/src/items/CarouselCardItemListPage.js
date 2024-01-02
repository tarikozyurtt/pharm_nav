import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItemListPage = ({ item, index, navigation }) => {
  console.log("carosel item: ", item, index)
  return (
    <View style={styles.container} key={index}>
      <TouchableOpacity onPress={() => navigation.navigate("PharmacyDetail", {pharmId: item._id, distance: item.distance, uri: item.pharmImages[0]})}>
      {item?.pharmImages && (
        <Image source={{ uri: item.pharmImages[0] }} style={styles.image} />
      )}
      <Text style={styles.header}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 2 * ITEM_WIDTH / 3,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: 2 * ITEM_WIDTH / 3,
    height: 140,
  },
  header: {
    color: "#222",
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 20,
    textAlign: "center"
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default CarouselCardItemListPage