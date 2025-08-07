import { Colors } from "@/constants/Colors";
import useLoadFonts, { FontType } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Tabs } from "expo-router";
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

  const fontsLoaded = useLoadFonts();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#FFFFFF",
    },
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={MyTheme}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: true,
          safeAreaInsets: { top: 0, bottom: 0 },
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 0,
            height: 84,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 10,
            elevation: 5,
          },
          tabBarActiveTintColor: Colors.hint500,
          tabBarInactiveTintColor: Colors.mediumGray,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: FontType.APACE_MONO,
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
          name="home/index"
          options={{
            title: "کاریتو",
            tabBarLabel: "خانه",
            headerTitleStyle: {
              textAlign: "right",

              color: Colors.hint500,
              fontSize: 20,
              fontWeight: "bold",
            },
          }}
        />
        <Tabs.Screen
          name="service/index"
          options={{ title: "کاریتو", tabBarLabel: "خدمات" }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
