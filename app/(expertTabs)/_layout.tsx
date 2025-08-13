import { ThemedText } from "@/components";
import { ToastProvider } from "@/components/atoms/Toast";
import { Colors } from "@/constants/Colors";
import useLoadFonts, { FontType } from "@/constants/Fonts";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Tabs, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DocumentText, Profile, Task, Wallet1 } from "iconsax-react-native";
import { useEffect } from "react";
import { I18nManager, StyleSheet, View } from "react-native";
import "react-native-reanimated";

type TabBarIconProps = {
  focused: boolean;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
};

export default function RootLayout() {
  useEffect(() => {
    if (I18nManager.isRTL) {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }
  }, []);

  const segments = useSegments();

  const hideTabBar =
    // segments.toString().includes("CreateOrderPage") ||
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

  const tabBarIcon = ({ focused, Icon }: TabBarIconProps) => {
    return (
      <View style={styles.tabBarIconContainer}>
        <View
          style={[
            styles.tabBarIconStyle,
            {
              backgroundColor: focused ? Colors.hint500 : "transparent",
            },
          ]}
        />
        <View style={{ marginBottom: 5 }}>
          <Icon
            size={24}
            color={focused ? Colors.hint500 : Colors.mediumGray}
          />
        </View>
      </View>
    );
  };

  return (
    <ToastProvider>
      <ThemeProvider value={MyTheme}>
        <Tabs
          initialRouteName={"workList"}
          screenOptions={({ route }) => ({
            headerShown: true,
            title: "",
            headerRight: () => <RightIcon />,
            tabBarSafeAreaInset: { bottom: "never" },
            tabBarStyle: hideTabBar ? { display: "none" } : styles.tabBarStyle,
            tabBarActiveTintColor: Colors.hint500,
            tabBarInactiveTintColor: Colors.mediumGray,
            tabBarLabelStyle: styles.tabBarLabelStyle,
          })}
        >
          <Tabs.Screen
            name="profile"
            options={{
              tabBarLabel: "پروفایل",
              tabBarIcon: ({ focused }) =>
                tabBarIcon({ focused, Icon: Profile }),
            }}
          />

          <Tabs.Screen
            name="income/index"
            options={{
              tabBarLabel: "درآمدها",
              tabBarIcon: ({ focused }) =>
                tabBarIcon({ focused, Icon: Wallet1 }),
            }}
          />
          <Tabs.Screen
            name="mission"
            options={{
              tabBarLabel: "ماموریتها",
              tabBarIcon: ({ focused }) => tabBarIcon({ focused, Icon: Task }),
            }}
          />

          <Tabs.Screen
            name="workList"
            options={{
              tabBarLabel: "لیست کارها",
              tabBarIcon: ({ focused }) =>
                tabBarIcon({ focused, Icon: DocumentText }),
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
    <ThemedText fontType="bold" style={styles.headerText}>
      کاریتو
    </ThemedText>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    color: Colors.hint500,
    marginRight: 10,
  },

  tabBarStyle: {
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

  tabBarLabelStyle: {
    fontSize: 12,
    fontFamily: FontType.YekanBakhRegular,
    marginTop: 4,
  },

  tabBarIconStyle: {
    height: 4,
    width: 43,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    marginBottom: 6,
    marginTop: 8,
  },

  tabBarIconContainer: { alignItems: "center" },
});
