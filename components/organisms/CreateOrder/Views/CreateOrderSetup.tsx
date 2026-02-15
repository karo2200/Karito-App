import { ThemedText } from "@/components";
import React, { JSX } from "react";
import SubCategoryOrg from "../../subService/SubCategoryOrg";
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
    | "orderSubmitting"
    | "serviceType";
  errors: any;
  style?: any;
  onClose?: VoidFunction;
  setValue?: any;
  setStage?: any;
  data?: any[];
  title?: string;
  name?: string;
  totalPrice?: number;
};

export function CreateOrderSetup(props: CreateOrderSetupProp): JSX.Element {
  const type = props?.type || "selectDate";
  switch (type) {
    case "serviceType":
      return <SubCategoryOrg {...props} />;
    case "question":
      return <Questionarie {...props} />;

    case "selectDate":
      return <SelectOrderTime />;
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
