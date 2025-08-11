import {
  Category,
  Document,
  DocumentText,
  Home2,
  Profile,
  Task,
  Wallet1,
} from "iconsax-react-native";

export const tabsConfig = {
  customer: [
    { name: "profile", label: "پروفایل", icon: Profile },
    { name: "order", label: "سفارش‌ها", icon: Document },
    { name: "service", label: "خدمات", icon: Category },
    { name: "home/index", label: "خانه", icon: Home2 },
  ],
  specialist: [
    { name: "profile", label: "پروفایل", icon: Profile },
    { name: "income/index", label: "درآمد", icon: Wallet1 },
    { name: "missions/index", label: "ماموریت‌ها‌", icon: Task },
    { name: "home/index", label: "لیست کارها", icon: DocumentText },
  ],
};
