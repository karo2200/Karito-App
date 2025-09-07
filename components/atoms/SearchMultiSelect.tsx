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
import ThemedButton from "./ThemedButton";
import ThemedText from "./ThemedText";

type Option = { name: string; id: string };

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
    const { field, fieldState } = useController({ name, control });
    const [search, setSearch] = useState("");
    const actionSheetRef = useRef<ActionSheetRef>(null);

    const selectedValues: string[] = Array.isArray(field.value)
      ? field.value
      : [];

    const [tempSelected, setTempSelected] = useState<string[]>(selectedValues);

    const safeOptions = Array.isArray(options) ? options : [];

    const filtered = safeOptions.filter((opt) =>
      opt?.name?.toLowerCase()?.includes(search?.toLowerCase())
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
                  ?.filter((o) => selectedValues.includes(o.id))
                  ?.map((o) => o.name)
                  ?.join(" ، ")
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
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 50 }}
              renderItem={({ item }) => {
                const checked = tempSelected.includes(item.id);
                return (
                  <TouchableOpacity
                    onPress={() => toggleSelect(item.id)}
                    style={styles.selectBtn}
                  >
                    <View style={styles.row}>
                      <ThemedText style={{ marginRight: 8 }}>
                        {item.name}
                      </ThemedText>
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
            <ThemedButton
              title="انتخاب"
              fontType="bold"
              onPress={onConfirm}
              style={{ marginBottom: 40 }}
            />
          </View>
        </ActionSheet>
        {fieldState.error?.message && (
          <ThemedText style={styles.errorTxt} fontType="regular">
            {fieldState.error?.message}
          </ThemedText>
        )}
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
    textAlign: "right",
  },
  selectBtn: {
    paddingVertical: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  errorTxt: {
    color: Colors.darkError,
    fontSize: 12,
    fontFamily: FontType.YekanBakhRegular,
    textAlign: "right",
  },
});
