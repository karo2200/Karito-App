import Breadcrumb from "@/components/atoms/Breadcrumb";
import ThemedContainer from "@/components/atoms/ThemedContainer";
import React, { useCallback } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import EmptyOfferState from "./Views/EmptyOfferState";
import OfferCard from "./Views/OfferCard";
import useOfferHook from "./hooks/Offer.hook";

export default function OffersScreen() {
  const listRef = React.useRef<FlatList>(null);

  const {
    refetch,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    discountData,
    isLoading,
  } = useOfferHook();

  const renderItem = useCallback(
    ({ item }: { item: any }) => <OfferCard item={item} key={item?.id} />,
    []
  );

  return (
    <ThemedContainer>
      <View>
        <Breadcrumb
          items={[
            { label: "پروفایل", href: "/profile" },
            { label: "تخفیف‌ها" },
          ]}
        />

        {isLoading && discountData.length === 0 ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            ref={listRef}
            keyExtractor={(item) => item?.id}
            data={discountData}
            refreshing={isRefetching}
            onRefresh={refetch}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            onEndReached={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
            ListEmptyComponent={() => <EmptyOfferState />}
          />
        )}
      </View>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({});
