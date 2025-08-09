import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import CanceledOrders from "./Views/CanceledOrders";
import FinishedOrdes from "./Views/FinishedOrders";
import InProgressOrders from "./Views/InProgressOrders";

const { width } = Dimensions.get("window");

export default function OrderScreen() {
  const TabBarComponent = React.useCallback(
    (props: any) => (
      <MaterialTabBar
        {...props}
        activeColor={Colors.hint500}
        inactiveColor={Colors.label}
        indicatorStyle={styles.indicator}
        style={styles.tabContent}
        labelStyle={styles.tabLabel}
        scrollEnabled
      />
    ),
    []
  );

  return (
    <Tabs.Container
      headerContainerStyle={styles.tabContainer}
      lazy
      renderTabBar={TabBarComponent}
      initialTabName="first"
    >
      <Tabs.Tab name="third" label="سفارش‌های لغو شده">
        <CanceledOrders />
      </Tabs.Tab>
      <Tabs.Tab name="second" label="سفارش‌های گذشته">
        <FinishedOrdes />
      </Tabs.Tab>
      <Tabs.Tab name="first" label="سفارش‌های جاری">
        <InProgressOrders />
      </Tabs.Tab>
    </Tabs.Container>
  );
}

const styles = StyleSheet.create({
  indicator: {
    borderColor: Colors.hint500,
    borderWidth: 2,
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
  },

  tabContainer: {
    shadowOpacity: 0,
    elevation: 0,
    width: width - 26,
    backgroundColor: "white",
    alignSelf: "center",
  },

  tabContent: {
    marginBottom: 8,
    borderBottomColor: Colors.gray100,
    borderBottomWidth: 1,
  },

  tabLabel: {
    marginStart: 0,
    fontSize: 12,
    fontWeight: "400",
    width: width / 4,
    textAlign: "center",
    fontFamily: FontType.YekanBakhRegular,
  },
});
