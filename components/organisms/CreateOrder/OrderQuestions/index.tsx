import { ThemedText, ThemedView } from "@/components";
import CustomGroupCheckBox from "@/components/atoms/CustomGroupCheckBox";
import CustomRadioGroup from "@/components/atoms/CustomRadioGroup";
import { Colors } from "@/constants/Colors";
import { QuestionType } from "@/generated/graphql";
import { ArrowCircleDown, ArrowCircleUp } from "iconsax-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function OrderQuestions(props: any) {
  const [showBody, setShowBody] = useState<boolean>(false);
  const onPress = () => setShowBody((prev) => !prev);
  return (
    <ThemedView>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          width: "100%",
        }}
      >
        {showBody ? (
          <ArrowCircleUp color={Colors.black} size={24} />
        ) : (
          <ArrowCircleDown color={Colors.black} size={24} />
        )}
        <ThemedText fontType="bold">
          {`${props?.label}`}
          {props?.isRequired && (
            <ThemedText
              style={{ color: Colors.darkError, fontSize: 26, marginTop: 3 }}
              type="defaultSemiBold"
            >
              *
            </ThemedText>
          )}{" "}
        </ThemedText>
      </TouchableOpacity>
      {showBody && (
        <>
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
        </>
      )}
    </ThemedView>
  );
}
