import { Container, AuthForm, ModalSlide, Button } from "@/components";
import SettingsMenu from "@/components/profile/SettingsMenu";
import { SHADOW_STYLE } from "@/constants/Colors";
import React, { useState } from "react";
import { Text, View, Modal } from "react-native";

const Profile = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
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
          <Button onPress={() => setOpenAuthModal(true)} text="Log In or Sign Up"/>
        </View>
      </View>
      <SettingsMenu />
      <ModalSlide
        visible={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
        }}
      >
       <AuthForm onClose={() =>  setOpenAuthModal(false)}/>
      </ModalSlide>
    </Container>
  );
};

export default Profile;
