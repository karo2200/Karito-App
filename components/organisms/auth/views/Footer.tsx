import React from "react";

import { ThemedButton } from "@/components";
import { Colors } from "@/constants/Colors";
import { DeviceHeight, maxWidth } from "@/constants/Dimension";
import { FontType } from "@/constants/Fonts";
import { UserType } from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type FooterProps = {
  onPress: () => void;
  hasError?: boolean;
  title?: string;
  isNextLoading?: boolean;
  style?: ViewStyle;
  role?: UserType;
};

const Footer = ({
  onPress,
  hasError,
  title = "ورود",
  style,
  isNextLoading,
  role,
}: FooterProps) => {
  const router = useRouter();

  const { setIsExpert } = authCacheStore();

  const onChangeRole = () => {
    if (role === UserType.Customer) {
      setIsExpert(true);
      router.replace("/ExpertLoginPage");
    } else {
      setIsExpert(false);
      router.replace("/LoginPage");
    }
  };
  console.log({ maxWidth });
  return (
    <View style={[styles.button, style]}>
      <ThemedButton
        title={title}
        disabled={hasError}
        onPress={onPress}
        disabledColor={Colors.hint50}
        disabledTextColor={Colors.mediumGray}
        isLoading={isNextLoading}
        fontType="bold"
        style={{ width: 0.94 * maxWidth }}
      />
      {role && (
        <Text
          style={styles.extraLogin}
          onPress={onChangeRole}
        >{`ورود به عنوان ${role === UserType.Customer ? "متخصص" : "مشتری"}`}</Text>
      )}
      <Text style={styles.txt}>
        ورود به منزله پذیرش
        <Text style={styles.color}> قوانین و مقررات</Text> کاریتو است.
      </Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  button: {
    marginBottom: DeviceHeight * 0.15,
    width: maxWidth - 30,
    alignSelf: "center",
    alignItems: "center",
  },

  txt: {
    textAlign: "right",
    fontFamily: FontType.YekanBakhMedium,
    fontSize: 11,
    marginTop: 12,
    letterSpacing: 3,
    alignSelf: "center",
  },

  color: { color: Colors.hint500 },

  extraLogin: {
    textAlign: "center",
    fontFamily: FontType.YekanBakhMedium,
    fontSize: 14,
    marginTop: 12,
    letterSpacing: 2,
    alignSelf: "center",
    textDecorationLine: "underline",
  },
});
