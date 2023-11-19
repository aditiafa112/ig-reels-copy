import React from "react";
import Svg, { Path, G } from "react-native-svg";
import IconWrapper from "../../components/atoms/IconWrapper";
import { IIconProps } from "../../type/icons.type";

export default function UserIcon(props: IIconProps) {
  return (
    <IconWrapper style={props.wrapper?.style} disabled={props.disabled} onPress={props.onPress} {...props.wrapper}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
          stroke="#292D32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </IconWrapper>
  );
}
