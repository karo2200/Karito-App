import BankCardIcon from "@/assets/icons/BankCard";
import CloseIcon from "@/assets/icons/Close";
import TomanIcon from "@/assets/icons/Toman";
import { RadioButton } from "@/components/atoms/RadioButton";
import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { FontStyle } from "@/constants/Fonts";
import { formatPrice } from "@/services/ParseData";
import * as React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import usePaymentHook from "./hooks/Payment.hook";

export default function PaymentScreen() {
  const {
    isLoading,
    serviceData,
    discountCode,
    setDiscountCode,
    onHandleDisCountCode,
    disCountLoading,
    paymentLoading,
    onPayPress,
    removeLoading,
    onRemoveCode,
    isSetCode,
  } = usePaymentHook();

  if (isLoading) {
    return <ActivityIndicator style={styles.indicator} />;
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 100 }}
      >
        <ScreenNameWithBack title="پرداخت سفارش" />
        <ThemedText style={{ marginTop: 8 }}>
          شیوۀ پرداخت خود را انتخاب کنید.
        </ThemedText>
        <PaymentTypeCard
          image={<BankCardIcon />}
          title="کارت بانکی"
          description="تمام کارت‌های عضو شتاب"
        />
        {/* <PaymentTypeCard
          image={<SnappPayIcon />}
          title="پرداخت قسطی با اسنپ‌پی"
          description="۴ قسط، ماهانه ۲۰۰.۰۰۰ تومان، بدون کارمزد"
        />
        <PaymentTypeCard
          image={<TaraPayIcon />}
          title="پرداخت با اعتبار تارا"
        /> */}
        <View style={styles.rowView2}>
          <TextInput
            style={styles.input}
            value={discountCode}
            onChangeText={(t) => setDiscountCode(t)}
            placeholder="کد تخفیف را اینجا وارد کنید"
            textAlign="right"
            placeholderTextColor={Colors.mediumGray}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.offerBtn,
              discountCode && { borderColor: Colors.hint500 },
            ]}
            disabled={!discountCode}
            onPress={isSetCode ? onRemoveCode : onHandleDisCountCode}
          >
            {disCountLoading || removeLoading ? (
              <ActivityIndicator />
            ) : isSetCode ? (
              <CloseIcon fill={Colors.hint500} />
            ) : (
              <ThemedText
                fontType="bold"
                style={[
                  styles.offerText,
                  discountCode && { color: Colors.hint500 },
                ]}
              >
                بررسی کد
              </ThemedText>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.priceView}>
          {/* <View style={styles.flexRow2Space}>
            <ThemedText type="text" style={{ color: Colors.gray500 }}>
              ایاب ذهاب
            </ThemedText>
            <View style={styles.flexRow2}>
              <ThemedText
                type="text"
                style={{ color: Colors.darkGray, marginLeft: 8 }}
              >
                ۸۷۳.۰۰۰
              </ThemedText>
              <TomanIcon color={Colors.darkGray} height={13} width={13} />
            </View>
          </View> */}
          <View style={styles.flexRow2Space}>
            <ThemedText type="text" style={{ color: Colors.iconGreen }}>
              کد تخفیف
            </ThemedText>
            <View style={styles.flexRow2}>
              <ThemedText
                type="text"
                style={{ color: Colors.iconGreen, marginLeft: 8 }}
              >
                {serviceData?.discountAmount}
              </ThemedText>
              <TomanIcon color={Colors.iconGreen} height={13} width={13} />
            </View>
          </View>
          <View style={styles.flexRow2Space}>
            <ThemedText type="text" style={{ color: Colors.gray500 }}>
              هزینه طی شده
            </ThemedText>
            <View style={styles.flexRow2}>
              <ThemedText
                type="text"
                style={{ color: Colors.darkGray, marginLeft: 8 }}
              >
                {formatPrice(serviceData?.basePrice)}
              </ThemedText>
              <TomanIcon color={Colors.darkGray} height={13} width={13} />
            </View>
          </View>
          {/* <View style={styles.flexRow2Space}>
            <ThemedText type="text" style={{ color: Colors.gray500 }}>
              هزینه اضافه شده
            </ThemedText>
            <View style={styles.flexRow2}>
              <ThemedText
                type="text"
                style={{ color: Colors.darkGray, marginLeft: 8 }}
              >
                ۸۷۳.۰۰۰
              </ThemedText>
              <TomanIcon color={Colors.darkGray} height={13} width={13} />
            </View>
          </View> */}
          <View
            style={[
              styles.flexRow2Space,
              {
                borderTopWidth: 1,
                borderTopColor: Colors.grayLight,
                paddingTop: 8,
                marginBottom: 0,
              },
            ]}
          >
            <ThemedText style={{ color: Colors.semiBlack }}>
              مبلغ قابل پرداخت
            </ThemedText>
            <View style={styles.flexRow2}>
              <ThemedText style={{ color: Colors.semiBlack, marginLeft: 8 }}>
                {formatPrice(serviceData?.finalPrice)}
              </ThemedText>
              <TomanIcon color={Colors.semiBlack} height={16} width={16} />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={{ width: "48%", alignItems: "center" }}>
          <ThemedText style={{ color: Colors.mediumGray }}>
            جمع پرداختی
          </ThemedText>
          <View style={styles.flexRow}>
            <TomanIcon />
            <ThemedText type="defaultSemiBold" style={styles.footerText}>
              {formatPrice(serviceData?.finalPrice)}
            </ThemedText>
          </View>
        </View>
        <ThemedButton
          title="پرداخت"
          fontType="bold"
          isLoading={paymentLoading}
          style={styles.payment}
          onPress={() => onPayPress()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomColor: Colors.grayMedium,
    borderBottomWidth: 1,
  },

  rowView2: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 64,
    marginBottom: 36,
  },

  textBtn: {
    fontWeight: "400",
    color: "white",
  },

  payment: {
    width: "48%",
    marginLeft: 16,
  },

  flex1: {
    flex: 1,
    alignItems: "flex-end",
    marginHorizontal: 8,
  },

  desc: {
    marginTop: 4,
    color: Colors.mediumGray,
  },

  offerBtn: {
    borderWidth: 1,
    borderColor: Colors.hint100,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  offerText: {
    color: Colors.hint100,
  },

  input: {
    height: 40,
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    padding: 8,
    flex: 1,
    marginLeft: 8,
    fontFamily: FontStyle.regular,
  },

  priceView: {
    backgroundColor: Colors.solid50,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grayLight,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.grayLight,
    backgroundColor: Colors.solid50,
    paddingBottom: 30,
  },

  footerText: { color: Colors.semiBlack, marginLeft: 4 },

  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },

  flexRow2: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },

  flexRow2Space: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  indicator: { alignSelf: "center", flex: 1 },
});

const PaymentTypeCard = ({
  image,
  title,
  description,
}: {
  image: React.ReactNode;
  title: string;
  description?: string;
}) => (
  <View style={styles.rowView}>
    {image}
    <View style={styles.flex1}>
      <ThemedText style={{ color: Colors.semiBlack }}>{title}</ThemedText>
      {description && (
        <ThemedText type="text" style={styles.desc}>
          {description}
        </ThemedText>
      )}
    </View>
    <RadioButton selected={true} onPress={() => {}} />
  </View>
);
