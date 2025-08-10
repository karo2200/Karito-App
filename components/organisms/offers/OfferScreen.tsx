import Breadcrumb from "@/components/atoms/Breadcrumb";
import ThemedContainer from "@/components/atoms/ThemedContainer";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import EmptyOfferState from "./Views/EmptyOfferState";
import OfferCard from "./Views/OfferCard";

export default function OffersScreen() {
  const listRef = React.useRef<FlatList>(null);

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

        <FlatList
          ref={listRef}
          keyExtractor={(item) => item?.id}
          data={[{}, {}]}
          refreshing={true}
          // onRefresh={refetch}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          onEndReached={() => {
            // if (hasNextPage) {
            //   fetchNextPage();
            // }
          }}
          ListEmptyComponent={() => <EmptyOfferState />}
        />
      </View>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({});
