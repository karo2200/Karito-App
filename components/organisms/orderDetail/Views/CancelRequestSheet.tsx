import CustomRadioButton from "@/components/atoms/CustomRadioButton";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import useOrderDetailHook from "../hooks/OrderDetail.hook";

const { height } = Dimensions.get("screen");

export default function CancelRequestSheet({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const { onCancelReuest, cancelationData } = useOrderDetailHook();

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
          دلیل لغو سفارش
        </ThemedText>
      </View>

      <View style={styles.contentView}>
        <FlatList
          data={cancelationData}
          keyExtractor={(item) => item?.id}
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onCancelReuest(item?.id);
              }}
              style={styles.selectBtn}
            >
              <CustomRadioButton
                label={item?.name}
                checked={true}
                onPress={() => {
                  onCancelReuest(item?.id);
                }}
              />
            </TouchableOpacity>
          )}
        />
        <ThemedButton
          title="لغو"
          type="outline"
          onPress={() => actionSheetRef.current?.hide()}
          style={{ marginBottom: 40 }}
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
    fontWeight: "400",
    marginVertical: 32,
  },

  contentView: { paddingHorizontal: 15, alignItems: "center" },

  selectBtn: {
    paddingVertical: 12,
  },
});
