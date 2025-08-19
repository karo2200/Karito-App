import { ToastProvider } from "@/components/atoms/Toast";
import AuthProvider from "@/graphql/AuthProvider";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import useUserStore from "@/stores/loginStore";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { RightIcon } from "./(tabs)/_layout";

export default function RootLayout() {
  const { isLoggedIn, isExpert } = useUserStore();

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

  const expertScreenOptions = {
    headerShown: true,
    title: "",
    headerRight: () => <RightIcon />,
    headerLeft: () => <></>,
  };

  return (
    <ToastProvider>
      <AuthProvider>
        <ThemeProvider value={MyTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isLoggedIn && isExpert}>
              <Stack.Screen name="(expertTabs)" />
            </Stack.Protected>
            <Stack.Protected guard={isLoggedIn && !isExpert}>
              <Stack.Screen name="(tabs)" />
            </Stack.Protected>

            <Stack.Protected guard={!isLoggedIn && !isExpert}>
              <Stack.Screen name="LoginPage" />
              <Stack.Screen name="OTPScreen" />
            </Stack.Protected>

            <Stack.Protected guard={!isLoggedIn && isExpert}>
              <Stack.Screen
                name="ExpertLoginPage"
                options={expertScreenOptions}
              />
              <Stack.Screen
                name="ExpertRegisterPage"
                options={expertScreenOptions}
              />
              <Stack.Screen
                name="PersonalInfoPage"
                options={expertScreenOptions}
              />
              <Stack.Screen
                name="CertificateInfoPage"
                options={expertScreenOptions}
              />
            </Stack.Protected>
          </Stack>
        </ThemeProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
