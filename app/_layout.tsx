import { ToastProvider } from "@/components/atoms/Toast";
import AuthProvider from "@/graphql/AuthProvider";
import { NetworkWatcher } from "@/hooks/useNetworkStatus";
import authCacheStore from "@/stores/authCacheStore";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { I18nManager, Platform } from "react-native";
import { SheetProvider } from "react-native-actions-sheet";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../sheets.tsx";
import { RightIcon } from "./(tabs)/_layout";

export const isWeb = Platform.OS === "web";

if (!isWeb) {
  SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  const { isLoggedIn, isExpert, isSelectRole, _hasHydrated } = authCacheStore();

  const [loaded] = useFonts({
    YekanBakhRegular: require("../assets/fonts/YekanBakhENRegular.ttf"),
    YekanBakhBold: require("../assets/fonts/YekanBakhENBold.ttf"),
    YekanBakhMedium: require("../assets/fonts/YekanBakhENMedium.ttf"),
  });

  useEffect(() => {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
  }, []);

  useEffect(() => {
    if (loaded && _hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [loaded, _hasHydrated]);

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
  if (!_hasHydrated && !isWeb) {
    return null;
  }

  const expertScreenOptions = {
    headerShown: true,
    title: "",
    headerRight: () => <RightIcon />,
    headerLeft: () => <></>,
  };

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <ThemeProvider value={MyTheme}>
          <SheetProvider>
            <ToastProvider>
              <NetworkWatcher />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Protected guard={isLoggedIn && isExpert}>
                  <Stack.Screen name="(expertTabs)" />
                </Stack.Protected>
                <Stack.Protected
                  guard={(isLoggedIn && !isExpert) || !isSelectRole}
                >
                  <Stack.Screen name="(tabs)" />
                </Stack.Protected>

                <Stack.Protected guard={!isLoggedIn && !isExpert}>
                  <Stack.Screen name="LoginPage" />
                  <Stack.Screen name="OTPScreen" />
                  {/* <Stack.Screen name="PrivacyPolicyPage" /> */}
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
                  <Stack.Screen
                    name="ExpertOtpPage"
                    options={expertScreenOptions}
                  />
                  <Stack.Screen
                    name="VerificationStepPage"
                    options={expertScreenOptions}
                  />
                  {/* <Stack.Screen name="PrivacyPolicyPage" /> */}
                </Stack.Protected>
                <Stack.Screen
                  name="PrivacyPolicyPage"
                  options={expertScreenOptions}
                />
              </Stack>
            </ToastProvider>
          </SheetProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
