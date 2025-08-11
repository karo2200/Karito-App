import HomeScreen from "@/components/organisms/home/HomeScreen";
import WorkListScreen from "@/components/organisms/workList/WorkListScreen";

export default function HomePage() {
  const isCustomer = false;
  return isCustomer ? <HomeScreen /> : <WorkListScreen />;
}
