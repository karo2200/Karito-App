import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import React from "react";

export default function QuestionLabel(props) {
  return (
    <ThemedView
      style={{
        flexDirection: "row-reverse",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <ThemedText fontType="bold" style={{ fontSize: 14 }}>
        {`${props?.label}`}
      </ThemedText>
      {props?.isRequired && (
        <ThemedView
          style={{
            backgroundColor: Colors.danger10,
            borderRadius: 4,
            paddingHorizontal: 4,
            marginHorizontal: 10,
          }}
        >
          <ThemedText
            style={{ fontSize: 12, color: Colors.error["950"] }}
            fontType="regular"
          >
            * الزامی
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}
