import { useFonts } from "expo-font";

export enum FontStyle {
  bold = "bold",
  regular = "regular",
  medium = "medium",
}

export enum FontType {
  APACE_MONO = "SpaceMono",
  YekanBakhThin = "YekanBakhThin",
  YekanBakhHairline = "YekanBakhHairline",
  YekanBakhLight = "YekanBakhLight",
  YekanBakhRegular = "YekanBakhRegular",
  YekanBakhMedium = "YekanBakhMedium",
  YekanBakhBold = "YekanBakhBold",
  YekanBakhHeavy = "YekanBakhHeavy",
  YekanBakhFat = "YekanBakhFat",
}

export default function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    YekanBakhHairline: require("../assets/fonts/Yekan Bakh EN 01 Hairline.ttf"),
    YekanBakhThin: require("../assets/fonts/Yekan Bakh EN 02 Thin.ttf"),
    YekanBakhLight: require("../assets/fonts/Yekan Bakh EN 03 Light.ttf"),
    YekanBakhRegular: require("../assets/fonts/Yekan Bakh EN 04 Regular.ttf"),
    YekanBakhMedium: require("../assets/fonts/Yekan Bakh EN 05 Medium.ttf"),
    YekanBakhBold: require("../assets/fonts/Yekan Bakh EN 06 Bold.ttf"),
    YekanBakhHeavy: require("../assets/fonts/Yekan Bakh EN 07 Heavy.ttf"),
    YekanBakhFat: require("../assets/fonts/Yekan Bakh EN 08 Fat.ttf"),
  });

  return fontsLoaded;
}
