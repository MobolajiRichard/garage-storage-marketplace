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
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SpaceProps } from "@/types";
import { twMerge } from "tailwind-merge";
import { getCurrencySymbol } from "@/utils/price";
import Skeleton from "../Skeleton";
import { router } from "expo-router";
import { queryClient } from "@/app/_layout";
import Toast from "react-native-toast-message";
import { deleteSpace } from "@/queries";

const MySpaceCard: FC<SpaceProps> = ({
  images,
  title,
  price,
  Address,
  currency,
  isBooked,
  id
}) => {

  const onDelete = async () => {
      try {
        await deleteSpace(id!);
        queryClient.invalidateQueries({ queryKey: ["mySpaces"] });
        Toast.show({
          type: "success",
          text1: "Space Deleted",
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Please Try Again!",
        });
      }
    };
  return (
    <View className="mt-6">
      <View
        style={SHADOW_STYLE}
        className="border border-gray-200 rounded-[15px] p-6 flex-row gap-3"
      >
        <View className="flex-row flex-1 gap-4 items-stretch">
          {images?.length > 0 ? (
            <Image
              source={{
                uri: images?.[0],
              }}
              className="h-[100px] w-[100px] rounded-[15px] "
            />
          ) : (
            <View className="h-[100px] w-[100px] rounded-[15px] bg-primary/50" />
          )}
          <View className="justify-between my-1">
            <View>
              <Text className="font-semibold text-[14px] mt-0.5">{title}</Text>
              <View className="flex-row items-center gap-[4px] mt-1">
                <Text className="font-medium">{Address?.city}</Text>
                <Text className="text-[14px]">
                  {getCurrencySymbol(currency)}
                  {price}/hr
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3 ">
              <View
                className={twMerge(
                  "w-[8px] h-[8px] rounded-full ",
                  isBooked ? "bg-gray-500" : "bg-green-500"
                )}
              />
              <Text className="font-medium">
                {isBooked ? "Booked" : "Not Booked"}
              </Text>
            </View>
          </View>
        </View>
        <View className="justify-self-end mt-1">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onPress={() => router.push(`/space/${id}`)} className="flex-row items-center gap-2 border-b border-gray-300 !px-3 !py-3">
                <AntDesign name="eye" size={20} color="black" />
                <Text className="font-medium">View</Text>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex-row items-center gap-2 border-b border-gray-300 !px-3 !py-3">
                <Feather name="edit" size={20} color="black" />
                <Text className="font-medium">Edit</Text>
              </DropdownMenuItem>
              <DropdownMenuItem onPress={onDelete} className="flex-row items-center gap-2  !px-3 !py-3">
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={20}
                  color="tomato"
                />
                <Text className="font-medium text-[tomato]">Delete</Text>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </View>
      </View>
    </View>
  );
};

export const SpaceCardSkeleton = () => {
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
          </View>
        </View>
        <Skeleton className="h-[50px] w-[10px]" />
      </View>
    </View>
  );
};

export default MySpaceCard;
