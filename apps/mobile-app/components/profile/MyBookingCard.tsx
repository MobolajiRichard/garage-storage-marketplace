import { SHADOW_STYLE } from "@/constants/Colors";
import React, { FC } from "react";
import { Image, Text, View } from "react-native";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Dropdown";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Booking, SpaceProps } from "@/types";
import { twMerge } from "tailwind-merge";
import { getCurrencySymbol } from "@/utils/price";
import Skeleton from "../Skeleton";
import { router } from "expo-router";
import { formatDateTime } from "@/utils/date";

const MyBookingCard: FC<Booking> = ({
  price,
  currency,
  space,
  endAt,
  startAt,

  id,
}) => {
  return (
    <View className="mt-6">
      <View
        style={SHADOW_STYLE}
        className="border border-gray-200 rounded-[15px] p-6 flex-row gap-3"
      >
        <View className="flex-row flex-1 gap-4 items-stretch">
          {!!space?.images?.length ? (
            <Image
              source={{
                uri: space?.images?.[0],
              }}
              className="h-[100px] w-[100px] rounded-[15px] "
            />
          ) : (
            <View className="h-[100px] w-[100px] rounded-[15px] bg-primary/50" />
          )}
          <View className="justify-between my-1">
            <View>
              <Text className="font-semibold text-[14px] mt-0.5">
                {space?.title}
              </Text>
              <View className="flex-row items-start gap-[8px] mt-3">
                <FontAwesome name="map-pin" size={16} color="#9d9d9d" />
                <Text className="font-medium w-[70%]">
                  {space?.Address?.address} {space?.Address?.city}{" "}
                  {space?.Address?.country}
                </Text>
              </View>
              <View className="mt-4">
                <View className="flex-row items-center gap-1">
                  <FontAwesome name="calendar" size={16} color="black" />
                  <Text className="font-medium">From</Text>
                </View>
                <Text className="mt-1">{formatDateTime(startAt?.toString())}</Text>
              </View>
              <View className="mt-4">
                <View className="flex-row items-center gap-1">
                  <FontAwesome name="calendar" size={16} color="black" />
                  <Text className="font-medium">To</Text>
                </View>
                <Text className="mt-1">{formatDateTime(endAt?.toString())}</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="justify-self-end mt-1">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex-row items-center gap-2  !px-3 !py-3">
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={20}
                  color="tomato"
                />
                <Text className="font-medium text-[tomato]">Cancel</Text>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </View>
      </View>
    </View>
  );
};

export const BookingCardSkeleton = () => {
  return (
    <View className="mt-6">
      <View
        style={SHADOW_STYLE}
        className="border border-gray-200 rounded-[15px] p-6 flex-row gap-3 justify-between"
      >
        <View className="flex-row gap-4">
          <Skeleton className="h-[100px] w-[100px] rounded-[15px]" />
          <View>
            <Skeleton className="h-[10px] w-[100px] rounded-[15px] mt-2" />
            <Skeleton className="h-[10px] w-[50px]  mt-4" />
          <View>
            <Skeleton className="h-[10px] w-[100px] rounded-[15px] mt-2" />
            <Skeleton className="h-[10px] w-[50px]  mt-4" />
          </View>
          </View>
        </View>
        <Skeleton className="h-[50px] w-[10px]" />
      </View>
    </View>
  );
};

export default MyBookingCard;
