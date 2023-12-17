import React from 'react'
import { View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import data from './data'
import CarouselCardItemDetailPage, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItemDetailPage'

const CarouselCardDetailPage = () => {
    const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  return (
    <View >
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItemDetailPage}
        sliderWidth={SLIDER_WIDTH-50}
        itemWidth={ITEM_WIDTH-50}
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


export default CarouselCardDetailPage