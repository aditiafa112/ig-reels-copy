import { View as DefaultView } from "react-native";

export type IconWrapper = DefaultView["props"];

export interface IIconProps {
  wrapper?: IconWrapper;
  children?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
}
