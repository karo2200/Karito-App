import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import ThemedText from "./ThemedText";

const { width } = Dimensions.get("screen");

const images = [
  require("../../assets/images/react-logo.png"),
  require("../../assets/images/react-logo.png"),
  require("../../assets/images/react-logo.png"),
];

export default function CustomCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width - 32}
        height={200}
        autoPlay
        autoPlayInterval={3000}
        data={images}
        style={{ borderRadius: 8, backgroundColor: "red" }}
        pagingEnabled
        onSnapToItem={(index) => setActiveIndex(index)}
        scrollAnimationDuration={800}
        renderItem={({ item }) => (
          <ImageBackground
            source={item}
            style={styles.image}
            resizeMode="cover"
          >
            <TouchableOpacity style={styles.btn}>
              <ThemedText style={styles.buttonText}>سفارش</ThemedText>
            </TouchableOpacity>
          </ImageBackground>
        )}
      />
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 16 },

  image: {
    width: width,
    height: 200,
    borderRadius: 12,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: Colors.gray100,
    marginHorizontal: 2,
  },

  activeDot: {
    backgroundColor: Colors.hint500,
    width: 10,
    height: 10,
  },

  buttonText: {
    color: "white",
  },

  btn: {
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: Colors.hint500,
    height: 36,
    width: "40%",
    justifyContent: "center",
    bottom: 8,
    left: 8,
    position: "absolute",
  },
});
