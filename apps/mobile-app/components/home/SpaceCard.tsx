import { IMAGES } from "@/assets/images";
import React, { FC } from "react";
import { ImageBackground, Pressable, Text, View, Image } from "react-native";
import BlackVeil from "../BlackVeil";
import { AntDesign } from "@expo/vector-icons";
import { SpaceProps } from "@/types";
import { getCurrencySymbol } from "@/utils/price";
import Skeleton from "../Skeleton";
import { router } from "expo-router";

const SpaceCard: FC<SpaceProps> = (props) => {
  return (
    <Pressable onPress={() => router.push(`/space/${props.id}`)} className=" rounded-[15px] w-[150px]">
      <View className="relative">
        <Image
          source={{ uri: props?.images?.[0] }}
          className=""
          style={{
            width: 150,
            height: 150,
            borderRadius: 15,
          }}
        />
        <BlackVeil className="rounded-[15px] bg-black/20" />
        <Pressable className="z-30 absolute top-4 right-4">
          <AntDesign name="hearto" size={24} color="white" />
        </Pressable>
      </View>
      <View className="mt-2 px-1">
        <Text numberOfLines={1} className="text-[12px] font-semibold">
          {props?.title}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-[11px] mt-1">
            {getCurrencySymbol(props?.currency)}
            {props?.price}/hr
          </Text>
          <View className="flex-row gap-1 items-center">
            <AntDesign name="star" size={10} color="black" />
            <Text className="text-[11px] ">
              {props?.rating ? props?.rating : 1}/5
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export const HomeSpaceCardSkeleton = () => {
  return <Skeleton className="w-[150px] h-[150px] rounded-[15px]" pulse />;
};

export default SpaceCard;
