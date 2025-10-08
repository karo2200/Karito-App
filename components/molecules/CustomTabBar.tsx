import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom:
            Platform.OS === "android" ? insets.bottom : insets.bottom,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        const Icon = options.tabBarIcon?.({
          focused: isFocused,
          color: Colors.hint500,
          size: 24,
        });

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tabItem}
          >
            {/* <View
              style={[
                styles.indicator,
                {
                  backgroundColor: isFocused ? Colors.hint500 : "transparent",
                },
              ]}
            /> */}
            <View style={styles.iconWrapper}>{Icon}</View>
            <Text
              style={[
                styles.label,
                { color: isFocused ? Colors.hint500 : Colors.mediumGray },
              ]}
            >
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 6,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  iconWrapper: {
    marginBottom: 0,
  },
  label: {
    fontSize: 12,
    fontFamily: FontType.YekanBakhRegular,
  },
  indicator: {
    height: 4,
    width: 43,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    marginBottom: 6,
    backgroundColor: Colors.hint500,
    top: 8,
    position: "absolute",
  },
});
