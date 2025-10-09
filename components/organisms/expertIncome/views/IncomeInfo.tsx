import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import {
  useGetMyRevenueQuery,
  useRevenue_GetMyRevenueQuery,
} from "@/generated/graphql";
import dayjs from "dayjs";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

const startTimeStr = "T00:00:00+03:30";
const endTimeStr = "T23:59:59+03:30";

export default function IncomeInfo({}) {
  const { daySD, dayED, weekSD, monthSD } = useMemo(() => {
    const today = dayjs().format("YYYY-MM-DD");
    const daySD = today + startTimeStr;
    const dayED = today + endTimeStr;

    const weekStart = dayjs().subtract(1, "week").format("YYYY-MM-DD");
    const weekSD = weekStart + startTimeStr;

    const monthStart = dayjs().subtract(1, "month").format("YYYY-MM-DD");
    const monthSD = monthStart + startTimeStr;

    return { daySD, dayED, monthSD, weekSD };
  }, []);

  const { data: unSetteledData } = useGetMyRevenueQuery({
    input: {},
  });
  const unSetteledAmount =
    unSetteledData?.revenue_getMyRevenue?.result?.unsettledAmount;

  const { data: dayData } = useRevenue_GetMyRevenueQuery({
    dayED,
    daySD,
  });
  const { data: weekData } = useRevenue_GetMyRevenueQuery({
    dayED,
    daySD: weekSD,
  });
  const { data: monthData } = useRevenue_GetMyRevenueQuery({
    dayED,
    daySD: monthSD,
  });

  const infoArray = [
    {
      title: "درآمد ماه",
      value: `${(monthData?.revenue_getMyRevenue?.result?.totalAmount ?? 0) * 10} ریال`,
    },
    {
      title: "درآمد هفته",
      value: `${(weekData?.revenue_getMyRevenue?.result?.totalAmount ?? 0) * 10} ریال`,
    },
    {
      title: "درآمد امروز",
      value: `${(dayData?.revenue_getMyRevenue?.result?.totalAmount ?? 0) * 10} ریال`,
    },
  ];

  return (
    <ThemedView>
      <ThemedView style={styles.headerContainer}>
        <ThemedText
          type="defaultSemiBold"
          fontType="bold"
          style={styles.fontSize}
        >
          {`${(unSetteledAmount ?? 0) * 10}`} ریال
        </ThemedText>
        <ThemedText style={styles.headerTxt} fontType="bold">
          درآمد تسویه نشده
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.list}>
        {infoArray.map((item, index) => (
          <ThemedView
            key={item.title}
            style={[
              styles.listContainer,
              { marginRight: index != 2 ? "2%" : 0 },
            ]}
          >
            <ThemedText style={styles.title} numberOfLines={1}>
              {item.title}
            </ThemedText>
            <ThemedText style={styles.value} fontType="bold">
              {item.value}
            </ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginBottom: 12,
    alignSelf: "center",
    width: "100%",
  },

  headerTxt: { color: Colors.darkGray },

  list: { flexDirection: "row", justifyContent: "space-between" },

  listContainer: {
    width: "32%",
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },

  title: { color: Colors.link25 },

  value: { color: Colors.black },

  fontSize: { fontSize: 24 },
});
