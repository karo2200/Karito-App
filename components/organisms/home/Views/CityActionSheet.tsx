import { SearchWithModal, ThemedText } from "@/components";
import { Colors } from "@/constants/Colors";
import { DeviceHeight, DeviceWidth } from "@/constants/Dimension";
import { FontType } from "@/constants/Fonts";
import { CityDto } from "@/generated/graphql";
import { Ionicons } from "@expo/vector-icons";
import { forwardRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { useGetAllCityQuery } from "../hooks/Home.query";

const CityActionSheet = forwardRef(
  (
    {
      closeActionSheet,
      onCityPress,
    }: { closeActionSheet?: any; onCityPress?: any },
    ref
  ) => {
    const { data: data, isLoading } = useGetAllCityQuery({
      where: { isActive: { eq: true } },
    });

    const cityData = data?.pages;

    return (
      <ActionSheet
        ref={ref}
        keyboardHandlerEnabled={false}
        containerStyle={{ minHeight: DeviceHeight / 2.5 }}
        onClose={() => closeActionSheet()}
      >
        <View style={styles.header}>
          <Ionicons
            name="close"
            size={24}
            color={Colors.mediumGray}
            onPress={() => closeActionSheet()}
          />
          <ThemedText fontType="bold">کدام شهر هستید؟</ThemedText>
        </View>
        <SearchWithModal list={cityData} onSelect={() => closeActionSheet()} />
        <View style={styles.contentView}>
          <ThemedText type="text" style={styles.title} fontType="bold">
            شهرهای پر بازدید
          </ThemedText>
          <View style={styles.flexWrap}>
            {cityData?.slice(0, 9)?.map((element: CityDto) => {
              return (
                <Pressable
                  style={styles.cityView}
                  key={element?.id}
                  onPress={() => {
                    onCityPress(element);
                    closeActionSheet();
                  }}
                >
                  <ThemedText style={styles.text}>{element?.name}</ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ActionSheet>
    );
  }
);

export default CityActionSheet;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  flexWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  cityView: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    gap: 2,
    height: 39,
    width: DeviceWidth / 3 - 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.grayMedium,
    marginBottom: 8,
    marginLeft: 8,
  },

  text: { fontFamily: FontType.YekanBakhRegular, color: Colors.gray900 },

  title: {
    marginTop: 21,
    marginBottom: 8,
  },

  contentView: { paddingHorizontal: 15 },
});
