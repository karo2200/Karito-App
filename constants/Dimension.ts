import { Dimensions, Platform } from "react-native";

export const DeviceHeight = Dimensions.get("screen").height;
export const DeviceWidth = Dimensions.get("screen").width;

export const maxWidth =
  DeviceWidth > 600 || Platform.OS === "web" ? 480 : DeviceWidth;
