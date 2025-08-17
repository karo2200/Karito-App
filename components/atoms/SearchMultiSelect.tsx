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

const SearchMultiSelect = forwardRef<any, Props>(
  ({ name, control, label, options, placeholder, sheetTitle }, ref) => {
    const { field } = useController({ name, control });
    const [search, setSearch] = useState("");
    const actionSheetRef = useRef<ActionSheetRef>(null);

    const selectedValues: string[] = Array.isArray(field.value)
      ? field.value
      : [];

    const [tempSelected, setTempSelected] = useState<string[]>(selectedValues);

    const filtered = options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const toggleSelect = (value: string) => {
      if (tempSelected.includes(value)) {
        setTempSelected((prev) => prev.filter((v) => v !== value));
      } else {
        setTempSelected((prev) => [...prev, value]);
      }
    };

    const onOpen = () => {
      setTempSelected(selectedValues);
    };

    const onConfirm = () => {
      field.onChange(tempSelected);
      actionSheetRef.current?.hide();
    };

    return (
      <View style={{ marginBottom: 16 }}>
        {label && <ThemedText style={styles.label}>{label}</ThemedText>}

        {/* Input fake */}
        <TouchableOpacity
          onPress={() => {
            onOpen();
            actionSheetRef.current?.show();
          }}
          style={styles.container}
        >
          <ThemedText style={[styles.label, { flex: 1 }]}>
            {selectedValues.length > 0
              ? options
                  .filter((o) => selectedValues.includes(o.value))
                  .map((o) => o.label)
                  .join(" ، ")
              : placeholder}
          </ThemedText>
          <SearchNormal1 size={24} color={Colors.mediumGray} />
        </TouchableOpacity>

        {/* ActionSheet */}
        <ActionSheet
          ref={actionSheetRef}
          containerStyle={{
            maxHeight: Platform.OS === "web" ? 450 : "80%",
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
            <TouchableOpacity onPress={onConfirm}>
              <ThemedText style={{ color: Colors.hint500 }}>تأیید</ThemedText>
            </TouchableOpacity>
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
              renderItem={({ item }) => {
                const checked = tempSelected.includes(item.value);
                return (
                  <TouchableOpacity
                    onPress={() => toggleSelect(item.value)}
                    style={styles.selectBtn}
                  >
                    <View style={styles.row}>
                      <ThemedText>{item.label}</ThemedText>
                      <Ionicons
                        name={checked ? "checkbox" : "square-outline"}
                        size={22}
                        color={checked ? Colors.hint500 : Colors.grayMedium}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ActionSheet>
      </View>
    );
  }
);

SearchMultiSelect.displayName = "SearchMultiSelect";

export default SearchMultiSelect;

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
    paddingVertical: 8,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
