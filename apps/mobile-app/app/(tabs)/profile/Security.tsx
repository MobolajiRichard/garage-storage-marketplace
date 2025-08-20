import { Button, Container, Input } from "@/components";
import ScreenHeader from "@/components/profile/ScreenHeader";
import { changePassword } from "@/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Old password must be at least 6 characters"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

const Security = () => {
  const [isLoading, setisLoading] = useState(false);
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const onPasswordChange = async (
    data: z.infer<typeof changePasswordSchema>
  ) => {
    try {
      setisLoading(true);
      await changePassword(data);
      Toast.show({
        type: "success",
        text1: "password Changed!",
      });
      router.push("/profile/main");
    } catch (error: any) {
      if (error.status === 409) {
        Toast.show({
          type: "error",
          text1: "Wrong Password",
        });
        return;
      }
      Toast.show({
        type: "error",
        text1: "Please try again!",
      });
    } finally {
      setisLoading(false);
    }
  };
  return (
    <Container>
      <ScreenHeader title={"Security"} />
      <Text className="my-6 text-[18px]">Change Password</Text>
      <Input
        control={control}
        name="oldPassword"
        placeholder="Old Password"
        secureTextEntry
        error={formState?.errors?.oldPassword?.message}
      />
      <View className="mt-6" />
      <Input
        control={control}
        name="newPassword"
        placeholder="New Password"
        secureTextEntry
        error={formState?.errors?.newPassword?.message}
      />
      <Button
        loading={isLoading}
        onPress={handleSubmit(onPasswordChange)}
        text="Change Password"
        className="mt-8"
      />
    </Container>
  );
};

export default Security;
