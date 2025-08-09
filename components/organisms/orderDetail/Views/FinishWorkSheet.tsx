import CoopratoinIcon from "@/assets/icons/Coopretion";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

const { height } = Dimensions.get("window");

export default function FinishWorkSheet({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: () => void;
}) {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  useEffect(() => {
    if (visible) {
      actionSheetRef.current?.show();
    }
  }, [visible]);

  const closeActionSheet = () => {
    setVisible?.();
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={{ minHeight: height / 2.5 }}
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

      <View style={styles.contentView}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          مشتری عزیز ضمن تشکر از حسن انتخاب شما لطفا نسبت به پرداخت صورت حساب
          اقدام فرمایید.
        </ThemedText>
        <CoopratoinIcon style={{ marginBottom: 24 }} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.payment}
          onPress={() => closeActionSheet()}
        >
          <ThemedText type="defaultSemiBold" style={styles.textBtn}>
            مشاهده صورت حساب
          </ThemedText>
        </TouchableOpacity>
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
    fontWeight: "400",
    marginVertical: 32,
  },

  contentView: { paddingHorizontal: 15, alignItems: "center" },

  textBtn: {
    fontWeight: "400",
    color: "white",
  },

  payment: {
    backgroundColor: Colors.hint500,
    paddingVertical: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    bottom: 24,
    borderRadius: 4,
    marginTop: 24,
  },
});
