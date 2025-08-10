import * as React from "react";
import Svg, {
  Circle,
  Ellipse,
  G,
  Mask,
  Path,
  Rect,
  SvgProps,
} from "react-native-svg";

function EmptyProfileIcon(props: SvgProps) {
  return (
    <Svg width={64} height={64} viewBox="0 0 64 64" fill="none" {...props}>
      <Circle cx={32} cy={32} r={32} fill="#7267F0" />
      <Circle cx={32.1604} cy={23.5193} r={9.76} fill="#fff" />
      <Mask
        id="a"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={64}
        height={64}
      >
        <Circle cx={32} cy={32} r={32} fill="#524CA9" />
      </Mask>
      <G mask="url(#a)">
        <Rect
          x={44.1621}
          y={34.2393}
          width={5.12}
          height={1.28}
          rx={0.64}
          fill="#DBD9FF"
        />
        <Rect
          width={5.12}
          height={1.28}
          rx={0.64}
          transform="matrix(-1 0 0 1 20.162 34.24)"
          fill="#DBD9FF"
        />
        <Rect
          x={43.1992}
          y={32.9126}
          width={5.12}
          height={1.28}
          rx={0.64}
          transform="rotate(-60 43.2 32.913)"
          fill="#DBD9FF"
        />
        <Rect
          width={5.12}
          height={1.28}
          rx={0.64}
          transform="scale(-1 1) rotate(-60 17.945 34.744)"
          fill="#DBD9FF"
        />
        <Path
          d="M9.121 58.56c4.352-16.256 15.04-21.92 19.84-22.72-11.392 3.968-14.453 18.933-14.56 25.92l-5.28-3.2z"
          fill="#5D47EA"
        />
        <Ellipse cx={32.0004} cy={57.2795} rx={17.6} ry={21.76} fill="#fff" />
      </G>
    </Svg>
  );
}

export default EmptyProfileIcon;
