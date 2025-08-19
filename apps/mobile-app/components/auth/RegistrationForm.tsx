import React, { useState } from "react";
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

export const formSchema = z.object({
  email: z.email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  type: z.string().min(1, "Type is required"),
});

const RegistrationForm = () => {
  const [termsAgreed, setTermsAgreed] = useState(true);
  const { control, watch, setValue, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      type: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log({ data });
  };
  return (
    <KeyboardWrapper
    >
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
        />
      </View>
      <View className="mt-6">
        <Text className="mb-2 ml-1">Account Type</Text>
        <Select
          name="Account Type"
          options={["Host", "Guest"]}
          setValue={(value) => setValue("type", value)}
          value={watch("type")}
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
      <Button onPress={handleSubmit(onSubmit)} text="Create Account" />
    </KeyboardWrapper>
  );
};

export default RegistrationForm;
