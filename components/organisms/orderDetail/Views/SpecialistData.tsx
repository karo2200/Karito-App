import StarRating from "@/components/atoms/StartRating";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { ServiceRequestStatus } from "@/generated/graphql";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fragment, memo, useRef } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import useOrderDetailHook from "../hooks/OrderDetail.hook";

const { height } = Dimensions.get("screen");

const SpecialistData = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const { serviceData, onRatePress, ratePending, setRate } =
    useOrderDetailHook();

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
          <ThemedText
            fontType="bold"
            onPress={() => {
              if (serviceData?.status === ServiceRequestStatus.Paid) {
                openActionSheet();
              }
            }}
          >
            {serviceData?.specialist?.firstName}{" "}
            {serviceData?.specialist?.lastName}
          </ThemedText>
          <ThemedText fontType="bold" style={styles.works}>
            ۹۰۳ سرویس موفق
          </ThemedText>
        </View>
        <Image
          source={{ uri: serviceData?.specialist?.profileImageUrl }}
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
            {serviceData?.specialist?.firstName}{" "}
            {serviceData?.specialist?.lastName}
          </ThemedText>
          <Image
            style={styles.image}
            source={{ uri: serviceData?.specialist?.profileImageUrl }}
          />
          <StarRating onChange={(r) => setRate(r)} />
          <ThemedButton
            isLoading={ratePending}
            onPress={() => onRatePress(closeActionSheet)}
            title="ثبت امتیاز"
          />
        </View>
      </ActionSheet>
    </Fragment>
  );
};

export default memo(SpecialistData);

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

  contentView: {
    paddingHorizontal: 15,
    alignItems: "center",
    paddingBottom: 20,
  },

  textBtn: {
    fontWeight: "400",
    color: "white",
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
