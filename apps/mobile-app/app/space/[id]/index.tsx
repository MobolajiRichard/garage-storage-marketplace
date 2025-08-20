import { Button, Container, SpaceOverview, SpaceReviews } from "@/components";
import BlackVeil from "@/components/BlackVeil";
import { useSingleSpace } from "@/hooks/useSpaces";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  ViewToken,
} from "react-native";
import { twMerge } from "tailwind-merge";


const SpaceDetails = () => {
  const params = useLocalSearchParams();
  const { id } = params as { id: string };

  const [activeTab, setActiveTab] = useState("overview");
  const { data } = useSingleSpace(id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentImageIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  return (
    <Container className="p-0 relative" fullScreen>
      <View className="h-[45vh] bg-primary/20 relative">
        {!!data?.images?.length && (
          <FlatList
            data={data?.images}
            horizontal
            showsVerticalScrollIndicator={false}
            pagingEnabled
            renderItem={({ item }) => (
              <Image
                className=" w-[100vw] h-[45vh] rounded-bl-[15px] rounded-br-[15px]"
                source={{
                  uri: item,
                }}
              />
            )}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            keyExtractor={(item) => item.toString()}
          />
        )}
        <View className="absolute bottom-[10px] items-center left-[45%] flex-row gap-2">
          {data?.images?.map((i, index) => (
            <View
              className={twMerge(
                "w-3 h-3 rounded-full bg-white",
                currentImageIndex === index && "w-4 h-4"
              )}
              key={i}
            />
          ))}
        </View>
      </View>

      <Pressable
        onPress={() => router.back()}
        className="w-[50px] h-[50px] absolute top-[50px] bg-white rounded-full left-[10px] items-center justify-center"
      >
        <Feather name="x" size={24} color="black" />
      </Pressable>
      <View className="p-6 flex-1">
        <View className="flex-row items-center justify-center gap-4">
          <Text
            onPress={() => setActiveTab("overview")}
            className={twMerge(
              "text-[16px] text-gray-600 font-medium pb-2 border-b-[3px]",
              activeTab === "overview" ? " border-b-primary" : "border-b-white"
            )}
          >
            Overview
          </Text>
          <Text
            onPress={() => setActiveTab("reviews")}
            className={twMerge(
              "text-[16px] text-gray-600 font-medium pb-2 border-b-[3px]",
              activeTab === "reviews" ? " border-b-primary" : "border-b-white"
            )}
          >
            Reviews
          </Text>
        </View>
        {activeTab === "overview" && <SpaceOverview data={data!} />}
        {activeTab === "reviews" && <SpaceReviews  data={data!} />}
      </View>
    </Container>
  );
};

export default SpaceDetails;
