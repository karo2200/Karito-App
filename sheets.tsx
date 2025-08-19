import { ViewStyle } from "react-native";
import {
  ActionSheetProps,
  registerSheet,
  SheetDefinition,
} from "react-native-actions-sheet";
import { LoginActionSheet } from "./components";

type ConfirmationActionPayloadType = {
  title: string;
  description?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  negativeText?: string;
  positiveText?: string;
  positiveColor?: string;
  positiveBorderColor?: ViewStyle["borderColor"];
  positiveBorderWidth?: ViewStyle["borderWidth"];
  positiveOutline?: boolean;
  negativeColor?: string;
  negativeBorderColor?: ViewStyle["borderColor"];
  negativeBorderWidth?: ViewStyle["borderWidth"];
  negativeOutline?: boolean;
  negativeBackgroundColor?: ViewStyle["backgroundColor"];
  positiveBackgroundColor?: ViewStyle["backgroundColor"];
  id?: ActionSheetProps["id"];
};

registerSheet("confirmation-action", LoginActionSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    "confirmation-action": SheetDefinition<{
      payload?: ConfirmationActionPayloadType;
    }>;
  }
}

export {};
