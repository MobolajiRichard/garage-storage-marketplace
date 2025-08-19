import React, { useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import Input from "../Input";
import { useForm } from "react-hook-form";
import Container from "../Container";
import Button from "../Button";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import KeyboardWrapper from "../KeyboardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().optional(),
});

const LogInForm = ({ onNext }: { onNext: () => void }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const { control, formState, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });


  const onSubmit = () => {
    onNext();
  };

  return (
    <KeyboardWrapper>
      <Input
        control={control}
        name="email"
        placeholder="Email"
        parentClassName="border-red-500"
        className="border-gray-300"
        error={formState.errors.email?.message}
      />
      {isRegistered && <View className="mt-6">
        <Input
          control={control}
          name="password"
          placeholder="Enter your password"
          secureTextEntry
          error={formState.errors.password?.message}
        />
      </View>}
      <Button
        onPress={handleSubmit(onSubmit)}
        className="mt-6"
        text="Continue"
      />
      <View className="flex-row items-center mt-6 justify-between">
        <View className="h-[1px] w-[43%] bg-gray-300" />
        <Text className="text-[16px] font-medium">or</Text>
        <View className="h-[1px] w-[43%] bg-gray-300" />
      </View>
      <Button className="mt-6" variant="secondary">
        <View className="flex-row items-center">
          <AntDesign name="google" size={20} color="black" />
          <Text className="flex-1 text-center">Continue With Google</Text>
        </View>
      </Button>
      <Button className="mt-6" variant="secondary">
        <View className="flex-row items-center">
          <AntDesign name="apple1" size={20} color="black" />
          <Text className="flex-1 text-center">Continue With Apple</Text>
        </View>
      </Button>
      <Button className="mt-6" variant="secondary">
        <View className="flex-row items-center">
          <EvilIcons name="sc-facebook" size={24} color="black" />
          <Text className="flex-1 text-center">Continue With Facebook</Text>
        </View>
      </Button>
    </KeyboardWrapper>
  );
};

export default LogInForm;
