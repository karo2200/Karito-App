import { CustomImage, ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { Car, Menu } from "iconsax-react-native";

export function ServiceItem({ imagePath, title }) {
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
        <CustomImage />
      </ThemedView>
      <ThemedText>{title}</ThemedText>
    </ThemedView>
  );
}

export default function ServiceBodySection({
  items = [
    { Icon: Menu, title: "همه خدمات" },
    { Icon: Car, title: "خودرو" },
  ],
}) {
  return (
    <ThemedView>
      <ThemedText>خدمات</ThemedText>
      <ThemedView style={{ flexDirection: "row-reverse" }}>
        {items?.map((item, index) => (
          <ServiceItem Icon={item?.Icon} title={item?.title} key={`${index}`} />
        ))}
      </ThemedView>
    </ThemedView>
  );
}
