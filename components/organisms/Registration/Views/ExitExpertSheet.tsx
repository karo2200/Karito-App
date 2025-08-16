import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

const { height, width } = Dimensions.get("window");

export default function ExitExpertSheet({
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
        <ThemedText fontType="bold" type="defaultSemiBold">
          خروج از حساب کاربری
        </ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.title}>
          کاربر گرامی آيا از اینکه به عنوان متخصص کاریتو ثبت‌نام کنید اطمینان
          دارید؟
        </ThemedText>
        <ThemedButton
          title="ثبت نام"
          fontType="medium"
          onPress={() => {
            closeActionSheet();
          }}
        />
        <ThemedButton
          fontType="medium"
          type="outline"
          title="انصراف"
          onPress={() => {
            closeActionSheet();
          }}
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
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  title: {
    marginVertical: 24,
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
