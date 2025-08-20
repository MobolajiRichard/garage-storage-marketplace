import { Review } from "@/types";
import { formatDateToSlashes } from "@/utils/date";
import { EvilIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { Text, View } from "react-native";

const SpaceReviewCard: FC<Review> = (props) => {
    console.log({props})
  return (
    <View className="border rounded-[15px] p-6 border-gray-300 flex-row gap-4 w-full">
      <View className="bg-primary/50 w-[50px] h-[50px] rounded-full items-center justify-center">
        <Text className="font-bold text-white text-[16px]">
          {props?.user?.name[0]}
        </Text>
      </View>
      <View className="mt-1 flex-1">
        <View className="flex-row justify-between items-center">
          <Text className="font-medium text-[16px]" numberOfLines={1}>
            {props?.user?.name}
          </Text>
          <View className="flex-row items-center gap-1">
            <EvilIcons name="star" size={20} color="#4b5563" />
            <Text>{props?.rating}/5</Text>
          </View>
        </View>
        <Text className="text-gray-700 text-[14px] mt-2">{props?.review}</Text>
        <Text className="mt-4">{formatDateToSlashes(props?.createdAt!)}</Text>
      </View>
    </View>
  );
};

export default SpaceReviewCard;
