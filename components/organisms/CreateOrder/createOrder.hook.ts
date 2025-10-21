import { useToast } from "@/components/atoms/Toast";
import { queryKeys } from "@/constants/queryKeys";
import {
  LocationType,
  QnAInput,
  QuestionType,
  useAddress_SetPrimaryMutation,
  useCreateRequestMutation,
} from "@/generated/graphql";
import createOrderStore from "@/stores/createOrder";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetServiceTypeQuestionsQuery } from "./hooks";

dayjs.extend(utc);
dayjs.extend(timezone);

const baseData = [
  { type: "selectDate" },
  { type: "gender" },
  {
    type: "question",
    title: "فضای مد نظر شما برای دریافت سفارش چگونه است؟",
    name: "locationType",
    questionType: QuestionType.RadioButton,
    data: [
      {
        label: "فضای مسکونی",
        value: LocationType.Residential,
        id: 0,
      },
      {
        label: "فضای تجاری",
        value: LocationType.Commercial,
        id: 1,
      },
      {
        label: "فضای اداری",
        value: LocationType.Office,
        id: 2,
      },
      {
        label: "فضای تخلیه شده",
        value: LocationType.Vacant,
        id: 3,
      },
    ],
  },
];

export default function useCreateOrder() {
  const toast = useToast();
  const methods = useForm<Record<string, any>, object>({
    mode: "onChange",
  });
  const { getValues, setValue, watch } = methods;

  const { addressId } = createOrderStore();

  const params = useRoute().params;
  const { mutate, isPending } = useCreateRequestMutation();

  const [stage, setStage] = useState<number>(0);
  setValue("serviceType", params?.name);

  const { data, isLoading } = useGetServiceTypeQuestionsQuery({
    input: { serviceTypeId: params?.sub },
  });
  const questions = data?.pages?.[0] ? data?.pages : [];

  const configDatas = useMemo(() => {
    let configDatas = [...baseData];
    setValue("locationType", LocationType.Residential);
    if (questions?.length > 0) {
      let insertIndex = 4;
      questions?.forEach((question, index) => {
        setValue(
          question?.id?.toString(),
          question?.questionType === QuestionType.RadioButton
            ? question?.options?.[0]
            : [question?.options?.[0]]
        );
        configDatas.push({
          type: "question",
          title: question?.text,
          questionType: question?.questionType,
          name: question?.id?.toString(),
          data: question?.options?.map((option, index) => {
            return { label: option, value: option, id: index };
          }),
        });
      });
      configDatas?.push({ type: "previewOrder" });
      configDatas?.push({ type: "orderSubmitting" });
      return configDatas;
    } else if (!isLoading) {
      return configDatas;
    }
  }, [isLoading, questions]);

  const steps = (configDatas?.length ?? 0) - 1;
  const nextDisabled = useMemo(() => {
    return stage === steps || (stage === 0 && !watch("time"));
  }, [stage, watch("time")]);

  const queryClient = useQueryClient();
  const { mutate: addressMutate } = useAddress_SetPrimaryMutation();

  const onNextPress = () => {
    const values = getValues();
    if (stage == 0) {
      if (values?.addressId)
        addressMutate(
          {
            input: {
              addressId: values?.addressId,
            },
          },
          {
            onSuccess: (data) => {
              if (data?.address_setPrimary?.status?.code === 1) {
                queryClient.invalidateQueries({
                  queryKey: [queryKeys.address_getMyAddresses],
                });
              }
            },
          }
        );
    }
    if (stage == 0) {
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
            description: "تست",
            locationType: values?.locationType,
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

  const isLast = stage === steps;

  return {
    progressPersent: !isLoading ? ((stage + 1) / steps) * 100 : 0,
    setStage,
    stage,
    nextDisabled,
    isLast,

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
