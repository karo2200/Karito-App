import CustomCarousel from "@/components/atoms/CustomCarousel";
import LoginActionSheet from "@/components/molecules/LoginActionSheet";
import { ScrollView } from "react-native";
import Banner from "./Views/Banner";
import Categories from "./Views/Categories";
import HorizontalServiceList from "./Views/HorizontalServiceList";
import HorizontalSpeciaLists from "./Views/HorizontalSpeciaLists";
import useHomeHook from "./hooks/Home.hook";

export default function HomeScreen() {
  const { data, selectRoleVisible, setSelectRoleVisibe } = useHomeHook();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <LoginActionSheet
        visible={selectRoleVisible}
        setVisible={() => setSelectRoleVisibe(false)}
      />
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
