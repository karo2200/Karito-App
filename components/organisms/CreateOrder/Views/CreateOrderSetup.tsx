import { ThemedText } from "@/components";
import React, { JSX } from "react";
import { Control } from "react-hook-form";
import AddressOrg from "../AddressOrg";
import OrderQuestions from "../OrderQuestions";
import OrderSubmittingOrg from "../OrderSubmitting";
import PreviewOrder from "../PreviewOrder/PreviewOrder";
import SelectGender from "../SelectGender";
import SelectOrderTime from "../SelectTime";

type CreateOrderSetupProp = {
  type:
    | "address"
    | "selectDate"
    | "gender"
    | "question"
    | "previewOrder"
    | "orderSubmitting";
  control: Control;
  errors: any;
  style?: any;
  onClose?: VoidFunction;
  watch?: any;
  setValue?: any;
  setStage?: any;
};

export function CreateOrderSetup(props: CreateOrderSetupProp): JSX.Element {
  const type = props?.type || "address";
  switch (type) {
    case "address":
      return <AddressOrg {...props} />;

    case "selectDate":
      return <SelectOrderTime {...props} />;
    case "previewOrder":
      return <PreviewOrder {...props} />;

    case "orderSubmitting":
      return <OrderSubmittingOrg {...props} />;
    case "gender":
      return <SelectGender {...props} />;
    case "question":
      return <OrderQuestions {...props} />;

    default:
      return <ThemedText>Not implemented: {type}</ThemedText>;
  }
}
