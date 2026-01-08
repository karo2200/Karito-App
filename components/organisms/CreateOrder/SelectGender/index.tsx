import { ThemedText, ThemedView } from "@/components";
import CustomRadioGroup from "@/components/atoms/CustomRadioGroup";
import { Colors } from "@/constants/Colors";
import { DeviceWidth } from "@/constants/Dimension";
import { Gender } from "@/generated/graphql";
import { Man, Woman } from "iconsax-react-native";
import { useState } from "react";
import { useController } from "react-hook-form";
import { StyleSheet } from "react-native";

const genderOptions = [
  { text: "زن", value: Gender.Female, Icon: Woman },
  { text: "مرد", value: Gender.Male, Icon: Man },
  { text: "مهم نیست", value: undefined },
];

export default function SelectGender(props: any) {
  const [seleted, setSelected] = useState<Gender | undefined>(undefined);
  const { field } = useController({ name: "gender" });

  return (
    <ThemedView>
      <ThemedText type="title" fontType="bold">
        جنسیت متخصص را انتخاب کنید:
      </ThemedText>
      <ThemedView style={styles.listContainer}>
        <CustomRadioGroup name="gender" data={genderOptions} />
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

  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
