import CosmeticsIcon from "@/assets/icons/Cosmetics";
import NounHouseIcon from "@/assets/icons/noun-house";
import ThemedText from "@/components/atoms/ThemedText";
import ThemedView from "@/components/atoms/ThemedView";
import { Colors } from "@/constants/Colors";

import { StyleSheet, View } from "react-native";

export default function Categories() {
  return (
    <View style={styles.container}>
      <ThemedText>خدمات</ThemedText>
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
      <ThemedText>{title}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  flexRow: {
    flexDirection: "row",
  },
});
