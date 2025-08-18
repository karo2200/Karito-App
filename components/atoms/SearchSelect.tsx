import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { SearchNormal1 } from "iconsax-react-native";
import React, { forwardRef, useRef, useState } from "react";
import { Control, useController } from "react-hook-form";
import {
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import CustomRadioButton from "./CustomRadioButton";
import ThemedButton from "./ThemedButton";
import ThemedText from "./ThemedText";

type Option = { label: string; value: string };

type Props = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  options: Option[];
  sheetTitle: string;
};

const SearchSelect = forwardRef<any, Props>(
  ({ name, control, label, options, placeholder, sheetTitle }, ref) => {
    const { field } = useController({ name, control });
    const [search, setSearch] = useState("");
    const actionSheetRef = useRef<ActionSheetRef>(null);

    const filtered = options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <View style={{ marginBottom: 16 }}>
        {label && <ThemedText style={styles.label}>{label}</ThemedText>}
        {/* Input fake */}
        <TouchableOpacity
          onPress={() => actionSheetRef.current?.show()}
          style={styles.container}
        >
          <ThemedText style={[styles.label, { flex: 1 }]}>
            {field.value
              ? options.find((o) => o.value === field.value)?.label
              : placeholder}
          </ThemedText>
          <SearchNormal1 size={24} color={Colors.mediumGray} />
        </TouchableOpacity>

        {/* ActionSheet */}
        <ActionSheet
          ref={actionSheetRef}
          containerStyle={{
            maxHeight: Platform.OS === "web" ? 400 : "80%",
          }}
        >
          <View style={styles.header}>
            <Ionicons
              name="close"
              size={24}
              color={Colors.mediumGray}
              onPress={() => actionSheetRef.current?.hide()}
            />
            <ThemedText fontType="bold">{sheetTitle}</ThemedText>
          </View>
          <View style={{ padding: 12 }}>
            <TextInput
              ref={ref}
              placeholder="جستجو..."
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />

            <FlatList
              data={filtered}
              keyExtractor={(item) => item.value}
              contentContainerStyle={{ paddingBottom: 50 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    field.onChange(item.value);
                  }}
                  style={styles.selectBtn}
                >
                  <CustomRadioButton
                    label={item.label}
                    checked={item.value === field.value}
                    onPress={() => {
                      field.onChange(item.value);
                    }}
                  />
                </TouchableOpacity>
              )}
            />
            <ThemedButton
              title="انتخاب"
              fontType="bold"
              onPress={() => actionSheetRef.current?.hide()}
              style={{ marginBottom: 40 }}
            />
          </View>
        </ActionSheet>
      </View>
    );
  }
);

SearchSelect.displayName = "SearchSelect";

export default SearchSelect;

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    fontSize: 16,
    color: Colors.semiBlack,
    justifyContent: "center",
  },

  container: {
    borderWidth: 1,
    borderColor: Colors.grayMedium,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 4,
    flexDirection: "row-reverse",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.grayMedium,
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    fontFamily: FontType.YekanBakhRegular,
  },

  selectBtn: {
    paddingVertical: 12,
  },
});
