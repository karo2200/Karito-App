import { ServiceRequestDto } from "@/generated/graphql";
import React, { useCallback, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import ListEmptyOrder from "../../order/Views/ListEmptyOrder";
import OrderCard from "../../order/Views/OrderCard";
import useMissionsHook from "../hooks/Mission.hook";

export default function InprogressMissions() {
  const listRef = useRef<FlatList>(null);

  const {
    inProgressData,
    isRefetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    router,
  } = useMissionsHook();

  const renderItem = useCallback(
    ({ item }: { item: ServiceRequestDto }) => (
      <OrderCard
        item={item}
        onOrderPress={() => {
          router.push("/mission/orderDetail");
        }}
        isCustomer={false}
      />
    ),
    []
  );

  return (
    <FlatList
      ref={listRef}
      keyExtractor={(item) => item?.id}
      data={inProgressData}
      refreshing={isRefetching}
      onRefresh={refetch}
      style={{ flex: 1 }}
      contentContainerStyle={styles.tabStyle}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      ListEmptyComponent={() => (
        <ListEmptyOrder onSeeListPress={() => router.push("/workList")} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    paddingBottom: 100,
    marginTop: 8,
    flexGrow: 1,
  },
});
