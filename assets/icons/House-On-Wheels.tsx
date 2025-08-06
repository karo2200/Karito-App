import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

function HouseOnWheelsIcon(props: SvgProps) {
  return (
    <Svg width={33} height={33} viewBox="0 0 33 33" fill="none" {...props}>
      <G clipPath="url(#clip0_857_2558)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27.8 12.867v6.4h1.066a1.067 1.067 0 001.067-1.067v-4.267a1.067 1.067 0 00-1.067-1.066H27.8zm-2.134-5.334c0-2.644-1.74-3.2-3.2-3.2C5.716 4.333 2.2 6.653 2.2 8.6v13.867a1.067 1.067 0 001.066 1.066h1.121c.27-2.393 2.281-4.266 4.746-4.266 2.465 0 4.477 1.873 4.746 4.266h11.787v-16zM11.8 24.067A2.669 2.669 0 009.133 21.4a2.668 2.668 0 00-2.667 2.667 2.67 2.67 0 002.667 2.666 2.669 2.669 0 002.667-2.666zm16-2.667v2.133h4.266v2.134H13.64c-.663 1.858-2.423 3.2-4.506 3.2s-3.843-1.342-4.506-3.2h-1.36a3.204 3.204 0 01-3.2-3.2V8.6c0-4.486 6.698-6.4 22.4-6.4 2.578 0 5.333 1.4 5.333 5.333v3.2h1.066c1.765 0 3.2 1.436 3.2 3.2V18.2c0 1.764-1.435 3.2-3.2 3.2H27.8zM7.533 15h3.2v-3.2h-3.2V15zM5.4 17.133h7.466V9.667H5.4v7.466zM15 9.667h7.466V21.4h-2.133v-9.6h-3.2v9.6H15V9.667z"
          fill="#5D47EA"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_857_2558">
          <Path
            fill="#fff"
            transform="translate(.066 .067)"
            d="M0 0H32V32H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default HouseOnWheelsIcon;
