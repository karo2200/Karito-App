import CustomGroupCheckBox from "@/components/atoms/CustomGroupCheckBox";
import CustomRadioGroup from "@/components/atoms/CustomRadioGroup";
import { QuestionType } from "@/generated/graphql";

export default function OrderQuestions(props: any) {
  if (props?.questionType === QuestionType.RadioButton)
    return (
      <CustomRadioGroup
        key={props?.name}
        label={props?.title}
        data={props?.data}
        name={props?.name}
      />
    );
  else
    return (
      <CustomGroupCheckBox
        key={props?.name}
        label={props?.title}
        data={props?.data}
        name={props?.name}
      />
    );
}
