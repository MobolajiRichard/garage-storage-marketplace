import { Button, Container, Input } from "@/components";
import LanguageSelects from "@/components/profile/LanguagesSelects";
import ScreenHeader from "@/components/profile/ScreenHeader";
import { Image } from "expo-image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

const PersonalInformation = () => {
  const handleDeleteAccount = () => {};

  const { control, watch, setValue } = useForm({
    defaultValues: {
      value: "",
    },
  });

  const [userInfo, setUserInfo] = useState([
    {
      key: "profileImage",
      title: "image",
      description: "",
      edit: false,
      loading: false,
      tempValue: "",
      onlyWorker: false,
    },
    {
      key: "name",
      title: "name",
      description: "",
      edit: false,
      loading: false,
      tempValue: "",
      onlyWorker: false,
    },
    {
      key: "email",
      title: "Email",
      description: "",
      edit: false,
      loading: false,
      tempValue: "",
      onlyWorker: false,
    },
    {
      key: "phone",
      title: "Phone Number",
      description: "",
      edit: false,
      loading: false,
      tempValue: "",
      onlyWorker: true,
    },
  ]);
  return (
    <Container scrollable edges={["top"]}>
      <ScreenHeader title={"Personal Information"} />
      <View className="py-2" />
      {userInfo.map((item, index) => {
        return (
          <View key={index} className="flex-col gap-4">
            {item.key !== "profileImage" ? (
              <View className="flex-row items-start justify-between gap-8 border-b border-b-gray-400 py-4">
                <View className="flex-1 flex-col gap-2">
                  <Text className="font-bold">{item.title}</Text>
                  {item.edit ? (
                    <>
                      {item.key !== "address" && (
                        <>
                          {typeof item.tempValue === "object" ? (
                            <View className="flex-1">
                              <LanguageSelects
                                selectedLanguages={item.tempValue as string[]}
                                setSelectedLanguages={(languages) => {}}
                              />
                            </View>
                          ) : (
                            <View className="flex-col gap-2">
                              <Input
                                name="value"
                                value={item.tempValue}
                                control={control}
                                multiline
                              />
                            </View>
                          )}
                        </>
                      )}

                      <Button
                        className="w-36 px-4 py-0"
                        variant="primary"
                        loading={item.loading}
                        text={"Confirm"}
                      />
                    </>
                  ) : (
                    <Text className="text-gray-450">Not added</Text>
                  )}
                </View>
                {item.key !== "phone" && item.key !== "email" && (
                  <Pressable className="w-fit">
                    <Text className="text-gray-450 font-semibold underline">
                      {item.edit ? "cancel" : "change"}
                    </Text>
                  </Pressable>
                )}
              </View>
            ) : (
              <View className="flex-col items-center justify-center">
                <Image
                  source={
                    item.tempValue
                      ? { uri: item.tempValue as string }
                      : { uri: item.description as string }
                  }
                  style={{
                    height: 120,
                    width: 120,
                    borderRadius: 60,
                  }}
                  className="bg-gray-200"
                />

                <Pressable className="my-2 w-fit">
                  <Text className="text-gray-450 font-semibold underline">
                    {item.edit ? "Cancel" : "Change"}
                  </Text>
                </Pressable>
                {item.edit && (
                  <Button
                    className="w-36 px-4 py-0"
                    variant="primary"
                    loading={item.loading}
                    text={"Confirm"}
                  />
                )}
              </View>
            )}
          </View>
        );
      })}

      <View className="mb-10 mt-8">
        <Button
          text="Delete"
          variant="secondary"
          onPress={handleDeleteAccount}
        />
      </View>
    </Container>
  );
};

export default PersonalInformation;
