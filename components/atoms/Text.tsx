import { Text as DefaultText } from "react-native";
import { FontFamily } from "../../constants/Theme";

export type TextProps = DefaultText["props"];

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;

  return (
    <DefaultText
      style={[
        {
          color: "#000",
          fontFamily: FontFamily.Regular.name,
          fontWeight: FontFamily.Regular.weight,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
