import StarRating from "@/components/atoms/StartRating";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fragment, useRef } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

const { height } = Dimensions.get("screen");

export default function SpecialistData() {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  return (
    <Fragment>
      <View style={styles.rowView}>
        <View>
          <ThemedText fontType="bold" onPress={openActionSheet}>
            موسی مرادیان
          </ThemedText>
          <ThemedText fontType="bold" style={styles.works}>
            ۹۰۳ سرویس موفق
          </ThemedText>
        </View>
        <Image
          source={require("../../../../assets/images/Home-Banner.png")}
          style={styles.image2}
        />
      </View>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{ minHeight: height / 2.5 }}
      >
        <View style={styles.header}>
          <Ionicons
            name="close"
            size={24}
            color={Colors.mediumGray}
            onPress={() => closeActionSheet()}
          />
          <ThemedText fontType="bold" type="defaultSemiBold">
            ثبت نظر
          </ThemedText>
        </View>

        <View style={styles.contentView}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            لطفا امتیاز خود را نسبت به متخصص خود انتخاب کنید.
          </ThemedText>
          <ThemedText fontType="bold" style={styles.userNamee}>
            موسی مرادیان
          </ThemedText>
          <Image
            style={styles.image}
            source={require("../../../../assets/images/Home-Banner.png")}
          />
          <StarRating />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.payment}
            onPress={() => closeActionSheet()}
          >
            <ThemedText type="defaultSemiBold" style={styles.textBtn}>
              ثبت امتیاز
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  title: {
    fontWeight: "400",
    marginVertical: 32,
    alignSelf: "flex-end",
  },

  contentView: { paddingHorizontal: 15, alignItems: "center" },

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
    bottom: 24,
    borderRadius: 4,
    marginTop: 24,
  },

  userNamee: {
    alignSelf: "center",
  },

  image: {
    width: 64,
    height: 64,
    borderRadius: 64,
    alignSelf: "center",
    marginTop: 24,
  },

  image2: {
    width: 64,
    height: 64,
    borderRadius: 64,
    alignSelf: "center",
    marginLeft: 5,
  },

  rowView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  works: {
    color: Colors.gray400,
    marginTop: 8,
  },
});
