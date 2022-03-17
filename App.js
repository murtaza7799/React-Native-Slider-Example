import React, { useState, createRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";

// Data used in example
const data = [
  {
    image: "https://opendoodles.s3-us-west-1.amazonaws.com/roller-skating.png",
  },
  {
    image: "https://opendoodles.s3-us-west-1.amazonaws.com/zombieing.png",
  },
  {
    image: "https://opendoodles.s3-us-west-1.amazonaws.com/ice-cream.png",
  },
  {
    image: "https://opendoodles.s3-us-west-1.amazonaws.com/ice-cream.png",
  },
];

const App = () => {
  // Width of the window will be width of our slides
  const windowWidth = useWindowDimensions().width;
  // Ref to the FlatList element. We use it to access its methods
  const slider = createRef(null);
  // Slider state contains active item and offset position
  const [sliderState, setSliderState] = useState({ item: 0, offset: 0 });

  // Update slider state on change event
  // this will be called in flatlist in scroll method
  const slideChanged = (e) => {
    const item = Math.round(e.nativeEvent.contentOffset.x / windowWidth);

    setSliderState({
      item: item,
      offset: item * windowWidth,
    });
  };

  // Renderer function takes the data as an input and outputs the view, should be customized
  //Data is changing here in image inside the view , this will be replaced by some other view
  const renderer = ({ item }) => (
    <View style={{ width: windowWidth }}>
      <View style={{ ...styles.slide, backgroundColor: item.color }}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: item.image }}
        />
      </View>
    </View>
  );

  // Renders pagination dots and change with the data items changed
  const dots = () => (
    <View style={styles.dotGroup}>
      {data.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            sliderState.item === index ? styles.dotActive : null,
          ]}
        />
      ))}
    </View>
  );

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderer}
        ref={slider}
        keyExtractor={(_, index) => index} // Set unique key for each element
        horizontal={true} // Transpose the slider horizontally
        pagingEnabled={true} // Snap to the side
        showsHorizontalScrollIndicator={false} // Hide scrollbar
        onScroll={slideChanged} // Fire slideChanged on scroll event
        getItemLayout={(_, index) => ({
          length: windowWidth,
          offset: windowWidth * index,
          index,
        })}
      />
      <View style={styles.controls}>{dots()}</View>
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 250,
    backgroundColor: "wheat",
    borderRadius: 50,
  },
  controls: {
    position: "absolute",
    width: "100%",
    bottom: 100,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dotGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: "#D3D3D3",
    backgroundColor: "#D3D3D3",
  },
  dotActive: {
    backgroundColor: "#000000",
  },
});

export default App;
