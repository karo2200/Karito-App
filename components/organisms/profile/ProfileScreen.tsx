import EditIcon from "@/assets/icons/Edit";
import EmptyProfileIcon from "@/assets/icons/EmptyProfile";
import LocationIcon from "@/assets/icons/Location";
import PercentIcon from "@/assets/icons/Percent";
import CustomImage from "@/components/atoms/CustomImage";
import ThemedText from "@/components/atoms/ThemedText";
import GuestMode from "@/components/molecules/GuestMode";
import LogOutActionSheet from "@/components/molecules/LogOutActionSheet";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { CallCalling } from "iconsax-react-native";
import * as React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomerEditProfileSheet from "./Views/CustomerEditProfileSheet";
import useProfileHook from "./hooks/Profile.hook";

export default function ProfileScreen() {
  const {
    exitVisible,
    setExitVisible,
    isExpert,
    onCallPress,
    setIsExpert,
    router,
    userData,
    isLoggedIn,
    setIsLoggedIn,
    editVisible,
    setEditVisible,
    setAccessToken,
    setRefreshToken,
  } = useProfileHook();

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View style={styles.flex1}>
          <View style={styles.headerContainer}>
            {userData?.profileImageUrl ? (
              <CustomImage
                src={userData?.profileImageUrl}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <EmptyProfileIcon />
            )}
            <View style={{ flex: 1, paddingHorizontal: 8 }}>
              <ThemedText
                fontType="bold"
                style={{ color: Colors.semiBlack, fontWeight: "600" }}
              >
                {userData?.firstName
                  ? `${userData?.firstName} ${userData?.lastName}`
                  : "کاربر کاریتو"}
              </ThemedText>
              <ThemedText fontType="bold" style={styles.number}>
                {userData?.phoneNumber}
              </ThemedText>
              {isExpert && (
                <ThemedText fontType="bold" style={styles.number}>
                  {userData?.serviceSubCategory?.name}
                </ThemedText>
              )}
            </View>
            <EditIcon
              onPress={() => {
                if (isExpert) {
                  router.push("/profile/editProfile");
                } else {
                  setEditVisible(true);
                }
              }}
            />
          </View>

          {isExpert && (
            <View style={styles.rowView2}>
              <View style={styles.labelContainer}>
                <ThemedText type="text" style={{ color: Colors.label }}>
                  ماموریت موفق
                </ThemedText>
                <ThemedText fontType="bold" style={{ color: Colors.hint500 }}>
                  {userData?.successfulMissions}
                </ThemedText>
              </View>
              <View style={styles.labelContainer}>
                <ThemedText type="text" style={{ color: Colors.label }}>
                  روز در کاریتو
                </ThemedText>
                <ThemedText fontType="bold" style={{ color: Colors.hint500 }}>
                  {userData?.daysRegistered}
                </ThemedText>
              </View>
            </View>
          )}
          {!isExpert ? (
            <>
              <List
                title="مدیریت آدرس‌ها"
                icon={<LocationIcon />}
                onPress={() => {
                  router.push("/profile/address");
                }}
              />
              <List
                title="تخفیف‌ها"
                icon={<PercentIcon />}
                onPress={() => {
                  router.push("/profile/offers");
                }}
              />
            </>
          ) : (
            <List
              title="تماس با پشتیبانی"
              icon={<CallCalling color={"black"} size={20} />}
              onPress={() => {
                onCallPress();
              }}
            />
          )}
          <Pressable
            style={styles.rowView}
            onPress={() => setExitVisible(true)}
          >
            <Ionicons
              name="log-out-outline"
              size={24}
              color={Colors.danger600}
            />
            <ThemedText
              fontType="bold"
              style={{ color: Colors.danger600, marginRight: 4 }}
            >
              خروج از حساب کاربری
            </ThemedText>
          </Pressable>
        </View>
      ) : (
        <GuestMode />
      )}
      {isLoggedIn && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.payment}
          onPress={() => {
            setIsExpert(isExpert ? false : true);
            setIsLoggedIn(false);
            setAccessToken("");
            setRefreshToken("");
          }}
        >
          <ThemedText fontType="bold" style={styles.textBtn}>
            ورود به عنوان {isExpert ? "مشتری" : "متخصص"}
          </ThemedText>
          <Ionicons name="log-in-outline" size={24} color={Colors.hint500} />
        </TouchableOpacity>
      )}
      <LogOutActionSheet
        visible={exitVisible}
        onClose={() => setExitVisible(false)}
      />
      <CustomerEditProfileSheet
        visible={editVisible}
        onClose={() => setEditVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },

  textBtn: {
    color: Colors.hint500,
    marginRight: 6,
  },

  payment: {
    borderColor: Colors.hint500,
    borderWidth: 1,
    paddingVertical: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 4,
    flexDirection: "row",
    marginBottom: 44,
  },

  rowView: {
    flexDirection: "row-reverse",
    paddingVertical: 18,
  },

  rowView2: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 35,
    justifyContent: "space-between",
  },

  listContainer: {
    flexDirection: "row-reverse",
    paddingVertical: 16,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Colors.grayMedium,
    borderBottomWidth: 1,
  },

  headerContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray50,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 24,
  },

  number: {
    color: Colors.semiBlack,
    fontWeight: "600",
    marginTop: 8,
  },

  labelContainer: {
    borderWidth: 1,
    borderColor: Colors.grayMedium,
    borderRadius: 12,
    padding: 4,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    paddingVertical: 8,
  },

  container: {
    paddingHorizontal: 15,
    flex: 1,
  },

  image: {
    width: 64,
    height: 64,
    borderRadius: 64,
  },
});

const List = ({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: any;
  onPress: () => void;
}) => {
  return (
    <View>
      <Pressable style={styles.listContainer} onPress={onPress}>
        {icon}
        <ThemedText
          fontType="bold"
          style={{
            color: Colors.label,
            marginRight: 4,
            flex: 1,
            fontWeight: "600",
          }}
        >
          {title}
        </ThemedText>
        <Ionicons name="chevron-back" color={Colors.label} size={16} />
      </Pressable>
    </View>
  );
};
