import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import axios from "axios";
import { AVPlaybackStatus } from "expo-av";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import Toast from "react-native-root-toast";
import Loading from "../components/Loading";
import VideoItem from "../components/VideoItem";
import VideoProgressBar from "../components/VideoProgressBar";
import { IVideoList, IVideos } from "../type/videos.type";

type RenderItem = ListRenderItemInfo<IVideos>;

export default function Page() {
  const pgBar = useRef(new Animated.Value(0)).current;
  const flashListRef = useRef<FlashList<IVideos> | null>(null);

  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<IVideos[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getVideos = async () => {
      setLoading(true);
      await axios
        .get<IVideoList>("https://sandbox.api.video/videos", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer WjgQ4z13OwOJePdsENWGyP5Ip6EyJom3YDRixFRYmfm",
          },
        })
        .then((response) => {
          setVideos(response.data.data);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getVideos();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const updateBar = (index: number) => {
    pgBar.setValue(index);
  };

  const scrollNext = (index: number) => {
    if (flashListRef.current !== null && index <= videos.length - 1) {
      setPage(index);
      flashListRef.current.scrollToIndex({
        index,
        animated: true,
      });
    } else {
      setPage(index);
      Toast.show("End of list");
    }
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const currentIndex = Math.floor(contentOffset.y / layoutMeasurement.height);
    updateBar(0);
    setPage(currentIndex);
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus, index: number) => {
    if (status.isLoaded) {
      if (status.durationMillis !== undefined) {
        updateBar((status.positionMillis / status.durationMillis) * 100);
      }
      if (status.didJustFinish) {
        scrollNext(index + 1);
      }
    }
  };

  const renderItem = ({ item, index, extraData }: RenderItem) => (
    <VideoItem
      title={item.title}
      description={item.description}
      poster={item.assets.thumbnail}
      uri={item.assets.hls}
      shouldPlay={index === extraData.page}
      onPlaybackStatusUpdate={(status) => onPlaybackStatusUpdate(status, index)}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlashList
        ref={flashListRef}
        pagingEnabled
        initialScrollIndex={0}
        data={videos}
        keyExtractor={(item) => item.videoId}
        estimatedItemSize={50}
        extraData={{ page }}
        renderItem={renderItem}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
      <VideoProgressBar animatedValue={pgBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
});
