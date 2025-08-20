import { Dimensions, FlatList, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { SpaceProps } from "@/types";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { getCurrencySymbol } from "@/utils/price";
import { router } from "expo-router";

const SpaceResultCard = ({
  price,
  title,
  rating,
  currency,
  images,
  Address,
  ratingCount,
  id
}: SpaceProps) => {
  const pan = Gesture.Pan().activeOffsetX([-30, 30]).failOffsetY([-10, 10]);
  const { width } = Dimensions.get("window");

  return (
    <View className="relative h-full z-30">
      <GestureDetector gesture={pan}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          style={{ height: "100%" }}
          data={images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="h-full" style={{ width }}>
              <Image
                source={item}
                contentFit="cover"
                style={{ height: "100%", width: "100%" }}
              />
            </View>
          )}
        />
      </GestureDetector>
      <Text className="absolute left-[24px] bottom-[200px] text-white font-bold z-40 text-[30px]">
        {getCurrencySymbol(currency)}
        {price}/hr
      </Text>
      <Text
        numberOfLines={1}
        className="absolute w-[60%]  left-[24px] bottom-[160px] text-white font-bold z-40 text-[24px]"
      >
        {title}
      </Text>
      <View className="absolute flex-row  left-[24px] bottom-[120px] z-40 gap-2">
        <FontAwesome name="map-pin" size={24} color="white" />
        <View className="flex-row items-center gap-2">
          <Text className="text-white font-semibold text-[20px]">
            {Address?.city}, {Address?.country}
          </Text>
        </View>
      </View>
      <View className="absolute flex-row  left-[24px] bottom-[80px] z-40 gap-2">
        <FontAwesome name="star-o" size={24} color="white" />
        <View className="flex-row items-center gap-2">
          <Text className="text-white font-semibold text-[20px]">
            {rating ? rating : 0}/5 ({ratingCount})
          </Text>
        </View>
      </View>
      <Pressable onPress={() => router.push(`/space/${id}`)}  className="absolute flex-row justify-center w-[50px] h-[50px] items-center rounded-full bg-white/30 right-[24px] bottom-[220px] z-40 gap-2">
        <Ionicons name="arrow-redo-outline" size={24} color="white" />
      </Pressable>

      <Pressable className="absolute flex-row justify-center w-[50px] h-[50px] items-center rounded-full bg-white/30 right-[24px] bottom-[150px] z-40 gap-2">
        <AntDesign name="hearto" size={24} color="white" />
      </Pressable>

      <Pressable className="absolute flex-row justify-center w-[50px] h-[50px] items-center rounded-full bg-white/30 right-[24px] bottom-[80px] z-40 gap-2">
        <Ionicons name="chatbubble-outline" size={24} color="white" />
      </Pressable>

      <Animated.View
        className="absolute inset-0 bg-black opacity-30"
        pointerEvents="none"
      />
    </View>
  );
};

export default SpaceResultCard;
