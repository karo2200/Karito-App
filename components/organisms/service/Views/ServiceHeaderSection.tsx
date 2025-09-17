import { CustomFlatList, ThemedText, ThemedView } from "@/components";
import HeaderItem from "@/components/molecules/ServiceHeaderItem";
import { useEffect, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";

type ServiceHeaderSectionProps = {
  selectedService?: any;
  onServiceItemPress?: (item: any) => any;
  serviceItems?: any[];
};

export default function ServiceHeaderSection({
  selectedService,
  onServiceItemPress,
  serviceItems = [],
}: ServiceHeaderSectionProps) {
  const listRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    if (selectedService) {
      const index = serviceItems.findIndex(
        (s) => s?.id === selectedService?.id
      );
      if (index >= 0) {
        listRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.1,
        });
      }
    }
  }, [selectedService, serviceItems]);

  const renderItem = ({ item, index }) => (
    <HeaderItem
      imagePath={item?.logo}
      Icon={item?.svg}
      title={item?.name}
      key={`${index}`}
      id={item?.id}
      onItemPress={() => onServiceItemPress?.(item)}
      selectedItem={selectedService}
    />
  );
  return (
    <ThemedView>
      <ThemedText fontType="bold">خدمات</ThemedText>
      <ThemedView style={styles.listContainer}>
        <CustomFlatList
          ref={listRef}
          data={serviceItems}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          inverted
          keyExtractor={(item, index) => `${item?.id}_${index}`}
          getItemLayout={(_, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listContainer: { flexDirection: "row-reverse", flex: 1 },
});
