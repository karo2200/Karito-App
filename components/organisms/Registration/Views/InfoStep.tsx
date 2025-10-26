import React from "react";

import Divider from "@/components/atoms/Divider";
import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { VerificationStatus } from "@/generated/graphql";
import { StyleSheet, View } from "react-native";
import useExpertHook from "../hooks/Expert.hook";

const InfoStep = ({ onPrevPress }: { onPrevPress: () => void }) => {
  const { router, profileData, isLoggedIn } = useExpertHook();

  return (
    <View>
      <ScreenNameWithBack title="تکمیل اطلاعات" onBackPress={onPrevPress} />
      <View style={styles.form}>
        <Divider height={14} />
        <InfoList
          title={"اطلاعات شخصی"}
          onPress={() => {
            router.push(
              isLoggedIn
                ? "/(expertTabs)/profile/PersonalInfoPage"
                : "/PersonalInfoPage"
            );
          }}
          isVerified={
            profileData?.idCardVerificationStatus ===
            VerificationStatus.Approved
          }
          isReject={
            profileData?.idCardVerificationStatus ===
            VerificationStatus.Rejected
          }
          isLoggedIn={isLoggedIn}
        />
        <InfoList
          title={"مدارک"}
          onPress={() => {
            router.push(
              isLoggedIn
                ? "/(expertTabs)/profile/CertificateInfoPage"
                : "/CertificateInfoPage"
            );
          }}
          isLoggedIn={isLoggedIn}
          isVerified={
            profileData?.specializedDocumentsVerificationStatus ===
            VerificationStatus.Approved
          }
          isReject={
            profileData?.specializedDocumentsVerificationStatus ===
            VerificationStatus.Rejected
          }
        />
        {!isLoggedIn && (
          <InfoList
            title={"احراز هویت"}
            onPress={() => {
              router.push("/VerificationStepPage");
            }}
            isVerified={
              profileData?.identityVerificationVideoStatus ===
              VerificationStatus.Approved
            }
            isReject={
              profileData?.identityVerificationVideoStatus ===
              VerificationStatus.Rejected
            }
          />
        )}
      </View>
    </View>
  );
};

export default InfoStep;

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },

  container: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.grayMedium,
    padding: 12,
    marginVertical: 10,
    flexDirection: "column",
    minHeight: 88,
    width: "100%",
    justifyContent: "center",
  },

  rowView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 12,
  },

  label: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.mediumGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  btn: {
    maxWidth: "25%",
    borderRadius: 6,
    height: 32,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});

const InfoList = ({
  title,
  onPress,
  isVerified,
  isReject,
  isLoggedIn,
}: {
  isVerified: boolean;
  isReject: boolean;
  title: string;
  onPress: () => void;
  isLoggedIn?: boolean;
}) => {
  return (
    <View style={styles.container}>
      <ThemedText fontType="medium" style={{ color: "black" }}>
        {title}
      </ThemedText>

      <View style={styles.rowView}>
        <ThemedButton
          title={isLoggedIn ? "ویرایش" : "تکمیل"}
          style={styles.btn}
          onPress={onPress}
        />
        <View
          style={[
            styles.label,
            isVerified && { borderColor: Colors.borderGreen },
            isReject && { borderColor: Colors.danger600 },
          ]}
        >
          <ThemedText
            type="text"
            style={{
              color: isVerified
                ? Colors.titleGreen
                : isReject
                  ? Colors.danger500
                  : Colors.darkGray,
            }}
          >
            {isVerified ? "تایید شده" : isReject ? "رد شده" : "در انتظار تایید"}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};
