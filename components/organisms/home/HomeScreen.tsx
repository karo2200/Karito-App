import CustomCarousel from "@/components/atoms/CustomCarousel";
import { memo } from "react";
import { ScrollView } from "react-native";
import Banner from "./Views/Banner";
import Categories from "./Views/Categories";
import HorizontalServiceList from "./Views/HorizontalServiceList";
import HorizontalSpeciaLists from "./Views/HorizontalSpeciaLists";
import useHomeHook from "./hooks/Home.hook";

const HomeScreen = () => {
  const { activeBanner } = useHomeHook();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Categories />
      <Banner />
      <HorizontalServiceList
        title="پر طرفداردار ترین خدمات"
        loading={false}
        data={[{}, {}]}
      />
      {activeBanner && <CustomCarousel data={activeBanner} />}
      <HorizontalServiceList
        title="انواع جابجایی"
        loading={false}
        data={[{}]}
      />
      <HorizontalSpeciaLists data={[{ id: 1 }, { id: 2 }]} />
    </ScrollView>
  );
};

export default memo(HomeScreen);
