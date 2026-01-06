import { ThemedView } from "@/components";
import OrderQuestions from "../OrderQuestions";
import SelectGender from "../SelectGender";

export default function Questionarie(props: any) {
  console.log(JSON.stringify({ props }));
  const { data, askGender } = props;

  return (
    <ThemedView>
      {askGender && <SelectGender {...props} />}
      {data?.map((item) => (
        <OrderQuestions
          name={item?.id?.toString()}
          label={item?.text}
          data={item?.options}
          questionType={item?.questionType}
          key={item?.id?.toString()}
          isRequired={item?.isRequired}
        />
      ))}
    </ThemedView>
  );
}
