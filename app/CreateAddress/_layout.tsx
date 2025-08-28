import { ThemedContainer } from "@/components";
import { Stack } from "expo-router";
import { RightIcon } from "../(tabs)/_layout";

const screenOptions = {
  headerRight: () => <RightIcon />,
  headerLeft: undefined,
  headerBackVisible: false,
  headerBackTitle: "",
  headerTitle: "",
};

export default function RootLayout() {
  return (
    <ThemedContainer>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="index" />
      </Stack>
    </ThemedContainer>
  );
}
