import React from "react";

import DropDownPicker from "@/components/atoms/DropDownPicker";
import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedInput from "@/components/atoms/ThemedInput";
import ThemedText from "@/components/atoms/ThemedText";
import UploadImage from "@/components/atoms/UploadImage";
import { days, monthsName } from "@/constants/StaticData";
import useUserStore from "@/stores/loginStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRoute } from "@react-navigation/native";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    // .length(50, "تعداد کارکترها بیش از حد مجاز است.")
    .required("نام خود را وارد کنید."),
  family: yup
    .string()
    // .length(50, "تعداد کارکترها بیش از حد مجاز است.")
    .required("نام خانوادگی خود را وارد کنید."),
  code: yup
    .string()
    .length(10, "کد ملی بدرستی وارد نشده است")
    .required("لطفا کد ملی خود را وارد کنید"),
  codeImage: yup.string(),
  year: yup.string(),
  month: yup.string(),
  day: yup.string(),
  profilePhoto: yup.string(),
});

const PersonalInfo = () => {
  const { params } = useRoute();

  const { setIsLoggedIn } = useUserStore();

  const { ...methods } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: { code: "1232222222" },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = methods;

  const onPress = (formData: any) => {
    setIsLoggedIn(true);
  };

  return (
    <FormProvider {...methods}>
      <ScreenNameWithBack title="اطلاعات شخصی" />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          <ThemedInput
            label="نام*"
            {...register("name")}
            placeholder="نام"
            maxLength={50}
          />
          <ThemedInput
            label="نام خانوادگی*"
            {...register("family")}
            placeholder="نام خانوادگی*"
            maxLength={50}
            style={styles.margin}
          />
          <ThemedText style={styles.birthdate}>تاریخ تولد</ThemedText>
          <View style={styles.rowView}>
            <ThemedInput
              {...register("year")}
              placeholder="سال"
              keyboardType="numeric"
              maxLength={4}
              style={{ width: "40%" }}
            />

            <DropDownPicker
              {...register("month")}
              label="ماه"
              data={monthsName}
              width={"33%"}
              right={"9%"}
            />

            <DropDownPicker
              {...register("day")}
              label="روز"
              data={days}
              width={"20%"}
              right={"36%"}
            />
          </View>

          <UploadImage
            name="profilePhoto"
            control={control}
            label="عکس پروفایل"
            description="یک عکس برای پروفایل خود انتخاب کنید."
          />
          <ThemedInput
            label="کد ملی*"
            {...register("code")}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            keyboardType="numeric"
            maxLength={10}
            readOnly={true}
          />
          <UploadImage name="codeImage" control={control} />

          <UploadImage
            name="profilePhoto"
            control={control}
            label="عکس کارت ملی"
            description="عکس کارت ملی خود را بارگذاری کنید."
          />
        </ScrollView>
        <View style={styles.button}>
          <ThemedButton
            title="ثبت"
            onPress={handleSubmit(onPress)}
            fontType="bold"
          />
        </View>
      </View>
    </FormProvider>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  button: {
    position: "relative",
    backgroundColor: "white",
    paddingTop: 5,
    paddingBottom: 40,
  },

  form: {
    width: "100%",
    flexGrow: 1,
    paddingBottom: 100,
  },

  margin: { marginTop: 32 },

  rowView: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },

  birthdate: {
    marginBottom: 8,
    fontSize: 16,
    marginTop: 32,
  },
});
