import { Dimensions, Platform } from "react-native";

const mainWidth = Dimensions.get("screen").width;

export const maxWidth =
  mainWidth > 600 || Platform.OS === "web"
    ? Math.min(480, mainWidth)
    : mainWidth;

export const DeviceHeight = Dimensions.get("screen").height;
export const DeviceWidth = maxWidth;
