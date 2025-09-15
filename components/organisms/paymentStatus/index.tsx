import FailedPaymentIcon from "@/assets/icons/FailedPayment";
import SuccessPaymentIcon from "@/assets/icons/SuccessPayment";
import ThemedContainer from "@/components/atoms/ThemedContainer";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

const { height } = Dimensions.get("screen");

export default function PaymentStatusScreen() {
  const router = useRouter();

  const { status } = useLocalSearchParams();

  return (
    <ThemedContainer>
      <View style={styles.flex1}>
        <ThemedText style={{ color: Colors.semiBlack, marginTop: 53 }}>
          شماره سفارش: ۷۷۱۱۷۱
        </ThemedText>
        <ThemedText style={{ color: Colors.semiBlack, marginTop: 4 }}>
          شماره پیگیری: ۷۷۱۱۷۱
        </ThemedText>
        {status === "NOK" ? (
          <FailedPaymentIcon style={{ marginTop: height / 8 }} />
        ) : (
          <SuccessPaymentIcon style={{ marginTop: height / 8 }} />
        )}
        <ThemedText style={{ color: Colors.semiBlack, marginTop: 23 }}>
          پرداخت با موفقیت انجام شد.
        </ThemedText>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.payment}
        onPress={() => router.push("/home")}
      >
        <ThemedText type="defaultSemiBold" style={styles.textBtn}>
          بازگشت به خانه
        </ThemedText>
      </TouchableOpacity>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  flex1: { alignItems: "center", flex: 1 },

  textBtn: {
    fontWeight: "400",
    color: "white",
  },

  payment: {
    backgroundColor: Colors.hint500,
    paddingVertical: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 4,
  },
});
