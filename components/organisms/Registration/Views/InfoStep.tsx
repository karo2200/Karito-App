import React from "react";

import Divider from "@/components/atoms/Divider";
import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

const InfoStep = ({ onPrevPress }: { onPrevPress: () => void }) => {
  return (
    <View>
      <ScreenNameWithBack title="تکمیل اطلاعات" onBackPress={onPrevPress} />
      <View style={styles.form}>
        <Divider height={14} />
        <InfoList title={"اطلاعات شخصی"} onPress={() => {}} />
        <InfoList title={"مدارک"} onPress={() => {}} />
        <InfoList title={"احراز هویت"} onPress={() => {}} />
      </View>
    </View>
  );
};

export default InfoStep;

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },

  container: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.grayMedium,
    padding: 12,
    marginVertical: 10,
    flexDirection: "column",
    maxHeight: 100,
  },

  rowView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 12,
  },

  label: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.mediumGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  btn: {
    maxWidth: "25%",
    borderRadius: 6,
    height: 32,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});

const InfoList = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <View style={styles.container}>
      <ThemedText fontType="medium" style={{ color: "black" }}>
        {title}
      </ThemedText>

      <View style={styles.rowView}>
        <ThemedButton title="تکمیل" style={styles.btn} onPress={onPress} />
        <View style={styles.label}>
          <ThemedText type="text" style={{ color: Colors.darkGray }}>
            در انتظار تایید
          </ThemedText>
        </View>
      </View>
    </View>
  );
};
