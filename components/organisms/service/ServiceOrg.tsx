import { Divider, ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";
import CityActionSheet from "../home/Views/CityActionSheet";
import ServiceBodySection from "./Views/ServiceBodySection";
import ServiceHeaderSection from "./Views/ServiceHeaderSection";
import useServiceTabHook from "./serviceHook";

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
    setCustomerCity,
  } = useServiceTabHook();

  const actionSheetRef = useRef<ActionSheetRef>(null);

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  const onCityPress = (city: string) => {
    setCustomerCity(city);
  };

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  return (
    <ScrollView style={styles.flex1}>
      <CityActionSheet
        ref={actionSheetRef}
        closeActionSheet={closeActionSheet}
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
        <TouchableOpacity onPress={openActionSheet} style={styles.button}>
          <Ionicons name="location-outline" size={20} color="#000" />
          <ThemedText type="text" style={styles.city}>
            {customerCity ? customerCity : "انتخاب شهر"}
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
});
