import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";
import ThemedText from "./ThemedText";

const sampleData = [
  "تهران",
  "مشهد",
  "تبریز",
  "اصفهان",
  "شیراز",
  "رشت",
  "اهواز",
  "کرج",
  "قم",
  "زاهدان",
];

export default function SearchWithModal() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 0) {
      const results = sampleData.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  };

  const handleSelect = (item: string) => {
    setSearch(item);
    setFiltered([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons
          name="search"
          size={20}
          color={Colors.disabledIcon}
          style={styles.icon}
        />
        <TextInput
          placeholder="جستجوی شهر"
          value={search}
          onChangeText={handleSearch}
          style={styles.input}
          placeholderTextColor={Colors.unfilledText}
        />
      </View>

      {filtered.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={filtered}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelect(item)}
                style={styles.resultItem}
              >
                <ThemedText type="text" style={styles.text}>
                  {item}
                </ThemedText>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },

  searchBox: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.disabledIcon,
    justifyContent: "center",
  },

  icon: {
    marginLeft: 8,
  },

  input: {
    flex: 1,
    fontSize: 14,
    textAlign: "right",
    color: "black",
    fontFamily: FontType.YekanBakhRegular,
  },

  resultItem: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.unfilledText,
  },

  dropdown: {
    position: "absolute",
    top: 33,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.unfilledText,
    borderRadius: 4,
    maxHeight: 150,
    zIndex: 100,
  },

  text: { fontFamily: FontType.YekanBakhRegular },
});
