import React from "react";
import { Animated, StyleSheet, View, useWindowDimensions } from "react-native";

interface IVideoProgressBar {
  animatedValue: Animated.Value;
}

const VideoProgressBar = ({ animatedValue }: IVideoProgressBar) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.progressBarWrapper}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: [-width, 0],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default VideoProgressBar;

const styles = StyleSheet.create({
  progressBarWrapper: {
    position: "absolute",
    width: "100%",
    backgroundColor: "transparent",
    bottom: 0,
    left: 0,
  },
  progressBar: {
    width: "100%",
    backgroundColor: "#fff",
    height: 1,
  },
});
