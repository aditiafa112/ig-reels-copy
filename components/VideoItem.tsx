import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import React, { Fragment, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  TextProps,
  View,
  useWindowDimensions,
} from "react-native";
import Toast from "react-native-root-toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  HeartIcon,
  NotificationIcon,
  SearchIcon,
  SendIcon,
  UserIcon,
} from "../assets/icons";
import { Text } from "./atoms";
import { FontFamily } from "../constants/Theme";
interface IVideoItem {
  title: string;
  description: string;
  poster: string;
  uri: string;
  shouldPlay: boolean;
  onPlaybackStatusUpdate: (status: AVPlaybackStatus) => void;
}

const VideoItem: React.FunctionComponent<IVideoItem> = ({
  title,
  description,
  poster,
  uri,
  shouldPlay,
  onPlaybackStatusUpdate,
}) => {
  const descTextHight = useRef(0);
  const descWrapperRef = useRef(new Animated.Value(0)).current;
  const [descExpand, setDescExpand] = useState(false);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [pause, setPause] = useState(false);

  const showDescVisible = () => {
    setDescExpand(true);
    Animated.timing(descWrapperRef, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const hideDescVisible = () => {
    setDescExpand(false);
    Animated.timing(descWrapperRef, {
      toValue:
        Platform.OS === "ios"
          ? descTextHight.current + insets.bottom + 20 - 4
          : descTextHight.current + 10 + 20 - 4,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const toogleDescVisible = () =>
    descExpand ? hideDescVisible() : showDescVisible();

  return (
    <Fragment>
      <Video
        source={{
          uri: uri,
        }}
        shouldPlay={!pause && shouldPlay}
        isLooping
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        volume={1.0}
        isMuted={false}
        style={{
          ...Platform.select({
            ios: {
              height: height,
            },
            android: {
              height: height + insets.top,
            },
            default: {
              height,
            },
          }),
          width: width,
        }}
      />
      <View
        style={{
          position: "absolute",
          width,
          height,
        }}
      >
        <View style={styles.videoContentWrapper}>
          <View
            style={[
              styles.videoHeadContent,
              {
                marginTop: Platform.OS === "ios" ? insets.top : insets.top + 20,
              },
            ]}
          >
            <UserIcon onPress={() => Toast.show("User icon pressed.")} />
            <SearchIcon onPress={() => Toast.show("Send icon pressed.")} />
          </View>
          <Pressable
            style={{
              backgroundColor: "transparent",
              flex: 1,
              marginBottom: -150,
            }}
            onPress={toogleDescVisible}
            onPressIn={() => {
              // setPause(true);
            }}
            onPressOut={() => {
              // setPause(false);
            }}
          />
          <Animated.View
            style={{ transform: [{ translateY: descWrapperRef }] }}
          >
            <View style={styles.videoActionContent}>
              <NotificationIcon
                onPress={() => Toast.show("Notification icon pressed.")}
              />
              <SendIcon
                wrapper={{ style: { marginHorizontal: 10 } }}
                onPress={() => Toast.show("Send icon pressed.")}
              />
              <HeartIcon onPress={() => Toast.show("Heart icon pressed.")} />
            </View>

            <Pressable
              onPress={toogleDescVisible}
              style={[
                styles.videoDescWrapper,
                {
                  marginBottom: Platform.OS === "ios" ? insets.bottom : 10,
                },
              ]}
            >
              <Text style={styles.videoDescTitle} allowFontScaling={false}>
                {title}
              </Text>
              <Text
                style={styles.videoDescText}
                allowFontScaling={false}
                onLayout={(event) => {
                  const textHeight = event.nativeEvent.layout.height;
                  descTextHight.current = textHeight;
                  descWrapperRef.setValue(
                    Platform.OS === "ios"
                      ? textHeight + insets.bottom + 20 - 4
                      : textHeight + insets.top + 10 + 20 - 4
                  );
                }}
              >
                {description}
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </Fragment>
  );
};

export default VideoItem;

const styles = StyleSheet.create({
  videoContentWrapper: {
    flex: 1,
    position: "relative",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  videoHeadContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  videoActionContent: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 6,
  },
  videoDescWrapper: {
    backgroundColor: "rgba(245, 245, 245, 0.50)",
    padding: 20,
    borderRadius: 10,
  },
  videoDescTitle: {
    fontSize: 16,
    fontWeight: FontFamily.Bold.weight,
    fontFamily: FontFamily.Bold.name,
    marginBottom: 4,
    letterSpacing: -0.32,
  },
  videoDescText: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: -0.24,
  },
});
