// import { GoogleMaps } from "expo-maps";
import React, { useState } from "react";
import {
  I18nManager,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

I18nManager.allowRTL(false); // Enable RTL
I18nManager.forceRTL(false);

export default function AddressMap() {
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState({
    latitude: 35.7575,
    longitude: 51.4103,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>کاریتو</Text>

      {/* Title */}
      <Text style={styles.sectionTitle}>آدرس خود را مشخص کنید:</Text>

      {/* Dropdown */}
      <View style={styles.dropdownContainer}>
        {/* <Picker
          selectedValue={selectedDistrict}
          onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
          style={styles.picker}
          mode="dropdown"
        >
          <Picker.Item label="انتخاب محله" value={null} />
          <Picker.Item label="تجریش" value="tajrish" />
          <Picker.Item label="ولیعصر" value="valiasr" />
        </Picker> */}
      </View>

      {/* Address Input */}
      <TextInput
        style={styles.addressInput}
        placeholder="آدرس شما"
        placeholderTextColor="#999"
        value={address}
        onChangeText={setAddress}
        multiline
      />

      {/* Map */}
      <Text style={styles.sectionTitle}>موقعیت روی نقشه</Text>
      {/* <GoogleMaps.View
        style={styles.map}
        // region={region}
        // onRegionChangeComplete={setRegion}
      /> */}

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>قبلی</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>بعدی</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B4DED",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 12,
  },
  picker: { height: 50, width: "100%" },
  addressInput: {
    height: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    textAlign: "right",
    marginBottom: 12,
  },
  map: { height: 200, marginBottom: 16 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryButton: {
    backgroundColor: "#4B4DED",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  primaryButtonText: { color: "#fff", fontWeight: "bold" },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#4B4DED",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  secondaryButtonText: { color: "#4B4DED", fontWeight: "bold" },
});
