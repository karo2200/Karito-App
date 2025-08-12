import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  const [loaded] = useFonts({
    YekanBakhRegular: require("../assets/fonts/Yekan Bakh EN 01 Hairline.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
