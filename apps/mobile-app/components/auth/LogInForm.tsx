import React, {
  Dispatch,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import { Text, View } from "react-native";
import Input from "../Input";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import KeyboardWrapper from "../KeyboardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { checkEmail, loginUser } from "@/queries";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { queryClient } from "@/app/_layout";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

const LogInForm = ({
  onNext,
  setEmail,
  onClose,
}: {
  onNext: () => void;
  onClose: () => void;
  setEmail: Dispatch<SetStateAction<string>>;
}) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { control, formState, handleSubmit, watch } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    try {

      //we firstly check if the email is already registered
      if (!isRegistered) {
        await checkEmail(watch("email"));
        setIsRegistered(true);
        setLoading(false);
        return;
      }

      //throw error if no password is entered
      if (!data.password) {
        Toast.show({
          type: "error",
          text1: "Please enter your password!",
          position: "top",
        });
        return;
      }

      //if the email is registered we proceed with login and save token
      const result = await loginUser(data);
      await AsyncStorage.setItem("accessToken", result.token);

      Toast.show({
        type: "success",
        text1: "Log In Successful",
        position: "top",
      });

      queryClient.invalidateQueries({queryKey:['myNotifications']})
      queryClient.invalidateQueries({queryKey:['user']})

      //close the modal after successful login
      onClose();

    } catch (error: any) {
      if (error?.status === 400) {
        Toast.show({
          type: "error",
          text1: "Incorrect Password!",
          position: "top",
        });
        return;
      }

      //if the email is not registered we direct them to the registration page
      if (error?.status === 404 && !isRegistered) {
        setEmail(watch("email"));
        onNext();
      } else {
        Toast.show({
          type: "error",
          text1: "An error occured!",
          position: "top",
        });
      }
    } finally {
      setLoading(false);
    }
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
      {isRegistered && (
        <View className="mt-6">
          <Input
            name="password"
            control={control}
            placeholder="Enter your password"
            secureTextEntry
            error={formState.errors.password?.message}
          />
        </View>
      )}
      <Button
        onPress={handleSubmit(onSubmit)}
        loading={loading}
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
