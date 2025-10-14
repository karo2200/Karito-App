import { Divider, SearchWithModal, ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import { CityDto } from "@/generated/graphql";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import useHomeHook from "../home/hooks/Home.hook";
import AddressActionSheet from "./Views/AddressActionSheet";
import ServiceBodySection from "./Views/ServiceBodySection";
import ServiceHeaderSection from "./Views/ServiceHeaderSection";
import useServiceTabHook from "./serviceHook";

const { width, height } = Dimensions.get("screen");

export default function ServiceOrg() {
  const {
    selectedService,
    onServiceItemPress,
    serviceItems,
    subServiceItems,
    setSearchText,
    onSubServiceLoadMore,
    subServiceLoading,
    customerCity,
    onCityPress,
    onLocationPress,
    onCloseSheet,
    actionSheetRef,
    cityActionSheetRef,
  } = useServiceTabHook();

  const { cityData } = useHomeHook();

  return (
    <ScrollView style={styles.flex1}>
      <AddressActionSheet
        ref={actionSheetRef}
        closeActionSheet={onCloseSheet}
        onCityPress={onCityPress}
      />
      <ThemedView style={styles.container}>
        <Ionicons name="search-outline" size={20} color={Colors.unfilledText} />
        <TextInput
          style={styles.input}
          placeholder="جستجو"
          textAlign="right"
          textAlignVertical="center"
          placeholderTextColor={Colors.unfilledText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={onLocationPress} style={styles.button}>
          <Ionicons name="location-outline" size={20} color="#000" />
          <ThemedText type="text" style={styles.city}>
            {customerCity ? customerCity : "انتخاب آدرس"}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ServiceHeaderSection
        {...{ onServiceItemPress, selectedService, serviceItems }}
      />
      <Divider />
      <ServiceBodySection
        selectedService={selectedService}
        items={subServiceItems}
        onEndReached={onSubServiceLoadMore}
        isLoading={subServiceLoading}
      />
      <ActionSheet
        ref={cityActionSheetRef}
        keyboardHandlerEnabled={false}
        containerStyle={{ minHeight: height / 2.5 }}
        onClose={onCloseSheet}
      >
        <View style={styles.header}>
          <Ionicons
            name="close"
            size={24}
            color={Colors.mediumGray}
            onPress={onCloseSheet}
          />
          <ThemedText fontType="bold">کدام شهر هستید؟</ThemedText>
        </View>
        <SearchWithModal list={cityData} onSelect={onCloseSheet} />
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
                    onCloseSheet();
                  }}
                >
                  <ThemedText style={styles.text}>{element?.name}</ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ActionSheet>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },

  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 16,
    marginTop: 0,
    height: 32,
    borderWidth: 1,
    borderColor: Colors.strokeGray,
  },

  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 12,
    fontFamily: FontType.YekanBakhRegular,
    textAlignVertical: "center",
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
