import CloseIcon from "@/assets/icons/Close";
import TickIcon from "@/assets/icons/tick";
import Breadcrumb from "@/components/atoms/Breadcrumb";
import Divider from "@/components/atoms/Divider";
import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedContainer from "@/components/atoms/ThemedContainer";
import ThemedText from "@/components/atoms/ThemedText";
import { useToast } from "@/components/atoms/Toast";
import LocationActionSheet from "@/components/molecules/LocationActionSheet";
import PaymentWaitingSheet from "@/components/molecules/PaymentWaitingSheet";
import { Colors } from "@/constants/Colors";
import { CallCalling } from "iconsax-react-native";
import * as React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import useOrderDetailHook from "./hooks/OrderDetail.hook";
import FinishWorkSheet from "./Views/FinishWorkSheet";
import SpecialistData from "./Views/SpecialistData";

export default function OrderDetailScreen() {
  const { showToast } = useToast();

  const {
    onBillPress,
    setFinishWorkVisible,
    finishWorkVisible,
    isDone,
    isExpert,
    makeCall,
    setFoundLocationVisible,
    foundLocationVisible,
    specialistFinishWorkVisible,
    setSpecialistFinishWorkVisible,
  } = useOrderDetailHook();

  const handleSuccess = () => {
    showToast({
      message: "عملیات با موفقیت انجام شد",
      type: "success",
      title: "تبریک!",
    });
  };

  return (
    <ThemedContainer style={{ paddingHorizontal: 15 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {!isExpert ? (
          <Breadcrumb
            items={[
              { label: "سفارش‌های من", href: "/order" },
              { label: "سفارش‌های جاری", href: "/order" },
              { label: "تعمیر و سرویس کولر آبی" },
            ]}
          />
        ) : (
          <ScreenNameWithBack title="سرمایش و گرمایش (تعمیر و سرویس کولر آبی)" />
        )}
        {!isExpert && (
          <React.Fragment>
            <ThemedText fontType="bold" style={{ marginTop: 4 }}>
              سرمایش و گرمایش (تعمیر و سرویس کولر آبی)
            </ThemedText>
            <View style={styles.label}>
              <ThemedText type="text">ثبت شده</ThemedText>
            </View>
          </React.Fragment>
        )}
        <View style={styles.rowView}>
          <ThemedText fontType="bold" style={{ color: Colors.hint500 }}>
            1,200,000 تومان
          </ThemedText>
          <ThemedText fontType="bold" style={{ color: Colors.gray500 }}>
            {!isExpert ? "هزینه" : "دستمزد"}
          </ThemedText>
        </View>
        <View style={styles.rowView}>
          <ThemedText type="text" style={{ color: Colors.hint500 }}>
            1404/03/15 چهارشنبه ساعت 17:00
          </ThemedText>
          <ThemedText fontType="bold" style={{ color: Colors.gray500 }}>
            زمان
          </ThemedText>
        </View>
        {!isExpert && (
          <View style={[styles.rowView2, isDone && { paddingRight: 0 }]}>
            <Pressable onPress={handleSuccess}>
              <ThemedText style={{ color: Colors.darkError }}>
                لغو سفارش
              </ThemedText>
            </Pressable>
            {isDone ? (
              <SpecialistData />
            ) : (
              <ThemedText fontType="bold" style={{ color: "black" }}>
                در انتظار تایید متخصص...
              </ThemedText>
            )}
          </View>
        )}
        {isExpert && <Divider height={16} />}
        <ThemedText fontType="bold" style={{ color: "black" }}>
          جزئیات
        </ThemedText>
        <View style={styles.rowView}>
          <ThemedText type="text" style={{ color: Colors.label }}>
            سرویس دوره ای
          </ThemedText>
          <ThemedText type="text" style={{ color: Colors.gray500 }}>
            خدمت درخواستی
          </ThemedText>
        </View>
        <View style={styles.rowView}>
          <ThemedText type="text" style={styles.address} numberOfLines={2}>
            تهران، خیابان ولیعصر، نرسیده به اسفندیاری، بعد از کوچه ناصری، برج
            کیان، طبقه ۸
          </ThemedText>
          <ThemedText type="text" style={{ color: Colors.gray500 }}>
            {!isExpert ? "آدرس" : "آدرس دقیق"}
          </ThemedText>
        </View>
        <View style={styles.rowView}>
          {!isExpert ? (
            <React.Fragment>
              <ThemedText type="text" style={{ color: Colors.label }}>
                1
              </ThemedText>
              <ThemedText type="text" style={{ color: Colors.gray500 }}>
                تعداد سرویس
              </ThemedText>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ThemedText type="text" style={styles.address}>
                کولر مدل ال‌جی هست، صدای زیاد می‌ده و خوب خنک نمی‌کنه. واحد طبقه
                سوم بدون آسانسوره. لطفاً ابزار کامل بیارید.
              </ThemedText>
              <ThemedText type="text" style={{ color: Colors.gray500 }}>
                توضیحات
              </ThemedText>
            </React.Fragment>
          )}
        </View>
        {isExpert && (
          <View>
            <Divider height={16} />
            <ThemedText fontType="bold" style={{ color: "black" }}>
              اطلاعات مشتری
            </ThemedText>
            <View style={styles.rowView}>
              <ThemedText type="text" style={{ color: Colors.label }}>
                موسی علیپور
              </ThemedText>
              <ThemedText type="text" style={{ color: Colors.gray500 }}>
                نام مشتری
              </ThemedText>
            </View>
            <View style={styles.rowView}>
              <View style={styles.simpleRow}>
                <CallCalling color={Colors.hint500} size={20} />
                <ThemedText
                  type="text"
                  style={styles.phone}
                  onPress={() => makeCall("09192341234")}
                >
                  ۰۹۱۲-۳۲۶۷۸۹۸
                </ThemedText>
              </View>

              <ThemedText type="text" style={{ color: Colors.gray500 }}>
                شماره تماس
              </ThemedText>
            </View>
          </View>
        )}
      </ScrollView>
      {!isExpert ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.payment}
          onPress={() => onBillPress()}
        >
          <ThemedText type="defaultSemiBold" style={styles.textBtn}>
            مشاهده صورت حساب
          </ThemedText>
        </TouchableOpacity>
      ) : (
        <View style={styles.actionFooter}>
          <ThemedButton
            title="قبول کار"
            style={styles.btn}
            rightIcon={<TickIcon style={{ marginLeft: 8 }} />}
            onPress={() => setSpecialistFinishWorkVisible(true)}
          />
          <ThemedButton
            title="رد کار"
            type="outline"
            style={styles.btn}
            rightIcon={<CloseIcon style={{ marginLeft: 8 }} />}
            onPress={() => setFoundLocationVisible(true)}
          />
        </View>
      )}
      <FinishWorkSheet
        visible={finishWorkVisible}
        setVisible={() => setFinishWorkVisible(false)}
      />
      <LocationActionSheet
        visible={foundLocationVisible}
        onClose={() => setFoundLocationVisible(false)}
      />
      <PaymentWaitingSheet
        visible={specialistFinishWorkVisible}
        onClose={() => setSpecialistFinishWorkVisible(false)}
      />
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.grayMedium,
    borderRadius: 4,
    alignSelf: "flex-end",
    marginVertical: 12,
  },

  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomColor: Colors.grayMedium,
    borderBottomWidth: 1,
  },

  rowView2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 14,
  },

  address: { color: Colors.label, width: "80%" },

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
  },

  simpleRow: { flexDirection: "row", justifyContent: "center" },

  phone: {
    color: Colors.hint500,
    marginLeft: 5,
    textDecorationLine: "underline",
  },

  actionFooter: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingVertical: 16,
  },

  btn: { width: "48%" },
});
