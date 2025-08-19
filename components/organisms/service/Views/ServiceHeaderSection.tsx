import { ThemedText, ThemedView } from "@/components";
import HeaderItem from "@/components/molecules/ServiceHeaderItem";
import { StyleSheet } from "react-native";

type ServiceHeaderSectionProps = {
  selectedService?: any;
  onServiceItemPress?: (item: any) => any;
  serviceItems?: any[];
};

export default function ServiceHeaderSection({
  selectedService,
  onServiceItemPress,
  serviceItems,
}: ServiceHeaderSectionProps) {
  return (
    <ThemedView>
      <ThemedText fontType="bold">خدمات</ThemedText>
      <ThemedView style={styles.listContainer}>
        {serviceItems?.map((item, index) => (
          <HeaderItem
            imagePath={item?.logo}
            Icon={item?.svg}
            title={item?.name}
            key={`${index}`}
            id={item?.id}
            onItemPress={() => onServiceItemPress?.(item)}
            selectedItem={selectedService}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listContainer: { flexDirection: "row-reverse", flex: 1 },
});
