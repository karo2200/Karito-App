import * as React from "react";
import Svg, { Path, Rect, SvgProps } from "react-native-svg";

function DangerIcon(props: SvgProps) {
  return (
    <Svg width={42} height={42} viewBox="0 0 42 42" fill="none" {...props}>
      <Rect x={3} y={3} width={36} height={36} rx={18} fill="#FEEBEE" />
      <Rect
        x={3}
        y={3}
        width={36}
        height={36}
        rx={18}
        stroke="#FCCDD3"
        strokeWidth={5}
      />
      <Path
        d="M24 18l-6 6m0-6l6 6m7-3c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z"
        stroke="#B21F21"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default DangerIcon;
