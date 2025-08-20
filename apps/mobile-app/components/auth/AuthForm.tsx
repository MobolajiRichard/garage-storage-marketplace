import React, { useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import LogInForm from "./LogInForm";
import RegistrationForm from "./RegistrationForm";
import { useUser } from "@/hooks/useUser";

const AuthForm = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");



  return (
    <KeyboardAvoidingView>
      <View className="h-full">
        <View className="items-center py-4 border-b border-gray-300 mb-6">
          <Text className="text-[16px] font-semibold">
            {step === 0 ? "Log In or Sign Up" : "Complete Registration"}
          </Text>
        </View>
        {step === 0 && (
          <LogInForm onClose={onClose} onNext={() => setStep(1)} setEmail={setEmail} />
        )}
        {step === 1 && <RegistrationForm email={email}  onClose={onClose}  />}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;
