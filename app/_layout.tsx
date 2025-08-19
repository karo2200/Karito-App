import { ThemedContainer } from "@/components";
import { ToastProvider } from "@/components/atoms/Toast";
import AuthProvider from "@/graphql/AuthProvider";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import useUserStore from "@/stores/loginStore";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SheetProvider } from "react-native-actions-sheet";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../sheets.tsx";
import { RightIcon } from "./(tabs)/_layout";

export default function RootLayout() {
  const { isLoggedIn, isExpert, isSelectRole } = useUserStore();

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
  console.log({ isExpert });
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <AuthProvider>
          <ThemeProvider value={MyTheme}>
            <ThemedContainer>
              <SheetProvider>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Protected guard={isLoggedIn && isExpert}>
                    <Stack.Screen name="(expertTabs)" />
                  </Stack.Protected>

                  <Stack.Protected guard={!isExpert}>
                    <Stack.Screen name="(tabs)" />
                  </Stack.Protected>

                  <Stack.Protected
                    guard={!isLoggedIn && !isExpert && isSelectRole}
                  >
                    <Stack.Screen name="LoginPage" />
                    <Stack.Screen name="OTPScreen" />
                  </Stack.Protected>

                  <Stack.Protected guard={!isLoggedIn && isExpert}>
                    <Stack.Screen
                      name="ExpertLoginPage"
                      options={{
                        headerShown: true,
                        title: "",
                        headerRight: () => <RightIcon />,
                        headerLeft: () => <></>,
                      }}
                    />
                    <Stack.Screen
                      name="ExpertRegisterPage"
                      options={{
                        headerShown: true,
                        title: "",
                        headerRight: () => <RightIcon />,
                        headerLeft: () => <></>,
                      }}
                    />
                    <Stack.Screen
                      name="PersonalInfoPage"
                      options={{
                        headerShown: true,
                        title: "",
                        headerRight: () => <RightIcon />,
                        headerLeft: () => <></>,
                      }}
                    />
                    <Stack.Screen
                      name="CertificateInfoPage"
                      options={{
                        headerShown: true,
                        title: "",
                        headerRight: () => <RightIcon />,
                        headerLeft: () => <></>,
                      }}
                    />
                  </Stack.Protected>
                </Stack>
              </SheetProvider>
            </ThemedContainer>
          </ThemeProvider>
        </AuthProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
