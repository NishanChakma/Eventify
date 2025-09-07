import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { colors } from "../utils";

const SCROLL_TEXT =
  "Most Common search keywords: Hello, Music, live, concerts, thearter. City Keywords: New York, Chicago, Los Angeles, Paris.";

export default function ScrollingText() {
  const translateX = useSharedValue(5);

  useEffect(() => {
    // Infinite scrolling loop
    translateX.value = withRepeat(
      withTiming(-SCROLL_TEXT.length * 5, { duration: 15000 }),
      -1, // -1 = infinite
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={{
        height: 40,
        overflow: "hidden",
        backgroundColor: colors.inputColor,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Animated.Text
        style={[
          {
            fontSize: 16,
            color: "white",
          },
          animatedStyle,
        ]}
        numberOfLines={1}
      >
        {SCROLL_TEXT}
      </Animated.Text>
    </View>
  );
}
