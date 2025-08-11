import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function TickIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M10.58 15.58a.75.75 0 01-.53-.22l-2.83-2.83a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-5.67 5.67a.75.75 0 01-.53.22z"
        fill="#fff"
      />
    </Svg>
  );
}

export default TickIcon;
