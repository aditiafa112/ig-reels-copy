import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

type IconWrapperProps = View["props"] & {
  disabled?: boolean;
  onPress?: () => void;
};

export default function IconWrapper({
  disabled,
  onPress,
  children,
  style,
  ...props
}: IconWrapperProps) {
  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
      onPressOut={onPress}
    >
      <View style={[styles.wrapper, style]} {...props}>
        {children}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 13,
    backgroundColor: "rgba(245, 245, 245, 0.5)",
    borderRadius: 99,
  },
});
