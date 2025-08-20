import { IMAGES } from "@/assets/images";
import React, { FC, useMemo } from "react";
import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
} from "react-native";
import BlackVeil from "../BlackVeil";
import { CategoryProps } from "@/constants/categories";

const CategoryCard: FC<CategoryProps & {onPress:() => void}> = ({ name, image, onPress }) => {
  const windowWidth = useMemo(() => Dimensions.get("window").width, []);
  const size = useMemo(() => windowWidth / 2 - 30, [windowWidth]);
  return (
    <TouchableOpacity
      style={{ width: size, height: size }}
      className="rounded-[15px] relative  items-center justify-end"
      activeOpacity={0.8}
      onPress={onPress}
    >
      <ImageBackground
        source={image}
        className="h-full w-full rounded-[15px] absolute top-0 z-10"
        borderRadius={15}
        style={{ width: size, height: size }}
      />
      <BlackVeil className="rounded-[15px] " />
      <Text className="text-white capitalize font-bold text-[18px] z-30 relative mb-4 mx-4 text-center">
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
