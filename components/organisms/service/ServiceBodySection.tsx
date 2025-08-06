import { ThemedText, ThemedView } from "@/components";
import HeaderItem from "@/components/molecules/ServiceHeaderItem";
import { useState } from "react";
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
}) {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const onItemPress = (index: number) => {
    setSelectedItem(items[index]);
  };
  return (
    <ThemedView>
      <ThemedText fontType="bold">خدمات</ThemedText>
      <ThemedView style={styles.listContainer}>
        {items?.map((item, index) => (
          <HeaderItem
            imagePath={item?.imgPath}
            title={item?.title}
            key={`${index}`}
            height={98}
            id={item?.id}
            onItemPress={() => onItemPress(index)}
            selectedItem={selectedItem}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listContainer: { flexDirection: "row" },
  itemStyle: { width: 98, height: 98 },
});
