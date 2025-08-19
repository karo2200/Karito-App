import { ThemedText, ThemedView } from "@/components";
import HeaderItem from "@/components/molecules/ServiceHeaderItem";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function ServiceBodySection({
  items = [],
  selectedService,
}: {
  items?: any[];
  selectedService?: any;
}) {
  const router = useRouter();

  return (
    <ThemedView>
      <ThemedText fontType="bold">{selectedService?.name}</ThemedText>
      <ThemedView style={styles.listContainer}>
        {items?.map((item, index) => (
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
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listContainer: { flexDirection: "row" },
});
