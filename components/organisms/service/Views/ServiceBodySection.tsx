import { CustomFlatList, Divider, ThemedText, ThemedView } from "@/components";
import HeaderItem from "@/components/molecules/ServiceHeaderItem";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

export default function ServiceBodySection({
  items = [],
  selectedService,
  onEndReached,
}: {
  items?: any[];
  selectedService?: any;
  onEndReached?: any;
}) {
  const router = useRouter();

  const renderItem = useCallback(
    ({ item, index }) => (
      <HeaderItem
        imagePath={item?.logo}
        title={item?.name}
        key={`${item?.id}_${index}`}
        height={98}
        onItemPress={() =>
          router.push(
            `/service/SubServicePage?id=${item?.id}&subService=${item?.name}&logo=${item?.logo}&service=${selectedService?.name}`
          )
        }
      />
    ),
    []
  );

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
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listContainer: { flexDirection: "row" },
});
