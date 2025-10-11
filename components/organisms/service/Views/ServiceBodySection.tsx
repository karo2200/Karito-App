import { CustomFlatList, Divider, ThemedText, ThemedView } from "@/components";
import HeaderItem from "@/components/molecules/ServiceHeaderItem";
import { Colors } from "@/constants/Colors";
import { hideSheet, showSheet } from "@/hooks/useShowSheet";
import authCacheStore from "@/stores/authCacheStore";
import createOrderStore from "@/stores/createOrder";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

export default function ServiceBodySection({
  items = [],
  selectedService,
  onEndReached,
  isLoading,
}: {
  items?: any[];
  selectedService?: any;
  onEndReached?: any;
  isLoading?: boolean;
}) {
  const router = useRouter();

  const { isLoggedIn } = authCacheStore();

  const { addressId } = createOrderStore();

  const renderItem = useCallback(({ item, index }) => {
    const onPress = () => {
      if (isLoggedIn)
        router.push(
          `/service/SubServicePage?id=${item?.id}&subService=${item?.name}&logo=${item?.logo}&service=${item?.serviceCategory?.name}`
        );
      else {
        showSheet("confirmation-action", {
          payload: {
            hasLoading: false,
            showToastInActionSheet: false,
            title: "ورود",

            onClose: () => {
              hideSheet("confirmation-action");
            },
          },
        });
      }
    };

    return (
      <HeaderItem
        imagePath={item?.logo}
        title={item?.name}
        key={`${item?.id}_${index}`}
        height={98}
        onItemPress={onPress}
        backgroundColor={Colors.hint50}
        padding={0}
      />
    );
  }, []);

  const EmptyState = useCallback(() => {
    return (
      <ThemedView style={styles.emptyState}>
        {addressId.length == 0 ? (
          <ThemedText>لطفا آدرس خود را انتخاب کنید</ThemedText>
        ) : (
          <ThemedText>آیتمی برای نمایش وجود ندارد!</ThemedText>
        )}
      </ThemedView>
    );
  }, []);

  return (
    <ThemedView>
      <ThemedText fontType="bold">{selectedService?.name}</ThemedText>
      <ThemedView style={styles.listContainer}>
        <CustomFlatList
          data={items}
          numColumns={3}
          keyExtractor={(item, index) => `${item?.id}_${index}`}
          renderItem={renderItem}
          contentContainerStyle={{ alignItems: "flex-end" }}
          ItemSeparatorComponent={() => <Divider />}
          onEndReached={onEndReached}
          isLoading={isLoading}
          ListEmptyComponent={EmptyState}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listContainer: { flexDirection: "row" },

  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 50,
  },
});
