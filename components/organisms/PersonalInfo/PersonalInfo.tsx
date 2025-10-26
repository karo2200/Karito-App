import React, { useEffect } from "react";

import DropDownPicker from "@/components/atoms/DropDownPicker";
import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedInput from "@/components/atoms/ThemedInput";
import ThemedText from "@/components/atoms/ThemedText";
import UploadImage from "@/components/atoms/UploadImage";
import { days, monthsName } from "@/constants/StaticData";
import { VerificationStatus } from "@/generated/graphql";
import { parseDate } from "@/services/ParseData";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import * as yup from "yup";
import usePersonalInfoHook from "./hooks/PersonalInfo.hook";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("نام خود را وارد کنید.")
    .matches(/^[\u0600-\u06FF\s]+$/, "لطفاً فقط حروف فارسی وارد کنید."),
  family: yup
    .string()
    .required("نام خانوادگی خود را وارد کنید.")
    .matches(/^[\u0600-\u06FF\s]+$/, "لطفاً فقط حروف فارسی وارد کنید."),
  code: yup
    .string()
    .length(10, "کد ملی بدرستی وارد نشده است")
    .required("لطفا کد ملی خود را وارد کنید"),
  codeImage: yup.string().required(""),
  year: yup.string().matches(/^[0-9]+$/, "لطفا فقط اعداد انگلیسی وارد کنید"),
  month: yup.string(),
  day: yup.string(),
  profilePhoto: yup.string(),
});

const PersonalInfo = () => {
  const {
    personalInfoPending,
    onRegistrationPress,
    nationalCode,
    profileData,
  } = usePersonalInfoHook();

  const { ...methods } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
  } = methods;

  useEffect(() => {
    (setValue("name", profileData?.firstName as string),
      setValue("family", profileData?.lastName as string),
      setValue("codeImage", profileData?.idCardImageUrl as string),
      setValue(
        "year",
        profileData?.birthDate &&
          profileData?.birthDate != "0001-01-01T00:00:00.000Z"
          ? parseDate(profileData?.birthDate)?.year
          : ""
      ),
      setValue(
        "day",
        profileData?.birthDate ? parseDate(profileData?.birthDate)?.day : "1"
      ),
      setValue(
        "month",
        profileData?.birthDate ? parseDate(profileData?.birthDate)?.month : "1"
      ),
      setValue("profilePhoto", profileData?.profileImageUrl as string),
      setValue(
        "code",
        nationalCode?.length > 0
          ? nationalCode.toString()
          : profileData?.nationalCode?.toString()
      ));
  }, [nationalCode, profileData]);

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
              forcePersianNumbers
            />

            <DropDownPicker
              {...register("month")}
              label="ماه"
              data={monthsName}
              width={"33%"}
              right={Platform.OS === "web" ? "40%" : "9%"}
            />

            <DropDownPicker
              {...register("day")}
              label="روز"
              data={days}
              width={"23%"}
              right={Platform.OS === "web" ? "75%" : "36%"}
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
            forcePersianNumbers
          />

          {profileData?.idCardVerificationStatus !==
            VerificationStatus.Approved && (
            <UploadImage
              name="codeImage"
              control={control}
              label="عکس کارت ملی"
              description="عکس کارت ملی خود را بارگذاری کنید."
            />
          )}
        </ScrollView>
        <View style={styles.button}>
          <ThemedButton
            title="ثبت"
            isLoading={personalInfoPending}
            onPress={handleSubmit(onRegistrationPress)}
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
