import { queryClient } from "@/app/_layout";
import { Button, Container, Input } from "@/components";
import LanguageSelects from "@/components/profile/LanguagesSelects";
import ScreenHeader from "@/components/profile/ScreenHeader";
import { useUser } from "@/hooks/useUser";
import { updateUserInformation, uploadFile } from "@/queries";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { compressToTargetSize } from "@/utils/image";

const PersonalInformation = () => {
  const handleDeleteAccount = () => {};
  const { data: user } = useUser();
  const { control, watch, setValue } = useForm({
    defaultValues: {
      value: "",
    },
  });

  const [userInfo, setUserInfo] = useState([
    {
      key: "profileImage",
      title: "image",
      description: user?.profileImage || "",
      edit: false,
      loading: false,
      tempValue: "",
      onlyWorker: false,
    },
    {
      key: "name",
      title: "Name",
      description: user?.name || "",
      edit: false,
      loading: false,
      tempValue: "",
      onlyWorker: false,
    },
    {
      key: "email",
      title: "Email",
      description: user?.email || "",
      edit: false,
      loading: false,
      tempValue: "",
      onlyWorker: false,
    },
    {
      key: "phoneNumber",
      title: "Phone Number",
      description: user?.phoneNumber || "",
      edit: false,
      loading: false,
      tempValue: "",
      onlyWorker: true,
    },
  ]);

  const updateTempValue = (index: number, value: string) => {
    setUserInfo((prev) => {
      const newUserInfo = [...prev];
      newUserInfo[index].tempValue = value;
      return newUserInfo;
    });
  };

  const startEditing = (index: number) => {
    setUserInfo((prev) => {
      const newUserInfo = [...prev];
      newUserInfo[index].edit = true;
      newUserInfo[index].tempValue = newUserInfo[index].description;
      return newUserInfo;
    });
  };

  const cancelEditing = (index: number) => {
    setUserInfo((prev) => {
      const newUserInfo = [...prev];
      newUserInfo[index].edit = false;
      newUserInfo[index].tempValue = "";
      return newUserInfo;
    });
  };

  const confirmChanges = async (index: number) => {
    // if the new value is empty return
    if (!userInfo[index].tempValue) {
      return;
    }

    //create the specific data to send to the BE
    let data = {
      [userInfo[index].key]: userInfo[index].tempValue,
    };

    //set the loading state of the button
    setUserInfo((prev) => {
      const newUserInfo = [...prev];
      newUserInfo[index].loading = true;
      return newUserInfo;
    });

    try {
      //send data to BE
      await updateUserInformation(data);

      //onsuccess optimistically update the data with the new one
      setUserInfo((prev) => {
        const newUserInfo = [...prev];
        newUserInfo[index].edit = false;
        newUserInfo[index].description = newUserInfo[index].tempValue;
        newUserInfo[index].tempValue = "";
        return newUserInfo;
      });

      //show toast message
      Toast.show({
        type: "success",
        text1: "Update Successful!",
      });
    } catch (error) {
      console.log("error", error);
      Toast.show({
        type: "error",
        text1: `Update Failed, try Again`,
      });
    } finally {
      setUserInfo((prev) => {
        const newUserInfo = [...prev];
        newUserInfo[index].loading = false;
        return newUserInfo;
      });
    }

    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  const pickImage = async (index: number) => {
    setUserInfo((prev) => {
      const newUserInfo = [...prev];
      newUserInfo[index].loading = true;
      return newUserInfo;
    });
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        //we need to compress the image as there's a limit to the blob we're using
        //to store the image
        const processedImage = await compressToTargetSize(result.assets[0].uri);
        if (processedImage) {
          const base64 = await fetch(processedImage.uri)
            .then((res) => res.blob())
            .then(
              (blob) =>
                new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result as string);
                  reader.readAsDataURL(blob);
                })
            );
          updateTempValue(index, await uploadFile({base64}));
        } else {
          Toast.show({
            type: "error",
            text1: "Error Compressing Image",
          });
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Toast.show({
        type: "error",
        text1: "Error Picking Image",
      });
    } finally {
      setUserInfo((prev) => {
        const newUserInfo = [...prev];
        newUserInfo[index].loading = false;
        return newUserInfo;
      });
    }
  };

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
                      <View className="flex-col gap-2">
                        <Input
                          name="value"
                          value={item.tempValue}
                          control={control}
                          onChangeText={(text) => updateTempValue(index, text)}
                          multiline
                          inputMode={
                            item.key === "phoneNumber" ? "numeric" : "text"
                          }
                        />
                      </View>
                      <Button
                        onPress={() => confirmChanges(index)}
                        className="w-36 px-4 py-0"
                        variant="primary"
                        loading={item.loading}
                        text={"Confirm"}
                      />
                    </>
                  ) : (
                    <Text className="text-gray-400">
                      {item.description || "Not added"}
                    </Text>
                  )}
                </View>
                {item.key !== "email" && (
                  <Pressable
                    onPress={() => {
                      if (item.edit) {
                        cancelEditing(index);
                      } else {
                        startEditing(index);
                      }
                    }}
                    className="w-fit"
                  >
                    {!item?.edit ? (
                      <AntDesign name="edit" size={24} color="#374151" />
                    ) : (
                      <Feather name="x" size={24} color="#374151" />
                    )}
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
                    backgroundColor: "#e5e7eb",
                  }}
                  className="bg-gray-200"
                />

                <Pressable
                  onPress={() => {
                    if (item.edit) {
                      cancelEditing(index);
                    } else {
                      startEditing(index);
                      pickImage(index);
                    }
                  }}
                  className="my-2 w-fit"
                >
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
                    onPress={() => {
                      if (item.tempValue === item.description) {
                        cancelEditing(index);
                      } else {
                        confirmChanges(index);
                      }
                    }}
                  />
                )}
              </View>
            )}
          </View>
        );
      })}

      <View className="mb-10 mt-8">
        <Button
          text="Delete Account"
          onPress={handleDeleteAccount}
          className="bg-red-500"
        />
      </View>
    </Container>
  );
};

export default PersonalInformation;
