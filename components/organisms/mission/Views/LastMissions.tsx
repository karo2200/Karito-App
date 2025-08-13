import { useRouter } from "expo-router";
import React, { useCallback, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import ListEmptyOrder from "../../order/Views/ListEmptyOrder";
import OrderCard from "../../order/Views/OrderCard";

export default function LastMissions() {
  const listRef = useRef<FlatList>(null);

  const router = useRouter();

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
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
      data={[]}
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
