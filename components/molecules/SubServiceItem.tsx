import { Colors } from "@/constants/Colors";
import { formatPrice } from "@/services/ParseData";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../atoms/ThemedText";

export default function SubServiceItem({ item, index, onPress, checked }) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        checked && { borderWidth: 2, borderColor: Colors.hint500 },
      ]}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText
          style={[styles.price, checked && { color: Colors.hint["800"] }]}
          fontType="semiBold"
          hasNumber
        >
          {`${formatPrice(item?.basePrice)} تومان`}
        </ThemedText>
        <View>
          <ThemedText
            style={[styles.title, checked && { color: Colors.hint900 }]}
            fontType="extraBold"
          >
            {item?.name}
          </ThemedText>
          {item?.desc && (
            <ThemedText style={styles.desc} fontType="regular">
              سرویس عادی نظافت شامل موارد ابتدایی
            </ThemedText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    fontSize: 14,
  },
  price: {
    color: Colors.black,
    fontSize: 10,
  },

  desc: {
    color: Colors.gray["desc"],
    fontSize: 10,
  },

  container: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.gray["200"],
    justifyContent: "center",
    padding: 16,
    width: "100%",
  },
});
