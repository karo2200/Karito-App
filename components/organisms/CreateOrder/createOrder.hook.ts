import { useToast } from "@/components/atoms/Toast";
import {
  QnAInput,
  QuestionType,
  useCreateRequestMutation,
} from "@/generated/graphql";
import createOrderStore from "@/stores/createOrder";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetServiceTypeQuestionsQuery } from "./hooks";

dayjs.extend(utc);
dayjs.extend(timezone);

const baseData = [{ type: "selectDate" }];

export default function useCreateOrder() {
  const toast = useToast();
  const methods = useForm<Record<string, any>, object>({
    mode: "onChange",
  });
  const { getValues, setValue, watch } = methods;

  const { addressId, prices, clearAll, setPrices } = createOrderStore();

  const params = useRoute().params;
  const { mutate, isPending } = useCreateRequestMutation();

  const [stage, setStage] = useState<number>(0);
  const serviceType = watch("serviceType");

  const { data, isLoading } = useGetServiceTypeQuestionsQuery({
    input: { serviceTypeId: serviceType?.id },
  });
  const questions = data?.pages?.[0] ? data?.pages : [];

  useEffect(() => {
    if (questions?.length > 0 && prices?.length > 0) {
      const findIndex = questions?.findIndex(
        (item) => item?.id === prices?.[0]?.id
      );
      if (findIndex == -1) {
        prices?.forEach((item, index) => setValue(item?.id, undefined));
        setPrices([]);
      }
    }
  }, [serviceType, questions]);

  const configDatas = useMemo(() => {
    let configDatas = [];
    configDatas?.push({ type: "serviceType", ...params });
    configDatas?.push({
      type: "question",
      data: questions,
      askGender: !serviceType?.fixedGender,
      serviceType,
    });
    baseData?.forEach((item) => configDatas?.push(item));

    // configDatas?.push({ type: "description" });
    configDatas?.push({ type: "previewOrder" });
    configDatas?.push({ type: "orderSubmitting" });

    return configDatas;
  }, [isLoading, questions]);

  const steps = (configDatas?.length ?? 0) - 1;
  const values = getValues();
  const nextDisabled = useMemo(() => {
    if (configDatas[stage]?.type == "question") {
      const disabled = questions.some((question) => {
        if (!question.isRequired) return false;

        const value = values[question.id];

        // radio / single value
        if (question.questionType === "RADIO_BUTTON") {
          return !value;
        }

        // checkbo
        if (question.questionType === "CHECK_BOX") {
          return !Array.isArray(value) || value.length === 0;
        }

        return false;
      });

      if (!serviceType?.fixedGender && !values?.["gender"]) return true;
      return disabled;
    }

    // if (configDatas[stage]?.type === "selectDate" && !watch("dateTime"))
    //   return true;

    if (configDatas[stage]?.type === "description" && !watch("description"))
      return true;

    if (!watch("serviceType")) return true;

    return stage === steps;
  }, [stage, watch()]);

  const onNextPress = () => {
    const values = getValues();
    console.log("mm", { type: currentStep?.type });
    if (currentStep?.type === "question") {
      let canContinue = true;
      for (const element of questions) {
        if (element?.isRequired && !getValues()?.[element?.id]) {
          toast.showToast({
            message: `پاسخ به سوال ${element?.text} الزامی است`,
            type: "error",
          });
          canContinue = false;
          break; // اینجا حلقه رو متوقف می‌کنه
        }
      }
      if (!canContinue) return;
    }
    if (currentStep?.type === "selectDate") {
      setValue("requestDate", getValues().dateTime);
    }
    if (currentStep?.type === "previewOrder") {
      let qnAs: QnAInput[] = [];
      console.log("NN");
      questions?.forEach((item, index) => {
        console.log(JSON.stringify({ ii: values?.[item?.id] }));
        qnAs?.push({
          questionId: item?.id,
          optionId:
            item?.questionType == QuestionType.RadioButton
              ? [values?.[item?.id]]
              : [],
          // optionIds:values?.[item?.id]?.
        });
      });

      mutate(
        {
          input: {
            addressId,
            description: "",
            qnAs,
            requestDate: values?.requestDate,
            serviceTypeId: params?.sub,
            gender: values?.gender,
          },
        },
        {
          onSuccess(data, variables, context) {
            const resultCode = data?.serviceRequest_create?.status?.code;
            if (resultCode === 1) {
              setStage((prev) => prev + 1);
            } else if (resultCode === 0) {
              toast.showToast({
                message: "آدرس شما تحت پوشش خدمات کاریتو قرار ندارد",
                type: "error",
              });
              router?.navigate("/(tabs)/service");
            }
          },
          onError(error, variables, context) {
            console.log({ error });
          },
        }
      );
    } else setStage((prev) => prev + 1);
  };
  const onBackPress = () => {
    if (stage === 0) router.back();
    if (stage > 0) setStage((prev) => prev - 1);
  };

  const currentStep = configDatas?.[stage];

  const totalPrice = useMemo(() => {
    if (currentStep.type === "serviceType") {
      return serviceType?.basePrice ?? 0;
    } else {
      const totalPrice =
        prices && prices?.length > 0
          ? serviceType?.basePrice +
            prices.reduce((sum, item) => sum + (item.price || 0), 0)
          : serviceType?.basePrice;
      return totalPrice;
    }
  }, [stage, serviceType, prices]);

  useEffect(() => {
    return () => clearAll();
  }, []);

  const isLast = stage === steps;

  return {
    progressPersent: !isLoading ? ((stage + 1) / steps) * 100 : 0,
    setStage,
    stage,
    nextDisabled,
    isLast,
    totalPrice,
    currentStep,

    configDatas: !configDatas ? [] : configDatas,

    onNextPress,
    onBackPress,

    methods,
    setValue,
    getValues,
    watch,

    nextLoading: currentStep?.type === "previewOrder" && isPending,
  };
}
