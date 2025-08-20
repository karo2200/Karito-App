import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { DeviceWidth } from "@/constants/Dimension";
import * as React from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CanceledOrders from "./Views/CanceledOrders";
import FinishedOrdes from "./Views/FinishedOrders";
import InProgressOrders from "./Views/InProgressOrders";

export default function OrderScreen() {
  const [activeTab, setActiveTab] = React.useState(0);
  const scrollRef = React.useRef<ScrollView>(null);

  const tabs = [
    { label: "سفارش‌های جاری", content: <InProgressOrders /> },
    { label: "سفارش‌های گذشته", content: <FinishedOrdes /> },
    { label: "سفارش‌های لغو شده", content: <CanceledOrders /> },
  ];

  const onTabPress = (index: number) => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({ x: DeviceWidth * index, animated: true });
  };

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(e.nativeEvent.contentOffset.x / DeviceWidth);
    setActiveTab(pageIndex);
  };

  return (
    <View>
      {/* Tab Bar */}
      <ScrollView
        horizontal
        pagingEnabled
        contentContainerStyle={styles.tabContainer}
        showsHorizontalScrollIndicator={false}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity key={index} onPress={() => onTabPress(index)}>
            <ThemedText
              type="text"
              style={[
                styles.tabLabel,
                activeTab === index && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </ThemedText>
            {activeTab === index && <View style={styles.tabButtonActive} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tab Content */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        style={{ transform: [{ scaleX: -1 }] }}
        contentContainerStyle={{ transform: [{ scaleX: -1 }] }}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
      >
        {tabs.map((tab, index) => (
          <View key={index} style={styles.page}>
            {tab.content}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
    justifyContent: "space-evenly",
    flexDirection: "row-reverse",
    alignItems: "center",
    marginHorizontal: 16,
  },

  tabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },

  tabButtonActive: {
    backgroundColor: Colors.hint500,
    width: "95%",
    height: 2,
    alignSelf: "center",
    bottom: 0,
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
  },

  tabLabel: {
    color: Colors.label,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  tabLabelActive: {
    color: Colors.hint500,
  },

  page: {
    width: Platform.OS === "web" ? Math.min(DeviceWidth, 480) : DeviceWidth,
  },
});
