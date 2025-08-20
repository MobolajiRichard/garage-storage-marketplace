import { NotificationProps } from "@/types";
import { formatDateTime } from "@/utils/date";
import { AntDesign } from "@expo/vector-icons";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { twMerge } from "tailwind-merge";
import Skeleton from "../Skeleton";

const NotificationCard: FC<NotificationProps> = ({
  createdAt,
  title,
  content,
}) => {
  return (
    <TouchableOpacity className="w-full flex-row items-start gap-[10px]">
      <View className="h-12 w-12 bg-primary/30 shrink-0 items-center justify-center rounded-full">
        <AntDesign name="setting" size={24} color="black" />
      </View>

      <View className="flex-1">
        <View className="mt-2 flex-row gap-1">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className={twMerge("flex-1 font-semibold text-[16px] text-[#0D0D0D]")}
          >
            {title}
          </Text>
          <Text className="shrink-0 font-medium text-[#959595]">
            {formatDateTime(createdAt?.toString()!)}
          </Text>
        </View>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="mt-0.5 text-[#959595]"
        >
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const NotificationCardSkeleton = () => {
  return (
    <Skeleton
      className="mx-2 flex flex-row items-start gap-4 border- rounded-[15px] border-gray-200 py-6"
      pulse={true}
    >
      <Skeleton className="size-12 rounded-full" />
      <View className="flex flex-1 flex-col gap-2">
        <View className="flex flex-col gap-1">
          <Skeleton className="h-5 w-5/6 rounded-md" />
          <Skeleton className="h-5 w-full rounded-md" />
        </View>
        <View className="flex flex-row gap-4">
          {[1, 2].map((_, index) => (
            <Skeleton key={index} className="h-10 w-24 rounded-xl" />
          ))}
        </View>
      </View>
    </Skeleton>
  );
};

export default NotificationCard;
