import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

function HospitalIcon(props: SvgProps) {
  return (
    <Svg width={33} height={33} viewBox="0 0 33 33" fill="none" {...props}>
      <G clipPath="url(#clip0_857_2551)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M28.066 13.185h-5V7.803l-7-3.5-7 3.5v5.382h-5v6h6.114c1.243 0 2.372.782 2.81 1.946l.714 1.906a.23.23 0 00.214.148h.107c.112 0 .207-.08.226-.19l1.658-9.948a2.22 2.22 0 012.198-1.862c1.024 0 1.913.694 2.162 1.688l1.388 5.555a1 1 0 00.971.757h5.438v-6zm2-2v10h-7.438a2.999 2.999 0 01-2.91-2.271l-1.39-5.556c-.053-.211-.41-.196-.447.017l-1.658 9.948a2.22 2.22 0 01-2.198 1.862h-.107a2.238 2.238 0 01-2.087-1.446l-.715-1.906a1.005 1.005 0 00-.936-.648H2.066v-10h5V6.567l9-4.5 9 4.5v4.618h5zm-2 12h2v7h-28v-7h2v5h24v-5z"
          fill="#5D47EA"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_857_2551">
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

export default HospitalIcon;
