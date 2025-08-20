import { Container, AuthForm, ModalSlide, Button } from "@/components";
import ScreenHeader from "@/components/profile/ScreenHeader";
import SettingsMenu from "@/components/profile/SettingsMenu";
import { SHADOW_STYLE } from "@/constants/Colors";
import { useUser } from "@/hooks/useUser";
import React, { useState } from "react";
import { Text, View, Modal, Image } from "react-native";

const Profile = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const { data: user, refetch } = useUser();

  const onCloseModal = () => {
    setOpenAuthModal(false);
    refetch();
  };

  return (
    <Container edges={["top"]} scrollable>
      {!user?.id && (
        <>
          <Text className="text-4xl font-bold mb-6">Profile</Text>
          <Text className="my-3">Log In to view available spaces.</Text>
        </>
      )}
      {user?.id && (
        <View
          style={SHADOW_STYLE}
          className="border border-gray-200 p-4 rounded-[20px] items-center justify-center mt-6"
        >
          <View className="bg-primary w-[150px] h-[150px] rounded-full items-center justify-center">
            {user?.profileImage ? (
              <Image
                source={{ uri: user?.profileImage }}
                className="w-full h-full rounded-full"
              />
            ) : (
              <Text className="text-[48px] font-medium capitalize text-white">
                {user?.name?.[0]}
              </Text>
            )}
          </View>
          <Text className="mt-4 font-semibold text-[20px]">{user?.name}</Text>
          <Text className="mt-3">
            {user?.hostProfile?.id ? "Host" : "Guest"}
          </Text>
        </View>
      )}
      {!user?.id && (
        <View className="flex-row mt-4 gap-4">
          <Button
            onPress={() => setOpenAuthModal(true)}
            text="Log In or Sign Up"
          />
        </View>
      )}
      <View className=" border-gray-300 border-[0.5px] my-4 mt-8" />
      <SettingsMenu />
      <ModalSlide
        visible={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
        }}
      >
        <AuthForm onClose={onCloseModal} />
      </ModalSlide>
    </Container>
  );
};

export default Profile;
