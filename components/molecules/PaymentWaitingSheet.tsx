import CoopratoinIcon from "@/assets/icons/Coopretion";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import ThemedButton from "../atoms/ThemedButton";

const { height } = Dimensions.get("window");

export default function PaymentWaitingSheet({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [isDone, setIsDone] = useState(false);

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
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={{ minHeight: height / 3.5 }}
    >
      <View style={styles.header}>
        <Ionicons
          name="close"
          size={24}
          color={Colors.mediumGray}
          onPress={() => closeActionSheet()}
        />
        <ThemedText fontType="bold" type="defaultSemiBold">
          اتمام کار
        </ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.title} type="defaultSemiBold">
          {isDone
            ? "متخصص عزیز خسته نباشید!\nلطفا در انتظار پرداخت مشتری بمانید."
            : "آیا کار خود را به طور کامل به اتمام رسانده اید؟"}
        </ThemedText>
        {isDone && (
          <CoopratoinIcon width={180} height={180} style={styles.icon} />
        )}

        {!isDone && (
          <ThemedButton
            title="اتمام کار"
            fontType="medium"
            onPress={() => setIsDone(true)}
            style={{ marginBottom: 24 }}
          />
        )}

        <ThemedButton
          title="متوجه شدم"
          fontType="medium"
          type={!isDone ? "outline" : "filled"}
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
    marginBottom: 24,
    marginTop: 4,
    textAlign: "right",
  },

  btn: { marginTop: 24 },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 33,
  },

  icon: { alignSelf: "center", marginBottom: 24 },
});
