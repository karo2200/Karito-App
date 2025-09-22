import CoopratoinIcon from "@/assets/icons/Coopretion";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import authCacheStore from "@/stores/authCacheStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import ThemedButton from "../atoms/ThemedButton";
import useOrderDetailHook from "../organisms/orderDetail/hooks/OrderDetail.hook";

const { height, width } = Dimensions.get("screen");

export default function PaymentWaitingSheet({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const { onCompletePress, completePending, serviceData, isComplete } =
    useOrderDetailHook();
  const { isExpert } = authCacheStore();

  useEffect(() => {
    if (visible) {
      actionSheetRef.current?.show();
    }
  }, [visible]);

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
    onClose?.();
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
          اتمام کار
        </ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.title} type="defaultSemiBold">
          {isComplete
            ? "متخصص عزیز خسته نباشید!\nلطفا در انتظار پرداخت مشتری بمانید."
            : "آیا کار خود را به طور کامل به اتمام رسانده اید؟"}
        </ThemedText>
        {isComplete && (
          <CoopratoinIcon width={180} height={180} style={styles.icon} />
        )}

        {!isComplete && (
          <ThemedButton
            title="اتمام کار"
            fontType="medium"
            onPress={onCompletePress}
            style={{ marginBottom: 24 }}
            isLoading={completePending}
          />
        )}

        <ThemedButton
          title="متوجه شدم"
          fontType="medium"
          type={!isComplete ? "outline" : "filled"}
          onPress={() => closeActionSheet()}
          style={styles.mb}
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

  container: {
    minHeight: height / 3.5,
    width: Platform.OS === "web" ? Math.min(width, 480) : "100%",
  },

  mb: {
    marginBottom: 40,
  },
});
