import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

function ApplianceIcon(props: SvgProps) {
  return (
    <Svg width={33} height={33} viewBox="0 0 33 33" fill="none" {...props}>
      <G clipPath="url(#clip0_857_2563)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.066 13.933v2.134a2.135 2.135 0 00-2.133 2.133h-2.134a4.271 4.271 0 014.267-4.267zm0 10.667c-3.53 0-6.4-2.87-6.4-6.4 0-3.53 2.87-6.4 6.4-6.4 3.53 0 6.4 2.87 6.4 6.4 0 3.53-2.87 6.4-6.4 6.4zm0-14.933c-4.705 0-8.533 3.828-8.533 8.533s3.828 8.533 8.533 8.533 8.533-3.828 8.533-8.533-3.828-8.533-8.533-8.533zm-2.133-2.134h10.666V5.4H13.933v2.133zm-6.4 0h4.266V5.4H7.533v2.133zm20.266 22.4l-23.466.001V3.267c0-.59.478-1.067 1.066-1.067h21.334c.587 0 1.066.478 1.066 1.067v26.666zM26.733.067H5.399a3.204 3.204 0 00-3.2 3.2v26.666c0 1.177.957 2.134 2.134 2.134h23.466a2.136 2.136 0 002.134-2.134V3.267c0-1.765-1.436-3.2-3.2-3.2z"
          fill="#5D47EA"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_857_2563">
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

export default ApplianceIcon;
