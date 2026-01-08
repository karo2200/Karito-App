import { useFonts } from "expo-font";

export enum FontStyle {
  bold = "YekanBakhBold",
  regular = "YekanBakhRegular",
  medium = "YekanBakhMedium",
  semiBold = "YekanBakhHeavy",
  thin = "YekanBakhThin",
  light = "YekanBakhLight",
  extraBold = "YekanBakhHeavy",
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
  Shabnam = "Shabnam",
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
    Shabnam: require("../assets/fonts/Shabnam-FD.ttf"),
  });

  return fontsLoaded;
}
