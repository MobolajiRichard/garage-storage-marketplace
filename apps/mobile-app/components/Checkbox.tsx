import { Pressable, View } from "react-native";
import React, { FC } from "react";
import { twMerge } from "tailwind-merge";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CheckboxProps {
  onPress?: () => void;
  checked?: boolean;
};

const CheckboxSquared: FC<CheckboxProps> = ({ onPress, checked = false }) => {
  return (
    <Pressable
      onPress={onPress}
      className={twMerge(
        "w-5 h-5 rounded-[3px] border items-center justify-center",
        checked ? "border-primary" : "border-gray-400"
      )}
    >
      {checked && (
        <View className="w-full h-full bg-primary items-center justify-center">
          <MaterialCommunityIcons name="check" size={12} color="white" />
        </View>
      )}
    </Pressable>
  );
};

export default CheckboxSquared;
