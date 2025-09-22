import { ThemedView } from "@/components";
import { ProgressBar } from "@/components/molecules/ProgressBar";
import { FormProvider } from "react-hook-form";
import { StyleSheet } from "react-native";
import BottomFooter from "./Views/BottomFooter";
import { CreateOrderSetup } from "./Views/CreateOrderSetup";
import useCreateOrder from "./createOrder.hook";

export default function CreateOrderOrg() {
  const {
    progressPersent,
    stage,
    configDatas,
    nextDisabled,
    onBackPress,
    onNextPress,
    isLast,

    nextLoading,

    methods,
    setValue,
    watch,
    getValues,
  } = useCreateOrder();

  return (
    <ThemedView style={styles.container}>
      <FormProvider {...methods}>
        {!isLast && <ProgressBar percent={Math.floor(progressPersent)} />}
        <ThemedView style={styles.container}>
          <CreateOrderSetup
            setValue={setValue}
            {...configDatas[stage]}
            getValues={getValues}
            watch={watch}
          />
        </ThemedView>
        {!isLast && (
          <BottomFooter
            onNextPress={onNextPress}
            onBackPress={onBackPress}
            nextDisabled={nextDisabled}
            nextLoading={nextLoading}
          />
        )}
      </FormProvider>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },

  flex1: { flex: 1 },
});
