import CustomCarousel from "@/components/atoms/CustomCarousel";
import { ScrollView } from "react-native";
import Banner from "./Views/Banner";
import Categories from "./Views/Categories";
import HorizontalServiceList from "./Views/HorizontalServiceList";
import HorizontalSpeciaLists from "./Views/HorizontalSpeciaLists";

export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Categories />
      <Banner />
      <HorizontalServiceList
        title="پر طرفداردار ترین خدمات"
        loading={false}
        data={[{}, {}]}
      />
      <CustomCarousel />
      <HorizontalServiceList
        title="انواع جابجایی"
        loading={false}
        data={[{}]}
      />
      <HorizontalSpeciaLists data={[{ id: 1 }, { id: 2 }]} />
    </ScrollView>
  );
}
