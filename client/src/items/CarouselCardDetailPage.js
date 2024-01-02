import React from 'react'
import { View } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItemDetailPage, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItemDetailPage'

const data = [
  {
    // title: "Eczane Önder",
    // body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: "https://lh3.googleusercontent.com/p/AF1QipPYkRw61EBuQXCHzBwb21c4PMt1cOkCkJJNjT7d=w1080-h608-p-no-v0",
  },
  {
    // title: "Eczane Feyza",
    // body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: "https://www.zengrafik.com/wp-content/uploads/2020/12/yeni-eczane-tabelasi-12.jpg",
  },
  {
    // title: "Eczane Yalı",
    // body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: "https://artozalit.com/wp-content/uploads/2022/12/eczane-tabelasi.jpg",
  },
];


const CarouselCardDetailPage = () => {
    const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  return (
    <View style={{paddingTop: 10, height: 230}}>
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