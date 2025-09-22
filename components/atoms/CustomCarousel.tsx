import { Colors } from "@/constants/Colors";
import { ServiceTypeDto } from "@/generated/graphql";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import ThemedButton from "./ThemedButton";

const { width } = Dimensions.get("screen");

export default function CustomCarousel({ data }: { data: any }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width - 32}
        height={200}
        autoPlay
        autoPlayInterval={3000}
        data={data?.serviceTypes}
        style={{ borderRadius: 8 }}
        pagingEnabled
        onSnapToItem={(index) => setActiveIndex(index)}
        scrollAnimationDuration={800}
        renderItem={({ item }: { item: ServiceTypeDto }) => (
          <ImageBackground
            source={{ uri: item?.banner }}
            style={styles.image}
            resizeMode="cover"
          >
            <ThemedButton
              title="سفارش"
              style={styles.btn}
              onPress={() =>
                router.push(
                  `/CreateOrderPage/CreateOrderPage?sub=${item?.id}&name=${item?.name}&price=${item?.basePrice}`
                )
              }
            />
          </ImageBackground>
        )}
      />

      <View style={styles.dotsContainer}>
        {data?.serviceTypes?.map((_, index) => (
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
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 8,
  },

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
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
});
