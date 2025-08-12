import NoOrderIcon from "@/assets/icons/No-Order";
import ThemedText from "@/components/atoms/ThemedText";
import ThemedView from "@/components/atoms/ThemedView";
import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import OrderCard from "../order/Views/OrderCard";

const { height } = Dimensions.get("window");

export default function WorkListScreen() {
  const router = useRouter();
  const listRef = React.useRef<FlatList>(null);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <OrderCard
        item={item}
        key={item?.id}
        onOrderPress={() => {
          router.push("/workList/orderDetail");
        }}
        isCustomer={false}
      />
    ),
    []
  );

  return (
    <View style={{ flex: 1 }}>
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
      <FlatList
        ref={listRef}
        keyExtractor={(item) => item?.id}
        data={[{}]}
        refreshing={true}
        // onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onEndReached={() => {
          // if (hasNextPage) {
          //   fetchNextPage();
          // }
        }}
        ListEmptyComponent={() => (
          <View style={styles.flex1}>
            <NoOrderIcon />
            <ThemedText style={styles.title}>
              هیچ سفارشی در لیست ندارید!
            </ThemedText>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 12,
    fontFamily: FontType.YekanBakhRegular,
    textAlignVertical: "center",
  },

  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 16,
    marginHorizontal: 15,
    height: 32,
    borderWidth: 1,
    borderColor: Colors.strokeGray,
  },

  flex1: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: height / 7,
  },

  title: {
    textAlign: "center",
    marginTop: 23,
    marginBottom: 70,
  },
});
