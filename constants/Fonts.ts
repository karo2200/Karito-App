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
    YekanBakhHairline: require("../assets/fonts/YekanBakhENHairline.ttf"),
    YekanBakhThin: require("../assets/fonts/YekanBakhENThin.ttf"),
    YekanBakhLight: require("../assets/fonts/YekanBakhENLight.ttf"),
    YekanBakhRegular: require("../assets/fonts/YekanBakhENRegular.ttf"),
    YekanBakhMedium: require("../assets/fonts/YekanBakhENMedium.ttf"),
    YekanBakhBold: require("../assets/fonts/YekanBakhENBold.ttf"),
    YekanBakhHeavy: require("../assets/fonts/YekanBakhENHeavy.ttf"),
    YekanBakhFat: require("../assets/fonts/YekanBakhENFat.ttf"),
  });

  return fontsLoaded;
}
