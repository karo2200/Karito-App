import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { DeviceWidth } from "@/constants/Dimension";
import { Man, Woman } from "iconsax-react-native";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const genderOptions = [
  { title: "زن", value: "WOMAN", Icon: Woman },
  { title: "مرد", value: "MAN", Icon: Man },
  { title: "مهم نیست", value: "np" },
];

export default function SelectGender(props: any) {
  const [seleted, setSelected] = useState("np");

  return (
    <ThemedView>
      <ThemedText type="title" fontType="bold">
        جنسیت متخصص را انتخاب کنید:
      </ThemedText>
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {genderOptions?.map(({ value, Icon, title }, index) => (
          <TouchableOpacity
            key={value}
            onPress={() => setSelected(value)}
            style={[
              value === seleted
                ? styles.selectedContainer
                : styles.deSelectedContainer,
              { marginRight: index != 2 ? 12 : 0 },
            ]}
          >
            <ThemedText
              style={
                value === seleted ? styles.selectedText : styles.deSelectedText
              }
            >
              {title}
            </ThemedText>
            {Icon && <Icon size={20} color={Colors.semiBlack} />}
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ThemedView>
  );
}
const width = DeviceWidth / 3 - 20;
const height = 72;

const styles = StyleSheet.create({
  selectedContainer: {
    borderColor: Colors.hint500,
    backgroundColor: Colors.hint50,
    borderWidth: 2,
    borderRadius: 12,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    width,
    height,
  },

  deSelectedContainer: {
    borderColor: Colors.grayMedium,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderRadius: 12,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    width,
    height,
  },

  selectedText: { color: Colors.hint500 },
  deSelectedText: { color: Colors.semiBlack },
});
