import { FontType } from "@/constants/Fonts";
import React from "react";

type HelpTextProps = {
  textList: string[];
};

export default function WebHelpText({ textList }: HelpTextProps) {
  return (
    <div style={{ marginTop: 25 }}>
      {textList?.map((item, index) => (
        <div key={index} style={styles.row}>
          {index !== textList.length - 1 && <span style={styles.bullet} />}
          <span style={styles.text}>{item}</span>
        </div>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  row: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 6,
    flexDirection: "row-reverse",
  },

  bullet: {
    width: 5,
    height: 5,
    backgroundColor: "#000",
    borderRadius: "50%",
    marginTop: 8,
    marginLeft: 8,
    flexShrink: 0,
  },

  text: {
    flex: 1,
    lineHeight: "20px",
    textAlign: "right",
    fontFamily: FontType.YekanBakhRegular,
  },
};
