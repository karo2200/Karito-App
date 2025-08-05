import { useFonts } from "expo-font";

export enum FontType {
  APACE_MONO = "SpaceMono",
}

export default function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  return fontsLoaded;
}
