import { ThemedView } from "@/components";
import CustomGroupCheckBox from "@/components/atoms/CustomGroupCheckBox";
import CustomRadioGroup from "@/components/atoms/CustomRadioGroup";
import { QuestionType } from "@/generated/graphql";
import QuestionLabel from "../Views/QuestionLabel";

export default function OrderQuestions(props: any) {
  return (
    <ThemedView>
      <QuestionLabel label={props?.label} isRequired={props?.isRequired} />
      {props?.questionType === QuestionType.RadioButton ? (
        <CustomRadioGroup
          key={props?.name}
          data={props?.data}
          name={props?.name}
        />
      ) : (
        <CustomGroupCheckBox
          key={props?.name}
          data={props?.data}
          name={props?.name}
        />
      )}
    </ThemedView>
  );
}
