import { ScrollView, StyleSheet } from "react-native";
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
        title="انواع جابجایی"
        loading={false}
        data={[{}]}
      />
      <HorizontalSpeciaLists />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
