import { Divider } from "@/components";
import { ServiceRequestDto } from "@/generated/graphql";
import React, { useCallback, useRef } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import ListEmptyOrder from "./ListEmptyOrder";
import OrderCard from "./OrderCard";

export default function OrderList({
  data,
  isLoading,
  hasNextPage,
  refetch,
  fetchNextPage,
  router,
  isRefetching,
}) {
  const listRef = useRef<FlatList>(null);

  const renderItem = useCallback(
    ({ item }: { item: ServiceRequestDto }) => (
      <OrderCard
        item={item}
        onOrderPress={() => {
          router.push(`/order/orderDetail?id=${item?.id}`);
        }}
        key={item?.id}
      />
    ),
    []
  );

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      ref={listRef}
      keyExtractor={(item) => item?.id}
      data={data}
      refreshing={isRefetching}
      onRefresh={refetch}
      contentContainerStyle={styles.tabStyle}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      ListEmptyComponent={
        isLoading
          ? undefined
          : () => (
              <ListEmptyOrder
                onSeeListPress={() => router.push("/(tabs)/service")}
              />
            )
      }
      ListFooterComponent={<Divider height={100} />}
    />
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    paddingBottom: 100,
    marginTop: 8,
  },
});
