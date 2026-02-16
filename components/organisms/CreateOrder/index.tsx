import TickIcon from "@/assets/icons/tick";
import { Divider, ThemedButton } from "@/components";
import { ProgressBar } from "@/components/molecules/ProgressBar";
import { Colors } from "@/constants/Colors";
import { useRef } from "react";
import { FormProvider } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomFooter from "./Views/BottomFooter";
import { CreateOrderSetup } from "./Views/CreateOrderSetup";
import useCreateOrder from "./createOrder.hook";

export default function CreateOrderOrg() {
  const scrollRef = useRef<ScrollView>(null);
  const {
    totalPrice,
    currentStep,
    stage,
    configDatas,
    nextDisabled,
    onBackPress,
    onNextPress,
    isLast,

    nextLoading,

    methods,
    setValue,
  } = useCreateOrder();

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      {!isLast && stage < 3 && <ProgressBar step={stage + 1} />}
      <FormProvider {...methods}>
        <ScrollView style={styles.scroll} ref={scrollRef}>
          <Divider height={24} />
          <CreateOrderSetup
            scrollRef={scrollRef}
            setValue={setValue}
            {...currentStep}
            totalPrice={totalPrice}
          />
        </ScrollView>
        {!isLast && stage < 3 && (
          <BottomFooter
            onNextPress={onNextPress}
            onBackPress={onBackPress}
            nextDisabled={nextDisabled}
            nextLoading={nextLoading}
            totalPrice={totalPrice}
          />
        )}
        {configDatas[stage].type == "previewOrder" && (
          <ThemedButton
            onPress={onNextPress}
            isLoading={nextLoading}
            title="ثبت درخواست"
            style={{
              marginHorizontal: 16,
              backgroundColor: Colors.success["500"],
              borderColor: Colors.success["500"],
              alignItems: "center",
            }}
            textStyle={{ fontSize: 14, color: Colors.white }}
            fontType="semiBold"
            LeftIcon={<TickIcon width={24} height={24} color={Colors.white} />}
          />
        )}
      </FormProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 20,
  },

  flex1: { flex: 1 },

  scroll: { flex: 1, flexGrow: 1, paddingHorizontal: 16, width: "100%" },
});
