import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function UploadIcon(props: SvgProps) {
  return (
    <Svg width={61} height={40} viewBox="0 0 61 40" fill="none" {...props}>
      <Path
        d="M48.875 15.1C47.175 6.475 39.6 0 30.5 0 23.275 0 17 4.1 13.875 10.1 6.35 10.9.5 17.275.5 25c0 8.275 6.725 15 15 15H48c6.9 0 12.5-5.6 12.5-12.5 0-6.6-5.125-11.95-11.625-12.4zM35.5 22.5v10h-10v-10H18L30.5 10 43 22.5h-7.5z"
        fill="#8897A8"
      />
    </Svg>
  );
}

export default UploadIcon;
