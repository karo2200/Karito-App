import ThemedText from "@/components/atoms/ThemedText";
import { FontType } from "@/constants/Fonts";
import React, { useCallback, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ServiceItem from "./ServiceItem";

export default function HorizontalServiceList({
  title,
  data,
  loading,
}: {
  title: string;
  data: any;
  loading: boolean;
}) {
  const listRef = useRef<FlatList>(null);

  const renderItem = useCallback(
    ({ index }: { index: number }) => (
      <ServiceItem style={index === 0 ? { marginRight: 16 } : undefined} />
    ),
    [loading]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="default" style={styles.title}>
          {title}
        </ThemedText>
      </View>

      <FlatList
        ref={listRef}
        data={data}
        inverted
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    color: "black",
    textAlign: "right",
    marginHorizontal: 16,
    fontFamily: FontType.YekanBakhBold,
  },

  container: {
    flexDirection: "column",
    width: "100%",
    paddingVertical: 8,
  },

  header: {
    marginBottom: 12,
  },
});
