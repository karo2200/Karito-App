import CustomImage from "@/components/atoms/CustomImage";
import SearchWithModal from "@/components/atoms/SearchWithModal";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import { CityDto } from "@/generated/graphql";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import useHomeHook from "../hooks/Home.hook";

const { width, height } = Dimensions.get("screen");

export default function Banner() {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const { cityData, customerCity, onCityPress, activeBanner, router } =
    useHomeHook();

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  return (
    <View>
      {activeBanner ? (
        <CustomImage
          style={styles.image}
          src={activeBanner?.imageUrl}
          resizeMode="fill"
        />
      ) : (
        <CustomImage
          localSource={require("@/assets/images/Home-Banner.png")}
          style={styles.image}
        />
      )}
      <View style={styles.inputContainer}>
        <View style={styles.container}>
          <Pressable
            style={styles.searchBtn}
            onPress={() => router.replace("/(tabs)/service")}
          >
            <Ionicons name="search-outline" size={20} />
            <ThemedText>جستجوی خدمت</ThemedText>
            {/* <TextInput
              style={styles.input}
              placeholder="جستجوی خدمت"
              textAlign="right"
              placeholderTextColor={Colors.unfilledText}
            /> */}
          </Pressable>
          <TouchableOpacity onPress={openActionSheet} style={styles.button}>
            <Ionicons name="location-outline" size={20} color="#000" />
            <ThemedText type="text" style={styles.city}>
              {customerCity ? customerCity : "انتخاب شهر"}
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
        <SearchWithModal list={cityData} onSelect={() => closeActionSheet()} />
        <View style={styles.contentView}>
          <ThemedText type="text" style={styles.title} fontType="bold">
            شهرهای پر بازدید
          </ThemedText>
          <View style={styles.flexWrap}>
            {cityData?.slice(0, 9)?.map((element: CityDto) => {
              return (
                <Pressable
                  style={styles.cityView}
                  key={element?.id}
                  onPress={() => {
                    onCityPress(element?.name);
                    closeActionSheet();
                  }}
                >
                  <ThemedText style={styles.text}>{element?.name}</ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ActionSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Platform.OS === "web" ? Math.min(width, 480) : width,
    height: 250,
    marginTop: 4,
  },

  inputContainer: {
    alignItems: "center",
    bottom: "5%",
  },

  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: Colors.hint50,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 16,
    marginTop: 0,
    height: 32,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },

  input: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 12,
    fontFamily: FontType.YekanBakhRegular,
  },

  button: {
    flexDirection: "row",
    backgroundColor: Colors.hint50,
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
    marginTop: 21,
    marginBottom: 8,
  },

  contentView: { paddingHorizontal: 15 },

  searchBtn: {
    flexDirection: "row-reverse",
    flex: 1,
    alignItems: "center",
  },
});
