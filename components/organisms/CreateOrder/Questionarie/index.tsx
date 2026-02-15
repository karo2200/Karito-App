import { ThemedView } from "@/components";
import { Gender, QuestionType } from "@/generated/graphql";
import { useMemo } from "react";
import { View } from "react-native";
import OrderQuestions from "../OrderQuestions";
import QuestionDivider from "../Views/QuestionDivider";

const genderOptions = [
  { text: "زن", value: Gender.Female },
  { text: "مرد", value: Gender.Male },
  { text: "مهم نیست", value: undefined },
];

export default function Questionarie(props: any) {
  const { serviceType, data } = props;

  const questions = useMemo(() => {
    let qa = data;
    !serviceType?.fixedGender &&
      qa.push({
        text: "جنسیت متخصص را انتخاب کنید:",
        isRequired: true,
        questionType: QuestionType.RadioButton,
        id: "gender",
        options: genderOptions,
      });
    return qa;
  }, [data]);

  return (
    <ThemedView>
      {questions?.map((item, index) => (
        <View key={item?.id?.toString()}>
          <OrderQuestions
            name={item?.id?.toString()}
            label={item?.text}
            data={item?.options}
            questionType={item?.questionType}
            key={item?.id?.toString()}
            isRequired={item?.isRequired}
          />
          {index != questions?.length - 1 && <QuestionDivider />}
        </View>
      ))}
    </ThemedView>
  );
}
