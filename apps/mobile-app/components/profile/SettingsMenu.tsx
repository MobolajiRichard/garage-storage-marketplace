import { useUser } from "@/hooks/useUser";
import { handleLogout } from "@/utils/handleLogout";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { RelativePathString, useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

export default function SettingsMenu() {
  const router = useRouter();
  const { data: user } = useUser();


  const links = useMemo(() => {
    let links = user?.id
      ? LINKS()
      : LINKS()?.filter((item) => !item.isAuthenticated);

    if (!user?.hostProfile?.id) {
      links = links.filter((item) => !item.isHost);
    }

    return links || [];
  }, [user]);

  return (
    <View className="mt-4 flex-col pb-2">
      {links.map((item, index) => (
        <Pressable
          key={index}
          className={twMerge("flex flex-row items-center justify-between py-6")}
          onPress={() => {
            if (item?.logout) {
              handleLogout();
            } else if (item.onPress) {
              item.onPress();
            } else {
              router.push((item.path as RelativePathString) || "");
            }
          }}
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
      <View className=" border-gray-300 border-[0.5px] my-4"/>
      <Text className="text-gray-400 mt-3 h-full w-full">
        Garage Space 1.0.0
      </Text>
    </View>
  );
}

export const LINKS = () => [
  {
    icon: <AntDesign name="user" size={24} color="black" />,
    title: "Personal Information",
    path: "/(tabs)/profile/PersonalInformation",
    chevrolet: true,
    isAuthenticated: true,
  },
  {
    icon: <MaterialIcons name="warehouse" size={24} color="black" />,
    title: "My Spaces",
    path: "/(tabs)/profile/MySpaces",
    chevrolet: true,
    isHost: true,
    isAuthenticated: true,
  },

  {
    icon: <MaterialIcons name="security" size={24} color="black" />,
    title: "Security",
    path: "/(tabs)/profile/Security",
    chevrolet: true,
    isEmailProvider: true,
    isAuthenticated: true,
  },
  {
    icon: <Ionicons name="language-outline" size={24} color="black" />,
    title: "Language",
    path: "/(tabs)/profile/Languages",
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
    isAuthenticated: true,
  },
];
