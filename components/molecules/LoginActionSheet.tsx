import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

const { width, height } = Dimensions.get("window");

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
  image: {
    width: "100%",
    height: 250,
    marginTop: 4,
  },

  inputContainer: {
    alignItems: "center",
    backgroundColor: Colors.hint500,
    bottom: "10%",
  },

  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 16,
    marginTop: 0,
    height: 32,
  },

  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 12,
    fontFamily: FontType.YekanBakhRegular,
  },

  button: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },

  city: {
    marginHorizontal: 8,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  flexWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-end",
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
