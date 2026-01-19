import { isWeb } from "@/app/_layout";
import CustomImage from "@/components/atoms/CustomImage";
import SearchWithModal from "@/components/atoms/SearchWithModal";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { maxWidth } from "@/constants/Dimension";
import { FontType } from "@/constants/Fonts";
import { CityDto } from "@/generated/graphql";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import AddressActionSheet from "../../service/Views/AddressActionSheet";
import useServiceTabHook from "../../service/serviceHook";
import useHomeHook from "../hooks/Home.hook";

const { width, height } = Dimensions.get("screen");

export default function Banner() {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const cityActionSheetRef = useRef<ActionSheetRef>(null);

  const {
    cityData,
    //  customerCity, onCityPress,
    activeBanner,
    router,
    isLoggedIn,
  } = useHomeHook();

  const openActionSheet = () => {
    if (isLoggedIn) {
      actionSheetRef.current?.show();
    } else {
      cityActionSheetRef.current?.show();
    }
  };

  const closeActionSheet = () => {
    if (isLoggedIn) {
      actionSheetRef.current?.hide();
    } else {
      cityActionSheetRef.current?.hide();
    }
  };

  const { customerCity, onCityPress } = useServiceTabHook();

  useEffect(() => {
    if (!customerCity && isLoggedIn) {
      actionSheetRef.current?.show();
    }
  }, [customerCity, isLoggedIn]);

  return (
    <View>
      {activeBanner ? (
        <CustomImage style={styles.image} src={activeBanner?.imageUrl} />
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
          </Pressable>
          <TouchableOpacity onPress={openActionSheet} style={styles.button}>
            <Ionicons name="location-outline" size={20} color="#000" />
            <ThemedText type="text" style={styles.city}>
              {customerCity ? customerCity : "انتخاب آدرس"}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <AddressActionSheet
        ref={actionSheetRef}
        closeActionSheet={closeActionSheet}
        onCityPress={onCityPress}
      />

      <ActionSheet
        ref={cityActionSheetRef}
        keyboardHandlerEnabled={false}
        containerStyle={{
          minHeight: height / 2.5,
          width: isWeb ? maxWidth : "100%",
        }}
        onClose={() => closeActionSheet()}
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
        <SearchWithModal
          list={cityData}
          onSelect={() => {
            closeActionSheet();
          }}
        />
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
                    onCityPress(element);
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
    width: maxWidth,
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
    width: "93%",
    alignSelf: "center",
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
