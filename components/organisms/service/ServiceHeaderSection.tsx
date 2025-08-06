import { ThemedText, ThemedView } from "@/components";
import HeaderItem from "@/components/molecules/ServiceHeaderItem";
import { Car, Menu } from "iconsax-react-native";
import { StyleSheet } from "react-native";

export default function ServiceHeaderSection({
  items = [
    { Icon: Menu, title: "همه خدمات" },
    { Icon: Car, title: "خودرو" },
  ],
}) {
  return (
    <ThemedView>
      <ThemedText fontType="bold">خدمات</ThemedText>
      <ThemedView style={styles.listContainer}>
        {items?.map((item, index) => (
          <HeaderItem Icon={item?.Icon} title={item?.title} key={`${index}`} />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listContainer: { flexDirection: "row-reverse", flex: 1 },
});
