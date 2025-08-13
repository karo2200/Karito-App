import { CustomFlatList, Divider } from "@/components";
import DayTimeItem from "@/components/molecules/DayTimeItem";

export default function DayHeader() {
  const renderItem = ({ item, index }) => {
    return (
      <DayTimeItem
        title={`${index}شنبه`}
        subtitle="۱/۱۷"
        width={80}
        checked={index === 0 ? true : false}
      />
    );
  };

  return (
    <CustomFlatList
      renderItem={renderItem}
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
      horizontal
      ItemSeparatorComponent={() => <Divider width={8} height={0} />}
      inverted
      snapToEnd
      showsHorizontalScrollIndicator={false}
    />
  );
}
