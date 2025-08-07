import { ThemedText, ThemedView } from "@/components";
import HeaderItem from "@/components/molecules/ServiceHeaderItem";
import { StyleSheet } from "react-native";

export default function ServiceHeaderSection({
  selectedService,
  onServiceItemPress,
  serviceItems,
}) {
  return (
    <ThemedView>
      <ThemedText fontType="bold">خدمات</ThemedText>
      <ThemedView style={styles.listContainer}>
        {serviceItems?.map((item, index) => (
          <HeaderItem
            Icon={item?.Icon}
            title={item?.title}
            key={`${index}`}
            id={item?.id}
            onItemPress={() => onServiceItemPress(index)}
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
