import React, { useCallback, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import ListEmptyOrder from "./ListEmptyOrder";
import OrderCard from "./OrderCard";

export default function FinishedOrdes() {
  const listRef = useRef<FlatList>(null);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <OrderCard item={item} onOrderPress={() => {}} key={item?.id} />
    ),
    []
  );

  return (
    <FlatList
      ref={listRef}
      keyExtractor={(item) => item?.id}
      data={[]}
      refreshing={true}
      // onRefresh={refetch}
      contentContainerStyle={styles.tabStyle}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      onEndReached={() => {
        // if (hasNextPage) {
        //   fetchNextPage();
        // }
      }}
      ListEmptyComponent={() => <ListEmptyOrder />}
    />
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    paddingBottom: 100,
    marginTop: 8,
  },
});
