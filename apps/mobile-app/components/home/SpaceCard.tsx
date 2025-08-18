import { IMAGES } from "@/assets/images";
import React from "react";
import { ImageBackground, Pressable, Text, View, Image } from "react-native";
import BlackVeil from "../BlackVeil";
import { AntDesign } from "@expo/vector-icons";

const SpaceCard = () => {
  return (
    <View className=" rounded-[15px] w-[150px]">
      <View className="relative">
        <Image
          source={IMAGES.householdGarage}
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
        <Text className="text-[12px] font-semibold">Room In London</Text>
        <View className="flex-row items-center justify-between">
            <Text className="text-[11px] mt-1">$40/hr</Text>
            <View className="flex-row gap-1 items-center">
                <AntDesign name="star" size={10} color="black" />
                <Text className="text-[11px] mt-1">4.89</Text>
            </View>
        </View>
      </View>
    </View>
  );
};

export default SpaceCard;
