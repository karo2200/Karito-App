import { SheetManager } from "react-native-actions-sheet";

type SheetNames = "confirmation-action";

export function showSheet<T extends SheetNames>(
  name: T,
  payload?: Parameters<typeof SheetManager.show>[1]
) {
  return SheetManager.show(name, payload);
}

export function hideSheet<T extends SheetNames>(name: T) {
  return SheetManager.hide(name);
}

export function switchActions(
  newAction: SheetNames,
  oldAction: SheetNames = "confirmation-action",
  payload?: Parameters<typeof SheetManager.show>[1]
) {
  hideSheet(oldAction);
  setTimeout(() => {
    showSheet(newAction, payload);
  }, 300);
}
