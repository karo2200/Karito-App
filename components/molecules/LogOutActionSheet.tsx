import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import ThemedButton from "../atoms/ThemedButton";

const { height, width } = Dimensions.get("window");

export default function LogOutActionSheet({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  useEffect(() => {
    if (visible) {
      actionSheetRef.current?.show();
    }
  }, [visible]);

  const closeActionSheet = () => {
    onClose?.();
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet ref={actionSheetRef} containerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="close"
          size={24}
          color={Colors.mediumGray}
          onPress={() => closeActionSheet()}
        />
        <ThemedText fontType="bold">خروج از حساب کاربری</ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.title}>
          آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
        </ThemedText>
        <ThemedButton title="خروج" fontType="medium" />
        <ThemedButton
          fontType="medium"
          type="outline"
          title="انصراف"
          onPress={closeActionSheet}
          style={styles.btn}
        />
      </View>
    </ActionSheet>
  );
}

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
