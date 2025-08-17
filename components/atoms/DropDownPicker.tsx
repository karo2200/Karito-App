import { Colors } from "@/constants/Colors";
import { ArrowDown2, ArrowUp2 } from "iconsax-react-native";
import React, { useRef, useState } from "react";
import { useController } from "react-hook-form";
import {
  DimensionValue,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import ThemedText from "./ThemedText";

interface DropDownProps {
  name: string;
  data: any[];
  label?: string;
  title?: string;
  unit?: string;
  required?: boolean;
  placeholder?: string;
  height?: DimensionValue | undefined;
  position?:
    | "absolute"
    | "relative"
    | "fixed"
    | "static"
    | "sticky"
    | undefined;
  width?: DimensionValue | undefined;
  right?: DimensionValue | undefined;
  left?: DimensionValue | undefined;
  maxHeight?: DimensionValue | undefined;
  textStyle?: any;
  textColor?: string;
  formState?: any;
  validation?: boolean;
  valueKey?: string;
  titleKey?: string;
  isHorizontal?: boolean;
  disabled?: boolean;
  onChangeValue?: (value: any) => void;
}

interface dropDownPositionType {
  top: DimensionValue | undefined;
  bottom: DimensionValue | undefined;
}

const Dropdown = React.forwardRef<any, DropDownProps>(
  (
    {
      name,
      data,
      label,
      title,
      unit,
      placeholder,
      required,
      height = 44,
      width,
      right,
      left,
      position,
      maxHeight = 300,
      textStyle,
      textColor = "#333",
      formState,
      validation = false,
      valueKey = "value",
      titleKey = "label",
      isHorizontal,
      disabled,
      onChangeValue,
    },
    ref
  ) => {
    const DropdownButton = useRef<View>(null);
    const { height: screenHeight } = useWindowDimensions();
    const { field, fieldState } = useController({ name });

    const isDirty = formState?.isDirty;
    const [visible, setVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] =
      useState<dropDownPositionType>({
        top: undefined,
        bottom: undefined,
      });

    const onPressHandler = () => {
      visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = (): void => {
      DropdownButton?.current?.measure?.((_fx, _fy, _w, h, _px, py) => {
        const maxH =
          typeof maxHeight === "number" ? maxHeight : Number(maxHeight);

        if (screenHeight - (py + h) > maxH) {
          setDropdownPosition({
            top: Platform.OS === "ios" ? py + 8 + h : py,
            bottom: undefined,
          });
        } else if (py > maxH) {
          setDropdownPosition({
            top: undefined,
            bottom: screenHeight - py + 30 - h / 2,
          });
        } else {
          setDropdownPosition({
            top: 0,
            bottom: undefined,
          });
        }
      });
      setVisible(true);
    };

    const getName = (value: string) => {
      const item = data?.find(
        (element: any) => element?.[valueKey]?.toString() === value?.toString()
      );
      return item?.[titleKey];
    };

    const itemOnPress = (item: any) => {
      setVisible(false);
      field.onChange?.(item?.[valueKey]);
      onChangeValue?.(item?.[valueKey]);
    };

    const renderItem = ({ item, index }: { item: any; index: number }) => {
      const isEnable = item?.[valueKey]?.toString() === field.value?.toString();
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.item,
            { backgroundColor: isEnable ? "#eee" : "white" },
          ]}
          activeOpacity={0.7}
          onPress={() => itemOnPress(item)}
        >
          <ThemedText
            style={[
              {
                color: isEnable ? Colors.hint500 : textColor,
                textAlign: "right",
              },
              textStyle,
            ]}
          >
            {item?.[titleKey]}
          </ThemedText>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ marginBottom: isHorizontal ? 16 : 0, width }}>
        {title && (
          <ThemedText style={{ fontWeight: "500", marginBottom: 4 }}>
            {title}{" "}
            {unit && <ThemedText style={{ color: "gray" }}>{unit}</ThemedText>}
            {required && <ThemedText style={{ color: "red" }}> *</ThemedText>}
          </ThemedText>
        )}

        <TouchableOpacity
          disabled={disabled}
          ref={DropdownButton}
          activeOpacity={0.9}
          onPress={onPressHandler}
          style={[
            styles.inputBox,
            {
              height: height,
              borderColor: fieldState.error
                ? Colors.darkError
                : isDirty
                ? Colors.hint500
                : Colors.gray300,
            },
          ]}
        >
          <ThemedText
            style={[
              {
                flex: 1,
                color: field.value ? textColor : Colors.gray300,
                textAlign: "right",
                paddingRight: 8,
              },
              textStyle,
            ]}
            numberOfLines={1}
          >
            {field.value
              ? getName(field.value?.toString())
              : label || placeholder}
          </ThemedText>
          <View
            style={{
              backgroundColor: Colors.hint500,
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
              marginRight: 8,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              paddingHorizontal: 8,
            }}
          >
            {visible ? (
              <ArrowUp2 size={24} color="white" />
            ) : (
              <ArrowDown2 size={24} color="white" />
            )}
          </View>
        </TouchableOpacity>

        <Modal visible={visible} transparent animationType="fade">
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setVisible(false)}
          >
            <View
              style={[
                styles.dropdown,
                {
                  top: dropdownPosition?.top,
                  bottom: dropdownPosition?.bottom,
                  maxHeight,
                  width: width || "90%",
                  right,
                  left,
                  position,
                },
              ]}
            >
              {data?.length > 0 ? (
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(_, index) => `dropDownItem${index}`}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <ThemedText style={{ padding: 12 }}>No Results</ThemedText>
              )}
            </View>
          </TouchableOpacity>
        </Modal>

        {fieldState?.error?.message && (
          <ThemedText style={{ color: "red", fontSize: 12, marginTop: 4 }}>
            {fieldState?.error?.message}
          </ThemedText>
        )}
      </View>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    borderRadius: 4,
    // paddingHorizontal: 12,
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "white",
  },
  overlay: {
    width: "100%",
    height: "100%",
  },
  dropdown: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.gray300,
    overflow: "hidden",
  },
  item: {
    padding: 12,
  },
});
