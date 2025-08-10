import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

const { height } = Dimensions.get("window");

export default function LoginActionSheet() {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  useEffect(() => {
    actionSheetRef.current?.show();
  }, []);

  const closeActionSheet = () => {
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
        <ThemedText fontType="bold">ورود</ThemedText>
      </View>
      <View style={styles.contentView}>
        <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
          <ThemedText type="text" style={styles.title}>
            شهرهای پر بازدید
          </ThemedText>
          <ThemedText fontType="bold" style={styles.text}>
            متخصص
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
          <ThemedText type="text" style={styles.title}>
            شهرهای پر بازدید
          </ThemedText>
          <ThemedText fontType="bold" style={styles.text}>
            مشتری
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

  btn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 48,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.grayMedium,
    marginBottom: 8,
    marginLeft: 8,
  },

  text: { fontFamily: FontType.YekanBakhRegular, color: Colors.gray900 },

  title: {
    marginBottom: 2,
  },

  contentView: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 61,
  },
});
