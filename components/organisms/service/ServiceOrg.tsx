import { Divider, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import ServiceBodySection from "./Views/ServiceBodySection";
import ServiceHeaderSection from "./Views/ServiceHeaderSection";
import useServiceTabHook from "./serviceHook";

export default function ServiceOrg() {
  const { selectedService, onServiceItemPress, serviceItems, subServiceItems } =
    useServiceTabHook();

  return (
    <ScrollView style={styles.flex1}>
      <ThemedView style={styles.container}>
        <Ionicons name="search-outline" size={20} color={Colors.unfilledText} />
        <TextInput
          style={styles.input}
          placeholder="جستجو"
          textAlign="right"
          textAlignVertical="center"
          placeholderTextColor={Colors.unfilledText}
        />
      </ThemedView>
      <ServiceHeaderSection
        {...{ onServiceItemPress, selectedService, serviceItems }}
      />
      <Divider />
      <ServiceBodySection
        selectedService={selectedService}
        items={subServiceItems}
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
});
