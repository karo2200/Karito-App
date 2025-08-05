import { ScrollView } from "react-native";

import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { Car, Menu } from "iconsax-react-native";

export function HeaderItem({ Icon, title }) {
  return (
    <ThemedView style={{ alignItems: "center", marginLeft: 34 }}>
      <ThemedView
        style={{
          width: 64,
          height: 64,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.gray50,
        }}
      >
        <Icon color={Colors.hint500} size={24} />
      </ThemedView>
      <ThemedText>{title}</ThemedText>
    </ThemedView>
  );
}

export default function HeaderSection({
  items = [
    { Icon: Menu, title: "همه خدمات" },
    { Icon: Car, title: "خودرو" },
  ],
}) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <ThemedText>خدمات</ThemedText>
      <ThemedView style={{ flexDirection: "row-reverse" }}>
        {items?.map((item, index) => (
          <HeaderItem Icon={item?.Icon} title={item?.title} key={`${index}`} />
        ))}
      </ThemedView>
    </ScrollView>
  );
}
