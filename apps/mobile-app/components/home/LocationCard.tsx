import { IMAGES } from "@/assets/images";
import React, { useMemo } from "react";
import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
} from "react-native";
import BlackVeil from "../BlackVeil";

const LocationCard = ({
    name,
    image
}:{
    name:string,
    image: ImageSourcePropType
}) => {
  const windowWidth = useMemo(() => Dimensions.get("window").width, []);
  const size = useMemo(() => windowWidth / 2 - 24, [windowWidth]);
  return (
    <TouchableOpacity
      className="rounded-[15px] h-[150px] w-[150px] relative  items-center justify-end"
      activeOpacity={0.8}
    >
      <ImageBackground
        source={image}
        className="h-[150px] w-[150px] rounded-[15px] absolute top-0 z-10"
        borderRadius={15}
      />
      <BlackVeil className="rounded-[15px] " />
      <Text className="text-white capitalize font-bold text-[18px] z-30 relative mb-4 mx-4 text-center">
       {name}
      </Text>
    </TouchableOpacity>
  );
};

export default LocationCard;
