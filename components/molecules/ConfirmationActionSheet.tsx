import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import ThemedButton from "../atoms/ThemedButton";

const { height, width } = Dimensions.get("screen");

const ConfirmationActionSheet = ({
  visible,
  title,
  confirmButtonText,
  cancelButtonText = "انصراف",
  isLoading = false,
  onConfirmPress,
  onClose,
}: {
  visible: boolean;
  title: string;
  isLoading: boolean;
  confirmButtonText: string;
  cancelButtonText?: string;
  onConfirmPress: () => void;
  onClose: () => void;
}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  useEffect(() => {
    if (visible) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
    }
  }, [visible]);

  const closeActionSheet = () => {
    onClose?.();
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={styles.container}
      onClose={closeActionSheet}
    >
      <View style={styles.header}>
        <Ionicons
          name="close"
          size={24}
          color={Colors.mediumGray}
          onPress={() => closeActionSheet()}
        />
        <ThemedText fontType="bold"></ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <ThemedButton
          title={confirmButtonText}
          fontType="medium"
          isLoading={isLoading}
          onPress={onConfirmPress}
        />
        <ThemedButton
          fontType="medium"
          type="outline"
          title={cancelButtonText}
          onPress={closeActionSheet}
          style={[styles.btn, { marginBottom: 40 }]}
        />
      </View>
    </ActionSheet>
  );
};

export default ConfirmationActionSheet;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  title: {
    marginVertical: 32,
    textAlign: "right",
  },

  btn: { marginTop: 24 },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 33,
  },

  container: {
    minHeight: height / 3.5,
    width: Platform.OS === "web" ? Math.min(width, 480) : "100%",
  },
});
