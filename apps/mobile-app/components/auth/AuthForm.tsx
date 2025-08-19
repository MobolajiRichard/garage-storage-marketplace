import React, { useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import Input from "../Input";
import { useForm } from "react-hook-form";
import Container from "../Container";
import Button from "../Button";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import LogInForm from "./LogInForm";
import RegistrationForm from "./RegistrationForm";

const AuthForm = () => {
  const [step, setStep] = useState(0);
  const { control } = useForm({
    defaultValues: {
      email: "",
    },
  });
  return (
    <KeyboardAvoidingView>
      <View className="h-full">
        <View className="items-center py-4 border-b border-gray-300 mb-6">
          <Text className="text-[16px] font-semibold">
            {step === 0 ? "Log In or Sign Up" : "Complete Registration"}
          </Text>
        </View>
        {step === 0 && <LogInForm onNext={() => setStep(1)}/>}
        {step === 1 && <RegistrationForm />}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;
