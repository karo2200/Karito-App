import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function CloseIcon(props: SvgProps) {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M17.273 8.288l-8.485 8.485c-.29.29-.77.29-1.06 0a.755.755 0 010-1.06l8.485-8.486c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06z"
        fill="#1E3A8A"
      />
      <Path
        d="M17.273 16.773c-.29.29-.77.29-1.06 0L7.728 8.288a.755.755 0 010-1.061c.29-.29.77-.29 1.06 0l8.485 8.485c.29.29.29.771 0 1.06z"
        fill="#1E3A8A"
      />
    </Svg>
  );
}

export default CloseIcon;
