import ApplianceIcon from "@/assets/icons/Appliance";
import CarIcon from "@/assets/icons/Car";
import CosmeticsIcon from "@/assets/icons/Cosmetics";
import HospitalIcon from "@/assets/icons/Hospital";
import HouseOnWheelsIcon from "@/assets/icons/House-On-Wheels";
import NounHouseIcon from "@/assets/icons/noun-house";
import ThemedText from "@/components/atoms/ThemedText";
import ThemedView from "@/components/atoms/ThemedView";
import { Colors } from "@/constants/Colors";

import { StyleSheet, View } from "react-native";

export default function Categories() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>خدمات</ThemedText>
      <View style={styles.flexRow}>
        <HeaderItem
          Icon={() => <NounHouseIcon />}
          title={"تمیزکاری و نظافت"}
          style={{ width: "100%" }}
        />
        <HeaderItem
          Icon={() => <CosmeticsIcon />}
          title={"سلامت و زیبایی"}
          style={{ width: "100%" }}
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

function HeaderItem({ Icon, title, style }) {
  return (
    <ThemedView style={{ alignItems: "center", gap: 5 }}>
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
        <Icon color={Colors.hint500} size={24} />
      </ThemedView>
      <ThemedText type="text">{title}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
});
