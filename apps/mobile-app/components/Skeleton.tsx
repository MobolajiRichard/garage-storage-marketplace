import { View, Text } from "react-native";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function Skeleton({
  children,
  className = "",
  pulse = true,
}: {
  children?: React.ReactNode;
  className: string;
  pulse?: boolean;
}) {
  return (
    <View
      className={twMerge(
        `${pulse ? "animate-pulse bg-gray-200" : "bg-gray-300"}`,
        className
      )}
    >
      {children}
    </View>
  );
}
