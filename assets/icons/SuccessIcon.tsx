import * as React from "react";
import Svg, { Path, Rect, SvgProps } from "react-native-svg";

function SuccessIcon(props: SvgProps) {
  return (
    <Svg width={42} height={42} viewBox="0 0 42 42" fill="none" {...props}>
      <Rect x={3} y={3} width={36} height={36} rx={18} fill="#E4F7EA" />
      <Rect
        x={3}
        y={3}
        width={36}
        height={36}
        rx={18}
        stroke="#BEEBCC"
        strokeWidth={5}
      />
      <Path
        d="M16.5 21l3 3 6-6m5.5 3c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z"
        stroke="#00691E"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SuccessIcon;
