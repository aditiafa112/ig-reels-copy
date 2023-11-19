import React from "react";
import Svg, { Path, G } from "react-native-svg";
import IconWrapper from "../../components/atoms/IconWrapper";
import { IIconProps } from "../../type/icons.type";

export default function SearchIcon(props: IIconProps) {
  return (
    <IconWrapper style={props.wrapper?.style} disabled={props.disabled} onPress={props.onPress} {...props.wrapper}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <G id="vuesax/linear/search-normal">
          <G id="search-normal">
            <Path
              id="Vector"
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              id="Vector_2"
              d="M22 22L20 20"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </G>
        </G>
      </Svg>
    </IconWrapper>
  );
}
