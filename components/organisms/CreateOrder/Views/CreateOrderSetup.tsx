import { ThemedText } from "@/components";
import React, { JSX } from "react";
import OrderDescription from "../OrderDescription";
import OrderSubmittingOrg from "../OrderSubmitting";
import PreviewOrder from "../PreviewOrder/PreviewOrder";
import Questionarie from "../Questionarie";
import SelectGender from "../SelectGender";
import SelectOrderTime from "../SelectTime";

type CreateOrderSetupProp = {
  type:
    | "description"
    | "selectDate"
    | "gender"
    | "question"
    | "previewOrder"
    | "orderSubmitting";
  errors: any;
  style?: any;
  onClose?: VoidFunction;
  watch?: any;
  setValue?: any;
  setStage?: any;
  data?: any[];
  title?: string;
  name?: string;
  getValues?: any;
};

export function CreateOrderSetup(props: CreateOrderSetupProp): JSX.Element {
  const type = props?.type || "selectDate";
  switch (type) {
    case "question":
      return <Questionarie {...props} />;

    case "selectDate":
      return <SelectOrderTime {...props} />;
    case "previewOrder":
      return <PreviewOrder {...props} />;

    case "orderSubmitting":
      return <OrderSubmittingOrg />;
    case "gender":
      return <SelectGender {...props} />;
    case "description":
      return <OrderDescription {...props} />;

    default:
      return <ThemedText>Not implemented: {type}</ThemedText>;
  }
}
