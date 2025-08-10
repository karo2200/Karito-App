import { ThemedText } from "@/components";
import { ToastProvider } from "@/components/atoms/Toast";
import { Colors } from "@/constants/Colors";
import useLoadFonts, { FontType } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Tabs, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { I18nManager, View } from "react-native";
import "react-native-reanimated";
export default function RootLayout() {
  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    }
  }, []);

  const segments = useSegments();
  const hideTabBar =
    segments[1] === "order" &&
    (segments[2] === "payment" || segments[2] === "paymentStatus");

  const fontsLoaded = useLoadFonts();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#ffffff",
    },
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ToastProvider>
      <ThemeProvider value={MyTheme}>
        <Tabs
          initialRouteName="home/index"
          screenOptions={({ route }) => ({
            headerShown: true,
            headerRight: () => <RightIcon />,
            // headerStatusBarHeight: 25,
            tabBarSafeAreaInset: { bottom: "never" },
            tabBarStyle: hideTabBar
              ? { display: "none" }
              : {
                  backgroundColor: "white",
                  borderTopWidth: 0,
                  height: 84,
                  borderTopRightRadius: 30,
                  borderTopLeftRadius: 30,
                  shadowColor: "#000",
                  shadowOpacity: 0.3,
                  shadowOffset: { width: 0, height: 5 },
                  shadowRadius: 10,
                  elevation: 5,
                },
            tabBarActiveTintColor: Colors.hint500,
            tabBarInactiveTintColor: Colors.mediumGray,
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: FontType.YekanBakhRegular,
              marginTop: 4,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = "ios-home";

              // if (route.name === "home") {
              //   iconName = "ios-home";
              // } else if (route.name === "explore") {
              //   iconName = "ios-search";
              // } else {
              //   iconName = "ios-information-circle";
              // }

              return (
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      height: 4,
                      width: 43,
                      backgroundColor: focused ? Colors.hint500 : "transparent",
                      borderBottomLeftRadius: 2,
                      borderBottomRightRadius: 2,
                      marginBottom: 6,
                      marginTop: 8,
                    }}
                  />

                  <Ionicons
                    name={"documents"}
                    size={24}
                    color={focused ? Colors.hint500 : Colors.mediumGray}
                    style={{ marginBottom: 5 }}
                  />
                </View>
              );
            },
          })}
        >
          <Tabs.Screen
            name="profile"
            options={{
              title: "",
              tabBarLabel: "پروفایل",
            }}
          />
          <Tabs.Screen
            name="order"
            options={{
              title: "",
              tabBarLabel: "سفارش‌های من",
            }}
          />
          <Tabs.Screen
            name="service/index"
            options={{
              title: "",
              tabBarLabel: "خدمات",
            }}
          />
          <Tabs.Screen
            name="home/index"
            options={{
              title: "",
              tabBarLabel: "خانه",
            }}
          />
        </Tabs>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ToastProvider>
  );
}

export const RightIcon = () => {
  return (
    <ThemedText
      fontType="bold"
      style={{
        fontSize: 20,
        color: Colors.hint500,
        marginRight: 10,
      }}
    >
      کاریتو
    </ThemedText>
  );
};
