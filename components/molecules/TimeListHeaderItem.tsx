import { Colors } from "@/constants/Colors";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useController } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "..";

const width = 80;

const TimeListHeaderItem = forwardRef(
  (
    {
      item,
      checkedRef,
      onItemPress,
      index,
      dayRefs,
    }: {
      item: any;
      checkedRef?: any;
      onItemPress?: () => void;
      index: number;
      dayRefs: any;
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(false);
    const { field } = useController({ name: "date" });

    useImperativeHandle(ref, () => ({
      setCheck: (value: boolean) => {
        setIsChecked(value);
      },
    }));

    const handleOnItemPress = () => {
      if (index != checkedRef.current) {
        dayRefs.current[checkedRef.current].current.setCheck(false);
        checkedRef.current = index;
        setIsChecked(true);
      }
      field.onChange(item?.value);
      onItemPress?.();
    };

    useEffect(() => {
      if (field.value == item.value) {
        console.log({ field });
        setIsChecked(true);
      }
    }, []);

    return (
      <TouchableOpacity
        style={[
          isChecked ? styles.selectedContainer : styles.deSelectedContainer,
        ]}
        onPress={handleOnItemPress}
        disabled={!onItemPress}
      >
        <ThemedText
          type="subtitle"
          style={isChecked ? styles.selectedText : styles.deSelectedText}
        >
          {item?.display}
        </ThemedText>
        <ThemedText
          fontType="bold"
          type="title"
          style={isChecked ? styles.selectedText : styles.deSelectedText}
        >
          {item?.label}
        </ThemedText>
      </TouchableOpacity>
    );
  }
);

export default TimeListHeaderItem;

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
  },

  selectedText: { color: Colors.hint500 },
  deSelectedText: { color: Colors.semiBlack },
});
