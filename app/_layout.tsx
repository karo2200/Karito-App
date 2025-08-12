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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const isLoggedIn = false;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="LoginPage" />
        <Stack.Screen name="OTPScreen" />
      </Stack.Protected>
    </Stack>
  );
}
