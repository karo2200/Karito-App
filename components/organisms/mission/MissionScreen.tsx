import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import * as React from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import InprogressMissions from "./Views/InprogressMissions";
import LastMissions from "./Views/LastMissions";

const { width } = Dimensions.get("screen");

export default function MissionScreen() {
  const [activeTab, setActiveTab] = React.useState(0);
  const scrollRef = React.useRef<ScrollView>(null);

  const tabs = [
    { label: "ماموریت های جاری", content: <InprogressMissions /> },
    { label: "ماموریت های گذشته", content: <LastMissions /> },
  ];

  const onTabPress = (index: number) => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({ x: width * index, animated: true });
  };

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveTab(pageIndex);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Tab Bar */}
      <View style={styles.tabContainer}>
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
      </View>

      {/* Tab Content */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        style={{ transform: [{ scaleX: -1 }] }}
        contentContainerStyle={{
          transform: [{ scaleX: -1 }],
          flexDirection: "row-reverse",
        }}
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
    width: Platform.OS === "web" ? Math.min(width, 480) : width,
  },
});
