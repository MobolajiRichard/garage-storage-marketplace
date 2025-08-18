import {
    AntDesign,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

export default function SettingsMenu() {
  return (
    <View className="mt-4 flex-col divide-y divide-gray-200 bg-white pb-2">
      {LINKS().map((item, index) => (
        <Pressable
          key={index}
          className={twMerge(
            "flex flex-row items-center justify-between py-4",
            item.chevrolet && "border-b border-gray-100"
          )}
        >
          {item.icon}
          <Text
            className={twMerge(
              "flex-1 px-4 text-lg",
              !item.chevrolet && "color-[#959595]"
            )}
          >
            {item.title}
          </Text>
          {item.chevrolet && (
            <Entypo name="chevron-small-right" size={24} color="black" />
          )}
        </Pressable>
      ))}
      <Text className="color-gray-450 mt-3 h-full w-full">
        Garage Space 1.0.0
      </Text>
    </View>
  );
}

export const LINKS = () => [
  {
    icon: <AntDesign name="user" size={24} color="black" />,
    title: "Personal Information",
    path: "/(tabs)/(profile)/PersonalInformation",
    chevrolet: true,
  },
  {
    icon: <MaterialIcons name="warehouse" size={24} color="black" />,
    title: "My Spaces",
    path: "/(tabs)/(profile)/MyServices",
    chevrolet: true,
    isWorker: true,
  },

  {
    icon: <MaterialIcons name="security" size={24} color="black" />,
    title: "Security",
    path: "Security",
    chevrolet: true,
    isEmailProvider: true,
  },
  {
    icon: <Ionicons name="language-outline" size={24} color="black" />,
    title: "Language",
    path: "Languages",
    chevrolet: true,
  },
  {
    icon: <Ionicons name="help-circle-outline" size={24} color="black" />,
    title: "FAQ",
    onPress: () => {},
    chevrolet: true,
  },
  {
    icon: <SimpleLineIcons name="logout" size={24} color="black" />,
    title: "Log Out",
    logout: true,
    path: "",
    chevrolet: false,
  },
];
