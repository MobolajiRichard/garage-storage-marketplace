import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import Input from "../Input";
import Button from "../Button";
import ModalSlide from "../ModalSlide";
import Select from "../Select";
import { Checkbox } from "..";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import KeyboardWrapper from "../KeyboardWrapper";
import Toast from "react-native-toast-message";
import { registerUser } from "@/queries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { queryClient } from "@/app/_layout";

export const formSchema = z.object({
  email: z.email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  accountType: z.string().min(1, "Type is required"),
});

export type RegistrationInput = z.infer<typeof formSchema>;

const RegistrationForm = ({
  email,
  onClose,
}: {
  email: string;
  onClose: () => void;
}) => {
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [loading, setLoading] = useState(false);

  const { control, watch, setValue, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      accountType: "",
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const result = await registerUser({
        ...data,
        accountType: data?.accountType?.toLowerCase(),
      });

      //on successful registration we store the token to sign in the user
      await AsyncStorage.setItem("accessToken", result.token);
      Toast.show({
        type: "success",
        text1: "Sign Up Succesful!",
      });

      queryClient.invalidateQueries({queryKey:['myNotifications']})
      queryClient.invalidateQueries({queryKey:['user']})

      //close modal
      onClose();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardWrapper>
      <Text className="mb-2 ml-1">Name</Text>
      <Input
        control={control}
        name="name"
        placeholder="Enter your full name"
        error={formState.errors.name?.message}
      />
      <View className="mt-6">
        <Text className="mb-2 ml-1">Email</Text>
        <Input
          control={control}
          name="email"
          placeholder="Email"
          error={formState.errors.email?.message}
          disabled
        />
      </View>
      <View className="mt-6">
        <Text className="mb-2 ml-1">Account Type</Text>
        <Select
          name="Account Type"
          options={["Host", "Guest"]}
          setValue={(value) => setValue("accountType", value)}
          value={watch("accountType")}
          firstOptionSelect
        />
      </View>
      <View className="my-6">
        <Text className="mb-2 ml-1">Password</Text>
        <Input
          control={control}
          name="password"
          placeholder="Enter your password"
          secureTextEntry
          error={formState.errors.password?.message}
        />
      </View>

      <View className="flex-row  gap-3 my-6">
        <Checkbox
          checked={termsAgreed}
          onPress={() => setTermsAgreed((prev) => !prev)}
        />
        <Text className="w-[90%] text-gray-700">
          I agree to Garage Space Terms and Conditions, Privacy Policy and
          Payments Terms of Service.
        </Text>
      </View>
      <Button
        loading={loading}
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
        text="Create Account"
      />
    </KeyboardWrapper>
  );
};

export default RegistrationForm;
