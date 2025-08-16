import { Colors } from "@/constants/Colors";
import { DeviceHeight, DeviceWidth } from "@/constants/Dimension";
import { Camera, Gallery } from "iconsax-react-native";
import React, { useRef } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import ThemedText from "../atoms/ThemedText";

const SelectImageModal = ({
  isVisible,
  onClose,
  onPressCamera,
  onPressImage,
  onlyCamera = false,
}: {
  isVisible: boolean;
  onClose: () => void;
  onPressCamera: () => void;
  onPressImage: () => void;
  onlyCamera?: boolean;
}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const items = [
    {
      title: "Camera",
      icon: <Camera color={Colors.hint500} />,
      onPress: () => onPressCamera(),
    },
    ...(!onlyCamera
      ? [
          {
            title: "Gallery",
            icon: <Gallery color={Colors.hint500} />,
            onPress: () => onPressImage(),
          },
        ]
      : []),
  ];

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet ref={actionSheetRef}>
      <View style={styles.container}>
        {items?.map((item) => {
          return (
            <View style={{ alignItems: "center" }} key={item.title}>
              <TouchableOpacity style={styles.toch} onPress={item?.onPress}>
                {item?.icon}
              </TouchableOpacity>
              <ThemedText>{item?.title}</ThemedText>
            </View>
          );
        })}
      </View>
    </ActionSheet>
  );
};

export default SelectImageModal;

const styles = StyleSheet.create({
  container: {
    minHeight: DeviceHeight / 3.5,
    width: Platform.OS === "web" ? Math.min(DeviceWidth, 480) : "100%",
  },

  toch: {
    padding: 12,
    marginBottom: 8,
  },

  text: { fontSize: 12, fontWeight: "400" },
});
