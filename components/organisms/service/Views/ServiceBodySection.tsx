import { ThemedText, ThemedView } from "@/components";
import HeaderItem from "@/components/molecules/ServiceHeaderItem";
import { StyleSheet } from "react-native";

export default function ServiceBodySection({
  items = [
    {
      title: "همه خدمات",
      id: 1,
      imgPath:
        "https://images.squarespace-cdn.com/content/v1/67d1ad32f3d18013069458ea/e0165239-be35-4bfa-80f2-e5775ea87667/All+in+One+Services+Logo+%281%29.jpg",
    },
    {
      title: "خودرو",
      id: 2,
      imgPath:
        "https://www.visualdictionaryonline.com/images/plants-gardening/plants/flower/examples-flowers_1.jpg",
    },
  ],
  selectedService,
}: {
  items?: any[];
  selectedService?: any;
}) {
  return (
    <ThemedView>
      <ThemedText fontType="bold">{selectedService?.title}</ThemedText>
      <ThemedView style={styles.listContainer}>
        {items?.map((item, index) => (
          <HeaderItem
            imagePath={item?.imgPath}
            title={item?.title}
            key={`${index}`}
            height={98}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listContainer: { flexDirection: "row" },
});
