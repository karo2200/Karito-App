import { ThemedText, ThemedView } from "@/components";
import HeaderItem from "@/components/molecules/ServiceHeaderItem";

export default function ServiceBodySection({
  items = [
    {
      title: "همه خدمات",
      imgPath:
        "https://images.squarespace-cdn.com/content/v1/67d1ad32f3d18013069458ea/e0165239-be35-4bfa-80f2-e5775ea87667/All+in+One+Services+Logo+%281%29.jpg",
    },
    {
      title: "خودرو",
      imgPath:
        "https://www.visualdictionaryonline.com/images/plants-gardening/plants/flower/examples-flowers_1.jpg",
    },
  ],
}) {
  return (
    <ThemedView>
      <ThemedText>خدمات</ThemedText>
      <ThemedView style={{ flexDirection: "row" }}>
        {items?.map((item, index) => (
          <HeaderItem
            imagePath={item?.imgPath}
            title={item?.title}
            key={`${index}`}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}
