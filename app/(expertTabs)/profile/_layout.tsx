import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="address" />
      <Stack.Screen name="offers" />
      <Stack.Screen name="editProfile" />
      <Stack.Screen name="PersonalInfoPage" />
      <Stack.Screen name="CertificateInfoPage" />
    </Stack>
  );
}
