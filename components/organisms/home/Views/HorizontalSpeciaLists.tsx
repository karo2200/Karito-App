import React, { memo, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ThemedText from "@/components/atoms/ThemedText";
import SpecialistItem from "./SpecialistItem";

const RenderItem = ({
  item,
  onItemPress,
  index,
}: {
  item: any;
  onItemPress: () => void;
  index: number;
}) => (
  <SpecialistItem
    item={item}
    onItemPress={onItemPress}
    style={index === 0 ? { marginRight: 16 } : undefined}
  />
);

function HorizontalSpeciaLists({ data }: { data: any }) {
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
        inverted
        renderItem={({ item, index }) => (
          <RenderItem item={item} onItemPress={() => {}} index={index} />
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
    paddingHorizontal: 16,
  },

  container: {
    flexDirection: "column",
    width: "100%",
    paddingTop: 8,
    paddingBottom: 20,
  },

  header: {
    marginBottom: 12,
  },
});
