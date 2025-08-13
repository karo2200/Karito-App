import { ToastProvider } from "@/components/atoms/Toast";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import useUserStore from "@/stores/loginStore";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  const [loaded] = useFonts({
    YekanBakhRegular: require("../assets/fonts/Yekan Bakh EN 04 Regular.ttf"),
    YekanBakhBold: require("../assets/fonts/Yekan Bakh EN 06 Bold.ttf"),
    YekanBakhMedium: require("../assets/fonts/Yekan Bakh EN 05 Medium.ttf"),
  });

  const { isConnected, type, ip } = useNetworkStatus();

  const { isLoggedIn, isExpert } = useUserStore();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  useEffect(() => {
    console.log("......", isConnected);
  }, [isConnected]);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#ffffff",
    },
  };

  if (!loaded) {
    return null;
  }

  return (
    <ToastProvider>
      <ThemeProvider value={MyTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={isLoggedIn && isExpert}>
            <Stack.Screen name="(expertTabs)" />
          </Stack.Protected>
          <Stack.Protected guard={isLoggedIn && !isExpert}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>

          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="LoginPage" />
            <Stack.Screen name="OTPScreen" />
          </Stack.Protected>
        </Stack>
      </ThemeProvider>
    </ToastProvider>
  );
}
