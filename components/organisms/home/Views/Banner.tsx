import SearchWithModal from "@/components/atoms/SearchWithModal";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

const { width, height } = Dimensions.get("window");

export default function Banner() {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  return (
    <View>
      <Image
        style={styles.image}
        source={require("../../../../assets/images/Home-Banner.png")}
      />
      <View style={styles.inputContainer}>
        <View style={styles.container}>
          <Ionicons
            name="search-outline"
            size={20}
            color={Colors.unfilledText}
          />
          <TextInput
            style={styles.input}
            placeholder="جستجوی خدمت"
            textAlign="right"
            placeholderTextColor={Colors.unfilledText}
          />

          <TouchableOpacity onPress={openActionSheet} style={styles.button}>
            <Ionicons name="location-outline" size={20} color="#000" />
            <ThemedText type="text" style={styles.city}>
              انتخاب شهر
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <ActionSheet
        ref={actionSheetRef}
        keyboardHandlerEnabled={false}
        containerStyle={{ minHeight: height / 2.5 }}
      >
        <View style={styles.header}>
          <Ionicons
            name="close"
            size={24}
            color={Colors.mediumGray}
            onPress={() => closeActionSheet()}
          />
          <ThemedText fontType="bold">کدام شهر هستید؟</ThemedText>
        </View>
        <SearchWithModal />
        <View style={styles.contentView}>
          <ThemedText type="text" style={styles.title}>
            شهرهای پر بازدید
          </ThemedText>
          <View style={styles.flexWrap}>
            {["تهران", "تهران", "تهران", "تهران"]?.map(
              (element: string, id: number) => {
                return (
                  <View style={styles.cityView} key={id}>
                    <ThemedText style={styles.text}>{element}</ThemedText>
                  </View>
                );
              }
            )}
          </View>
        </View>
      </ActionSheet>
    </View>
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

  cityView: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    gap: 2,
    height: 39,
    width: width / 3 - 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.grayMedium,
    marginBottom: 8,
    marginLeft: 8,
  },

  text: { fontFamily: FontType.YekanBakhRegular, color: Colors.gray900 },

  title: {
    fontWeight: "700",
    fontFamily: FontType.YekanBakhBold,
    marginTop: 21,
    marginBottom: 8,
  },

  contentView: { paddingHorizontal: 15 },
});
