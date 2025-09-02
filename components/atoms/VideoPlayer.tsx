import { Colors } from "@/constants/Colors";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export default function VideoPlayer({
  style,
  videoSource,
}: {
  style?: StyleProp<ViewStyle>;
  videoSource: string;
}) {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    const subscription = player.addListener("playingChange", (isPlaying) => {
      setIsPlaying(isPlaying.isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  return (
    <View>
      <VideoView
        ref={ref}
        style={style ?? styles.video}
        player={player}
        nativeControls
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.gray500,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
