import React, { useCallback, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import useOrderHook from "../hooks/Order.hook";
import ListEmptyOrder from "./ListEmptyOrder";
import OrderCard from "./OrderCard";

export default function InProgressOrders() {
  const listRef = useRef<FlatList>(null);

  const { router } = useOrderHook();

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <OrderCard
        item={item}
        onOrderPress={() => {
          router.push("/order/orderDetail");
        }}
      />
    ),
    []
  );

  return (
    <FlatList
      ref={listRef}
      keyExtractor={(item) => item?.id}
      data={[{}, {}, {}, {}]}
      refreshing={true}
      // onRefresh={refetch}
      contentContainerStyle={styles.tabStyle}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      onEndReached={() => {
        // if (hasNextPage) {
        //   fetchNextPage();
        // }
      }}
      ListEmptyComponent={() => (
        <ListEmptyOrder onSeeListPress={() => router.push("/(tabs)/home")} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    paddingBottom: 100,
    marginTop: 8,
  },
});
