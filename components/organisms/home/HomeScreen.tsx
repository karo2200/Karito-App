import CustomCarousel from "@/components/atoms/CustomCarousel";
import { memo } from "react";
import { ScrollView, View } from "react-native";
import Banner from "./Views/Banner";
import Categories from "./Views/Categories";
import HorizontalServiceList from "./Views/HorizontalServiceList";
import HorizontalSpeciaLists from "./Views/HorizontalSpeciaLists";
import useHomeHook from "./hooks/Home.hook";

const HomeScreen = () => {
  const { activeCarousel, specialists, popularData, specialData } =
    useHomeHook();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Categories />
      <Banner />
      <View style={{ marginTop: -15 }}>
        <HorizontalServiceList
          title="پر طرفداردار ترین خدمات"
          loading={false}
          data={popularData}
        />
        {activeCarousel?.length > 0 && <CustomCarousel data={activeCarousel} />}
        <HorizontalServiceList
          title="سرویس های ویژه"
          loading={false}
          data={specialData}
        />
        <HorizontalSpeciaLists data={specialists} />
      </View>
    </ScrollView>
  );
};

export default memo(HomeScreen);
