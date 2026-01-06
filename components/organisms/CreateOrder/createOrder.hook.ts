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

  const { addressId, prices, clearAll } = createOrderStore();

  const params = useRoute().params;
  const { mutate, isPending } = useCreateRequestMutation();

  const [stage, setStage] = useState<number>(0);
  setValue("serviceType", params?.name);

  const { data, isLoading } = useGetServiceTypeQuestionsQuery({
    input: { serviceTypeId: params?.sub },
  });
  const questions = data?.pages?.[0] ? data?.pages : [];
  console.log(JSON.stringify(params));
  const configDatas = useMemo(() => {
    let configDatas = [];

    configDatas?.push({
      type: "question",
      data: questions,
      askGender: params?.fixedGender === "null",
    });
    baseData?.forEach((item) => configDatas?.push(item));

    configDatas?.push({ type: "description" });
    configDatas?.push({ type: "previewOrder" });
    configDatas?.push({ type: "orderSubmitting" });

    return configDatas;
  }, [isLoading, questions]);

  const steps = (configDatas?.length ?? 0) - 1;
  const nextDisabled = useMemo(() => {
    if (configDatas[stage]?.type === "selectDate" && !watch("time"))
      return true;
    if (configDatas[stage]?.type === "description" && !watch("description"))
      return true;
    return stage === steps;
  }, [stage, watch("time"), watch("description")]);

  const onNextPress = () => {
    const values = getValues();

    if (configDatas[stage]?.type === "question") {
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
    if (configDatas[stage]?.type === "selectDate") {
      const tehranDateTime = dayjs.tz(
        `${getValues().date} ${getValues().time}:00`,
        "YYYY-MM-DD HH:mm",
        "Asia/Tehran"
      );
      setValue("requestDate", tehranDateTime);
    }
    if (stage === steps - 1) {
      let qnAs: QnAInput[] = [];

      questions?.forEach((item, index) => {
        qnAs?.push({
          questionId: item?.id,
          answers:
            item?.questionType == QuestionType.RadioButton
              ? [values?.[item?.id]]
              : [],
        });
      });

      mutate(
        {
          input: {
            addressId,
            description: values?.description,
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
          onError(error, variables, context) {},
        }
      );
    } else setStage((prev) => prev + 1);
  };
  const onBackPress = () => {
    if (stage === 0) router.back();
    if (stage > 0) setStage((prev) => prev - 1);
  };

  const total = useMemo(() => {
    let total = params?.price ? parseInt(params?.price) : 0;
    prices?.forEach((element) => {
      total += element?.price;
    });
    return total;
  }, [prices, params]);

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
    totalPrice: total,

    configDatas: !configDatas ? [] : configDatas,

    onNextPress,
    onBackPress,

    methods,
    setValue,
    getValues,
    watch,

    nextLoading: stage === steps - 1 && isPending,
  };
}
