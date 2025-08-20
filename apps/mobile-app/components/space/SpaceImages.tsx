import React, { useEffect } from "react";
import { Alert, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { View } from "react-native";
import { Text } from "react-native";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import Button from "../Button";
import { pickImage } from "@/utils/image";
import { Entypo, Feather } from "@expo/vector-icons";

const SpaceImages = ({
  images,
  setImages,
}: {
  images: string[];
  setImages: (images: string[]) => void;
}) => {
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const addScreenshot = () => {
    if (images.length < 6) {
      pickImage(setImages, images, [9, 16]);
    } else {
      Toast.show({
        type: "error",
        text1: "Image Limit reached",
      });
    }
  };

  return (
    <View className="mt-6">
      <Text className="mb-8 font-semibold ml-1">
        Select images to show your space
      </Text>

      <View className="mb-4 flex-row flex-wrap">
        {images.map((image, index) => (
          <View key={index} className="aspect-square w-1/3 p-1">
            <View className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
              <Pressable
                className="absolute right-1 top-1 rounded-full bg-red-500 p-1"
                onPress={() => removeImage(index)}
              >
                <Feather name="x" size={16} color="black" />
              </Pressable>
            </View>
          </View>
        ))}
        {/* Add screenshot button - show up to 6 total items */}
        {images.length < 6 && (
          <Pressable
            className="aspect-square w-1/3 p-1"
            onPress={addScreenshot}
          >
            <View className="h-full w-full items-center justify-center border-dashed rounded-lg border border-gray-300">
              <Entypo name="plus" size={24} color="#28287a" />
            </View>
          </Pressable>
        )}
        {/* Empty placeholders to complete the grid */}
        {images.length < 5 &&
          Array(5 - images.length)
            .fill(0)
            .map((_, i) => (
              <Pressable
                key={`empty-${i}`}
                className="aspect-square w-1/3 p-1"
                onPress={addScreenshot}
              >
                <View className="h-full w-full items-center justify-center border-dashed rounded-lg border border-gray-300">
                  <Entypo name="plus" size={24} color="#28287a" />
                </View>
              </Pressable>
            ))}
      </View>

    </View>
  );
};

export default SpaceImages;
