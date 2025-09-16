import { ServiceRequestDto } from "@/generated/graphql";
import React, { useCallback, useRef } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import useOrderHook from "../hooks/Order.hook";
import ListEmptyOrder from "./ListEmptyOrder";
import OrderCard from "./OrderCard";

export default function FinishedOrdes() {
  const listRef = useRef<FlatList>(null);

  const {
    router,
    completeFetchNextPage,
    completeHasNextPage,
    completeIsRefetching,
    completeOrders,
    completeRefetch,
    completeLoading,
  } = useOrderHook();

  const renderItem = useCallback(
    ({ item }: { item: ServiceRequestDto }) => (
      <OrderCard
        item={item}
        onOrderPress={() => {
          router.push(`/order/orderDetail?id=${item?.id}&page=complete`);
        }}
        key={item?.id}
      />
    ),
    []
  );

  return completeLoading && completeOrders?.length === 0 ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      ref={listRef}
      keyExtractor={(item) => item?.id}
      data={completeOrders}
      refreshing={completeIsRefetching}
      onRefresh={completeRefetch}
      contentContainerStyle={styles.tabStyle}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      onEndReached={() => {
        if (completeHasNextPage) {
          completeFetchNextPage();
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
