import { Divider, ThemedText, ThemedView } from "@/components";
import ThemedInput from "@/components/atoms/ThemedInput";
import { Colors } from "@/constants/Colors";
import { DeviceWidth } from "@/constants/Dimension";
import { Gender, QuestionType } from "@/generated/graphql";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
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
        <View key={`${item?.id?.toString()}_${index}`}>
          <OrderQuestions
            name={item?.id?.toString()}
            label={item?.text}
            data={item?.options}
            questionType={item?.questionType}
            key={item?.id?.toString()}
            isRequired={item?.isRequired}
          />
          <QuestionDivider />
        </View>
      ))}
      <View style={styles.descContainer}>
        <ThemedText fontType="bold" style={styles.label}>
          توضیحات:
        </ThemedText>
        <ThemedInput
          name="description"
          textArea
          placeholder="به عنوان مثال ۱۰۰ متر"
          inputStyle={styles.inputStyle}
        />
      </View>
      <Divider height={24} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  inputStyle: { paddingTop: 14, paddingHorizontal: 16, fontSize: 12 },
  label: {
    fontSize: 14,
    position: "absolute",
    zIndex: 1,
    right: 16,
    top: -10,
    backgroundColor: Colors.background,
    paddingHorizontal: 4,
  },

  descContainer: { width: DeviceWidth * 0.9 },
});
