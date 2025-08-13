import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default function IncomeInfo() {
  const infoArray = [
    { title: "درآمد ماه", value: "۱٫2۰۰٫۵۰۰ ریال" },
    { title: "درآمد هفته", value: "۱۲٫۲۰۰٫۵۰۰ ریال" },
    { title: "درآمد امروز", value: "۴٫۹۰۰٫۰۰۰ ریال" },
  ];

  return (
    <ThemedView>
      <ThemedView style={styles.headerContainer}>
        <ThemedText
          type="defaultSemiBold"
          fontType="bold"
          style={styles.fontSize}
        >
          ۱٫2۰۰٫۵۰۰ ریال
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
            <ThemedText style={styles.title}>{item.title}</ThemedText>
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
