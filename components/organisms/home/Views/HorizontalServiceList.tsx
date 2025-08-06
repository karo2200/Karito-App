import ThemedText from "@/components/atoms/ThemedText";
import React, { useCallback, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ServiceItem from "./ServiceItem";

export default function HorizontalServiceList({ title, data, loading }) {
  const listRef = useRef<FlatList>(null);

  const renderItem = useCallback(
    ({ item, index }) => <ServiceItem />,
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
  },

  container: {
    flexDirection: "column",
    width: "100%",
    paddingVertical: 16,
  },

  header: {
    marginBottom: 12,
  },
});
