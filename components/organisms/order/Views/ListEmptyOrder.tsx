import NoOrderIcon from "@/assets/icons/No-Order";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function ListEmptyOrder() {
  return (
    <View style={styles.flex1}>
      <NoOrderIcon />
      <ThemedText style={styles.title}>هیچ سفارشی در لیست ندارید!</ThemedText>
      <TouchableOpacity style={styles.btn} activeOpacity={1}>
        <ThemedText style={styles.txtBtn}>مشاهده لیست خدمات</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    width: 177,
    backgroundColor: Colors.hint500,
    alignSelf: "center",
    paddingVertical: 8,
    borderRadius: 6,
  },

  title: {
    textAlign: "center",
    marginTop: 23,
    marginBottom: 70,
  },

  flex1: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  txtBtn: {
    color: "white",
  },
});
