import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function FailedPaymentIcon(props: SvgProps) {
  return (
    <Svg width={176} height={176} viewBox="0 0 176 176" fill="none" {...props}>
      <Path
        d="M88 176c48.601 0 88-39.399 88-88S136.601 0 88 0 0 39.399 0 88s39.399 88 88 88z"
        fill="#FEEBEE"
      />
      <Path
        d="M140.799 176h-105.6V62.187a18.794 18.794 0 0018.774-18.774h68.053a18.648 18.648 0 005.504 13.268 18.644 18.644 0 0013.269 5.506V176z"
        fill="#fff"
      />
      <Path
        d="M88 119.68c15.552 0 28.16-12.608 28.16-28.16S103.552 63.36 88 63.36 59.84 75.968 59.84 91.52 72.448 119.68 88 119.68z"
        fill="#E03B3A"
      />
      <Path
        d="M82 86 L94 97 M94 86 L82 97"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M103.253 126.72H72.747a3.52 3.52 0 100 7.04h30.506a3.52 3.52 0 000-7.04zM113.815 140.8H62.188a3.52 3.52 0 100 7.04h51.627a3.52 3.52 0 000-7.04z"
        fill="#FEEBEE"
      />
    </Svg>
  );
}

export default FailedPaymentIcon;
