import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import { CityDto } from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";
import ThemedText from "./ThemedText";

export default function SearchWithModal({
  list,
  onSelect,
}: {
  list: [CityDto];
  onSelect: () => void;
}) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<CityDto[]>([]);

  const { setCustomerCity, customerCity } = authCacheStore();

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 0) {
      const results = list?.filter((item) => item.name.includes(text));
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  };

  const handleSelect = (item: CityDto) => {
    setSearch(item?.name);
    setFiltered([]);
    setCustomerCity(item?.name);
    onSelect?.();
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
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => handleSelect(item)}
                style={[
                  styles.resultItem,
                  index > filtered?.length - 2 && { borderBottomWidth: 0 },
                ]}
              >
                <ThemedText type="text" style={styles.text}>
                  {item?.name}
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
