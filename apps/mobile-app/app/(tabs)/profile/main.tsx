import { Container, AuthForm, ModalSlide } from "@/components";
import SettingsMenu from "@/components/profile/SettingsMenu";
import { SHADOW_STYLE } from "@/constants/Colors";
import React, { useState } from "react";
import { Text, View, Modal } from "react-native";

const Profile = () => {
  const [openLogInModal, setOpenLoginModal] = useState(true);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  return (
    <Container className="pt-0" scrollable>
      <View
        style={SHADOW_STYLE}
        className="border border-gray-200 p-4 rounded-[20px] items-center justify-center mt-6"
      >
        <View className="bg-primary w-[150px] h-[150px] rounded-full items-center justify-center">
          <Text className="text-[48px] font-medium text-white">M</Text>
        </View>
        <Text className="mt-4 font-semibold text-[20px]">Mobolaji</Text>
        {/* <Text className="mt-3">Guest</Text> */}
        <View className="flex-row mt-4 gap-4">
          <Text
            onPress={() => setOpenLoginModal(true)}
            className="bg-gray-300 py-3 px-4 rounded-full font-medium"
          >
            Log In
          </Text>
          <Text
            onPress={() => setOpenSignUpModal(true)}
            className="bg-gray-300 py-3 px-4 rounded-full font-medium"
          >
            Sign Up
          </Text>
        </View>
      </View>
      <SettingsMenu />
      <ModalSlide
        visible={openLogInModal || openSignUpModal}
        onClose={() => {
          setOpenLoginModal(false);
          setOpenSignUpModal(false);
        }}
      >
       <AuthForm/>
      </ModalSlide>
    </Container>
  );
};

export default Profile;
