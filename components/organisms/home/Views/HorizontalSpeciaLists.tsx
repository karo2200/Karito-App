import React, { memo, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ThemedText from "@/components/atoms/ThemedText";
import SpecialistItem from "./SpecialistItem";

const RenderItem = ({ item, onItemPress }) => (
  <SpecialistItem item={item} onItemPress={onItemPress} />
);

function HorizontalSpeciaLists({ data = [{ id: 1 }, { id: 2 }] }) {
  const listRef = useRef<FlatList>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="default" style={styles.title}>
          برترین متخصص‌ها
        </ThemedText>
      </View>

      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item) => item?.id}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => (
          <RenderItem item={item} onItemPress={() => {}} />
        )}
      />
    </View>
  );
}
export default memo(HorizontalSpeciaLists);

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
