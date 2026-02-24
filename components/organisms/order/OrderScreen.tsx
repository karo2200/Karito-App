import ThemedContainer from "@/components/atoms/ThemedContainer";
import ThemedText from "@/components/atoms/ThemedText";
import GuestMode from "@/components/molecules/GuestMode";
import { Colors } from "@/constants/Colors";
import { commonStyles } from "@/constants/CommonStyles";
import { DeviceWidth, maxWidth } from "@/constants/Dimension";
import { SearchNormal } from "iconsax-react-native";
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
import OrderFilterModal from "./Views/FilterModal";
import OrderList from "./Views/OrderList";
import useOrderHook from "./hooks/Order.hook";

export default function OrderScreen() {
  const {
    setActiveTab,
    activeTab,
    scrollRef,
    isLoggedIn,
    tabs,
    data,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    refetch,
    router,
  } = useOrderHook();
  const [isFilterVisible, setIsFilterVisible] = React.useState(false);

  const onTabPress = (index: number) => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({ x: DeviceWidth * index, animated: true });
  };

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(e.nativeEvent.contentOffset.x / DeviceWidth);
    setActiveTab(pageIndex);
  };

  return isLoggedIn ? (
    <View>
      {/* Tab Bar */}
      <View style={{ marginHorizontal: 16, paddingTop: 20, marginBottom: 10 }}>
        <ThemedText fontType="bold">سفارش‌های من</ThemedText>
        <ThemedText type="subtitle" style={{ color: Colors.gray500 }}>
          پیگیری و مشاهده وضعیت سفارش‌ها
        </ThemedText>
      </View>
      <View style={styles.tabsearchContainer}>
        <View style={styles.tabContainer}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onTabPress(index)}
              style={[
                styles.tabItem,
                {
                  backgroundColor:
                    activeTab === index ? Colors.karito["50"] : "transparent",
                },
              ]}
            >
              <ThemedText
                type="text"
                style={[
                  styles.tabLabel,
                  activeTab === index && styles.tabLabelActive,
                ]}
                fontType={activeTab === index ? "semiBold" : "regular"}
              >
                {tab.label}
              </ThemedText>
              <View style={styles.divider} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => setIsFilterVisible(true)}
        >
          <SearchNormal color={Colors.gray["500"]} size={18} />
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        style={{ transform: [{ scaleX: -1 }] }}
        contentContainerStyle={{
          transform: [{ scaleX: -1 }],
          flexDirection: "row-reverse",
        }}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
      >
        {tabs.map((tab, index) => (
          <View key={index} style={styles.page}>
            <OrderList
              {...{
                data: data?.pages,
                isLoading,
                isRefetching,
                hasNextPage,
                fetchNextPage,
                refetch,
                router,
              }}
            />
          </View>
        ))}
      </ScrollView>
      {isFilterVisible && (
        <OrderFilterModal
          visible={isFilterVisible}
          onClose={() => setIsFilterVisible(false)}
        />
      )}
    </View>
  ) : (
    <ThemedContainer style={commonStyles.container}>
      <GuestMode />
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    alignItems: "center",
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    height: 36,
    overflow: "hidden",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row-reverse",
  },

  tabsearchContainer: {
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    alignItems: "center",
    marginHorizontal: 15,
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

  divider: { height: 36, width: 1, backgroundColor: Colors.gray[200] },

  tabLabel: {
    color: Colors.gray["500"],
    flex: 1,
    textAlign: "center",
  },

  tabLabelActive: {
    color: Colors.karito["600"],
  },

  page: {
    width: Platform.OS === "web" ? maxWidth : DeviceWidth,
    marginTop: 10,
  },

  searchBar: {
    height: 36,
    width: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray["200"],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});
