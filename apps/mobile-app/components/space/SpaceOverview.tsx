import {
  AntDesign,
  EvilIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import Button from "../Button";
import { SpaceProps } from "@/types";
import { getCurrencySymbol } from "@/utils/price";

const SpaceOverview = ({ data }: { data: SpaceProps }) => {
  return (
    <ScrollView className="flex-1 mb-5" showsVerticalScrollIndicator={false}>
      <View className="mt-6">
        <Text>{data?.title}</Text>

        <View className="mt-6 flex-row mb-1 items-center gap-2">
          <AntDesign
            name="infocirlceo"
            className="mt-1"
            size={20}
            color="#4b5563"
          />
          <Text className="text-[16px] font-semibold text-gray-600">
            Description
          </Text>
        </View>
        <Text className="ml-8">{data?.description}</Text>

        <View className="mt-6 flex-row mb-1 items-center gap-2">
          <FontAwesome5
            className="mt-1"
            name="map-pin"
            size={24}
            color="#4b5563"
          />
          <Text className="text-[16px] font-semibold text-gray-600">
            Location
          </Text>
        </View>
        <Text className="ml-8">
          {data?.Address?.address} {data?.Address?.city}{" "}
          {data?.Address?.country}
        </Text>

        <View className="mt-6 flex-row mb-1 items-center gap-2">
          <FontAwesome
            name="money"
            size={20}
            color="#4b5563"
            className="mt-1"
          />
          <Text className="text-[16px] font-semibold text-gray-600">Price</Text>
        </View>
        <Text className="ml-8">{getCurrencySymbol(data?.currency)}{data?.price}/hr</Text>

        <View className="flex-row items-center mt-6  mb-1 gap-2">
          <View className="flex-row items-center gap-2">
            <EvilIcons name="star" size={24} color="#4b5563" className="mt-1" />
            <Text className="text-[16px] font-semibold text-gray-600">
              Rating
            </Text>
          </View>
          <Text>- {!data?.rating  ? "No ratings yet." : `${data?.rating}/5`}</Text>
        </View>

        <Button text="Book Now" className="mt-6" />
      </View>
    </ScrollView>
  );
};

export default SpaceOverview;
