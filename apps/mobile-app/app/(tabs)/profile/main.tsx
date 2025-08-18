import { Container } from "@/components";
import SettingsMenu from "@/components/profile/SettingsMenu";
import { SHADOW_STYLE } from "@/constants/Colors";
import React from "react";
import { Text, View } from "react-native";

const Profile = () => {
  return (
    <Container className="pt-0" scrollable fullScreen>
      <View style={SHADOW_STYLE} className="border border-gray-200 p-4 rounded-[15px] items-center justify-center mt-6">
        <View className="bg-primary w-[150px] h-[150px] rounded-full items-center justify-center">
          <Text className="text-[48px] font-medium text-white">M</Text>
        </View>
        <Text className="mt-4 font-semibold text-[20px]">Mobolaji</Text>
        <Text className="mt-3">Guest</Text>
      </View>
      <SettingsMenu/>
    </Container>
  );
};

export default Profile;
