import CosmeticsIcon from "@/assets/icons/Cosmetics";
import NounHouseIcon from "@/assets/icons/noun-house";
import ThemedText from "@/components/atoms/ThemedText";
import ThemedView from "@/components/atoms/ThemedView";
import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import { ComponentType } from "react";

import ApplianceIcon from "@/assets/icons/Appliance";
import CarIcon from "@/assets/icons/Car";
import HospitalIcon from "@/assets/icons/Hospital";
import HouseOnWheelsIcon from "@/assets/icons/House-On-Wheels";
import { ServiceCategoryDto } from "@/generated/graphql";
import { Image, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import useHomeHook from "../hooks/Home.hook";

export default function Categories() {
  const { homeCategoryData } = useHomeHook();

  return (
    <View style={styles.container}>
      <ThemedText fontType="bold" style={styles.title}>
        خدمات
      </ThemedText>
      <View style={styles.flexRow}>
        <HeaderItem
          item={homeCategoryData?.[0]}
          Icon={() => <NounHouseIcon />}
          title={"تمیزکاری و نظافت"}
          style={{ width: 171 }}
        />
        <HeaderItem
          item={homeCategoryData?.[1]}
          Icon={() => <CosmeticsIcon />}
          title={"سلامت و زیبایی"}
          style={{ width: 171 }}
        />
      </View>
      {homeCategoryData?.length > 2 && (
        <View style={styles.flexRow}>
          <HeaderItem
            Icon={() => <CarIcon />}
            title={"خودرو"}
            item={homeCategoryData?.[2]}
          />
          <HeaderItem
            Icon={() => <ApplianceIcon />}
            title={"تعمیرات"}
            item={homeCategoryData?.[3]}
          />
          <HeaderItem
            Icon={() => <HouseOnWheelsIcon />}
            title={"حمل بار"}
            item={homeCategoryData?.[4]}
          />
          <HeaderItem
            Icon={() => <HospitalIcon />}
            title={"سایر خدمات"}
            item={homeCategoryData?.[5]}
          />
        </View>
      )}
    </View>
  );
}

function HeaderItem({
  item,
  Icon,
  title,
  style,
}: {
  item: ServiceCategoryDto;
  Icon: ComponentType;
  title: string;
  style?: ViewStyle;
}) {
  return (
    <Pressable style={{ alignItems: "center" }}>
      <ThemedView style={[styles.imageContainer, style]}>
        {/* <Icon /> */}
        <Image
          source={{ uri: item?.logo }}
          style={styles.logo}
          resizeMode="contain"
        />
      </ThemedView>
      <ThemedText type="text" style={styles.text}>
        {item?.name}
      </ThemedText>
    </Pressable>
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

  logo: { width: 33, height: 33, alignSelf: "center" },

  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.hint50,
  },
});
