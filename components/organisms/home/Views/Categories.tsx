import ApplianceIcon from "@/assets/icons/Appliance";
import CarIcon from "@/assets/icons/Car";
import CosmeticsIcon from "@/assets/icons/Cosmetics";
import HospitalIcon from "@/assets/icons/Hospital";
import HouseOnWheelsIcon from "@/assets/icons/House-On-Wheels";
import NounHouseIcon from "@/assets/icons/noun-house";
import ThemedText from "@/components/atoms/ThemedText";
import ThemedView from "@/components/atoms/ThemedView";
import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import { ComponentType } from "react";

import { StyleSheet, View, ViewStyle } from "react-native";

export default function Categories() {
  return (
    <View style={styles.container}>
      <ThemedText fontType="bold" style={styles.title}>
        خدمات
      </ThemedText>
      <View style={styles.flexRow}>
        <HeaderItem
          Icon={() => <NounHouseIcon />}
          title={"تمیزکاری و نظافت"}
          style={{ width: 171 }}
        />
        <HeaderItem
          Icon={() => <CosmeticsIcon />}
          title={"سلامت و زیبایی"}
          style={{ width: 171 }}
        />
      </View>
      <View style={styles.flexRow}>
        <HeaderItem Icon={() => <CarIcon />} title={"خودرو"} />
        <HeaderItem Icon={() => <ApplianceIcon />} title={"تعمیرات"} />
        <HeaderItem Icon={() => <HouseOnWheelsIcon />} title={"حمل بار"} />
        <HeaderItem Icon={() => <HospitalIcon />} title={"سایر خدمات"} />
      </View>
    </View>
  );
}

function HeaderItem({
  Icon,
  title,
  style,
}: {
  Icon: ComponentType;
  title: string;
  style?: ViewStyle;
}) {
  return (
    <ThemedView style={{ alignItems: "center" }}>
      <ThemedView
        style={[
          {
            width: 64,
            height: 64,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.hint50,
          },
          style,
        ]}
      >
        <Icon />
      </ThemedView>
      <ThemedText type="text" style={styles.text}>
        {title}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 16 },
  title: {
    textAlign: "right",
    marginVertical: 16,
  },

  flexRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: { marginTop: 4, fontFamily: FontType.YekanBakhRegular },
});
