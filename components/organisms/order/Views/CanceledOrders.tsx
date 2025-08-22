import { ServiceRequestDto } from "@/generated/graphql";
import React, { useCallback, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import useOrderHook from "../hooks/Order.hook";
import ListEmptyOrder from "./ListEmptyOrder";
import OrderCard from "./OrderCard";

export default function CanceledOrders() {
  const listRef = useRef<FlatList>(null);

  const {
    router,
    cancelledFetchNextPage,
    cancelledHasNextPage,
    cancelledIsRefetching,
    cancelledOrders,
    cancelledRefetch,
  } = useOrderHook();

  const renderItem = useCallback(
    ({ item }: { item: ServiceRequestDto }) => (
      <OrderCard item={item} onOrderPress={() => {}} key={item?.id} />
    ),
    []
  );

  return (
    <FlatList
      ref={listRef}
      keyExtractor={(item) => item?.id}
      data={cancelledOrders}
      refreshing={cancelledIsRefetching}
      onRefresh={cancelledRefetch}
      contentContainerStyle={styles.tabStyle}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      onEndReached={() => {
        if (cancelledHasNextPage) {
          cancelledFetchNextPage();
        }
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
