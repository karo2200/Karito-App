import { Colors } from "@/constants/Colors";
import { ServiceTypeDto } from "@/generated/graphql";
import { hideSheet, showSheet } from "@/hooks/useShowSheet";
import authCacheStore from "@/stores/authCacheStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("screen");

export default function CustomCarousel({ data }: { data: any }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();

  const { isLoggedIn } = authCacheStore();

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width - 32}
        height={241}
        autoPlay
        autoPlayInterval={3000}
        data={data?.serviceTypes}
        style={{ borderRadius: 8 }}
        pagingEnabled
        onSnapToItem={(index) => setActiveIndex(index)}
        scrollAnimationDuration={800}
        renderItem={({ item }: { item: ServiceTypeDto }) => (
          <Pressable
            onPress={() => {
              if (isLoggedIn) {
                router.push(
                  `/CreateOrderPage/CreateOrderPage?sub=${item?.id}&name=${item?.name}&price=${item?.basePrice}`
                );
              } else {
                showSheet("confirmation-action", {
                  payload: {
                    hasLoading: false,
                    showToastInActionSheet: false,
                    title: "ورود",

                    onClose: () => {
                      hideSheet("confirmation-action");
                    },
                  },
                });
              }
            }}
          >
            <ImageBackground
              source={{ uri: item?.banner }}
              style={styles.image}
              resizeMode="cover"
            />
          </Pressable>
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
    width: "100%",
    height: 240,
    borderRadius: 8,
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
});
