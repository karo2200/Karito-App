import { CustomFlatList, Divider, ThemedText } from "@/components";
import { Colors } from "@/constants/Colors";
import { DeviceWidth } from "@/constants/Dimension";
import { useState } from "react";
import { SectionList, StyleSheet, TouchableOpacity } from "react-native";

const DATA = [
  {
    title: "صبح",
    data: [
      ["07:00", "08:00", "09:00"],
      ["10:00", "11:00", "12:00"],
    ],
  },
  {
    title: "بعد از ظهر",
    data: [
      ["13:00", "14:00", "15:00"],
      ["16:00", "17:00", "18:00"],
    ],
  },
  {
    title: "شب",
    data: [
      ["19:00", "20:00", "21:00"],
      ["22:00", "23:00", "24:00"],
    ],
  },
  {
    title: "بامداد",
    data: [
      ["01:00", "02:00", "03:00"],
      ["04:00", "05:00", "06:00"],
    ],
  },
];

export default function TimeList() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item?.[0] + index}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <CustomFlatList
            data={item}
            horizontal
            inverted
            snapToEnd
            ItemSeparatorComponent={() => <Divider width={8} height={0} />}
            renderItem={({ item, index }) => {
              const isSelected = selectedTime === item;
              return (
                <TouchableOpacity
                  style={[
                    styles.timeButton,
                    isSelected && styles.timeButtonSelected,
                  ]}
                  onPress={() => setSelectedTime(item)}
                >
                  <ThemedText
                    fontType={isSelected ? "bold" : "regular"}
                    style={[
                      styles.timeText,
                      isSelected && styles.timeTextSelected,
                    ]}
                  >
                    {item}
                  </ThemedText>
                </TouchableOpacity>
              );
            }}
          />
        );
      }}
      renderSectionHeader={({ section: { title } }) => (
        <ThemedText style={styles.sectionTitle} fontType="bold">
          {title}
        </ThemedText>
      )}
    />
  );
}
const styles = StyleSheet.create({
  container: { width: "100%" },

  sectionTitle: {
    fontSize: 12,
    textAlign: "right",
    marginVertical: 8,
  },

  timeButton: {
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 4,
    minWidth: DeviceWidth / 3 - 20,
    alignItems: "center",
    justifyContent: "center",
  },
  timeButtonSelected: {
    backgroundColor: Colors.hint50,
    borderColor: Colors.hint500,
    borderWidth: 2,
  },
  timeText: {
    fontSize: 14,
    color: Colors.gray900,
  },
  timeTextSelected: {
    color: Colors.hint500,
  },
});
