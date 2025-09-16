import { ServiceRequestDto } from "@/generated/graphql";
import React, { useCallback, useRef } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
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
    canceledLoading,
  } = useOrderHook();

  const renderItem = useCallback(
    ({ item }: { item: ServiceRequestDto }) => (
      <OrderCard
        item={item}
        onOrderPress={() => {
          router.push(`/order/orderDetail?id=${item?.id}&page=canceled`);
        }}
        key={item?.id}
      />
    ),
    []
  );

  return canceledLoading && cancelledOrders?.length === 0 ? (
    <ActivityIndicator />
  ) : (
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
