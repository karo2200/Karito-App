import { ThemedContainer } from "@/components";
import { ToastProvider } from "@/components/atoms/Toast";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  const [loaded] = useFonts({
    YekanBakhRegular: require("../assets/fonts/YekanBakhENRegular.ttf"),
    YekanBakhBold: require("../assets/fonts/YekanBakhENBold.ttf"),
    YekanBakhMedium: require("../assets/fonts/YekanBakhENMedium.ttf"),
  });

  const { isConnected, type, ip } = useNetworkStatus();

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
  const isLoggedIn = true;

  return (
    <ToastProvider>
      <ThemeProvider value={MyTheme}>
        <ThemedContainer>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen name="(tabs)" />
            </Stack.Protected>

            <Stack.Protected guard={!isLoggedIn}>
              <Stack.Screen name="LoginPage" />
              <Stack.Screen name="OTPScreen" />
            </Stack.Protected>
          </Stack>
        </ThemedContainer>
      </ThemeProvider>
    </ToastProvider>
  );
}
