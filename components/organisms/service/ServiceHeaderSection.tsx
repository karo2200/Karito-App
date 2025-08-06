import { ThemedText, ThemedView } from "@/components";
import HeaderItem from "@/components/molecules/ServiceHeaderItem";
import { Car, Menu } from "iconsax-react-native";

export default function ServiceHeaderSection({
  items = [
    { Icon: Menu, title: "همه خدمات" },
    { Icon: Car, title: "خودرو" },
  ],
}) {
  return (
    <ThemedView>
      <ThemedText>خدمات</ThemedText>
      <ThemedView style={{ flexDirection: "row" }}>
        {items?.map((item, index) => (
          <HeaderItem Icon={item?.Icon} title={item?.title} key={`${index}`} />
        ))}
      </ThemedView>
    </ThemedView>
  );
}
