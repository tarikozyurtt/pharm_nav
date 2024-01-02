import React, { useEffect } from 'react'
import { View, TouchableOpacity } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItemListPage, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItemListPage'

const CarouselCardListPage = ({ data, navigation }) => {
const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  const renderCarouselItem = ({ item, index }) => {
    return <CarouselCardItemListPage item={item} index={index} navigation={navigation} />;
  };

  return (
    <View>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={renderCarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        containerStyle={{ paddingVertical:15 }}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  )
}


export default CarouselCardListPage