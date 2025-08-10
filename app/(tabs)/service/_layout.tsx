import { Stack } from "expo-router";

const screenOptions = { headerShown: false };

export default function RootLayout() {
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" />
      <Stack.Screen name="CreateOrderPage" />
      <Stack.Screen name="SubServicePage" />
    </Stack>
  );
}
