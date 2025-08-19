import ConnectivityIcon from "@/assets/icons/Connectivity";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import ThemedButton from "../atoms/ThemedButton";

const { height, width } = Dimensions.get("screen");

export default function LocationActionSheet({
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
          خطا در لوکیشن
        </ThemedText>
      </View>
      <View style={styles.content}>
        <ConnectivityIcon
          style={{ alignSelf: "center", marginTop: 61, marginBottom: 20 }}
        />
        <ThemedText style={styles.title} type="defaultSemiBold">
          لوکیشن شما نزدیک تحویل‌گیرنده سفارش نیست.
        </ThemedText>
        <ThemedButton
          title="متوجه شدم"
          fontType="medium"
          onPress={() => closeActionSheet()}
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
    paddingVertical: 16,
  },

  title: {
    marginVertical: 32,
    textAlign: "center",
    alignSelf: "center",
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
