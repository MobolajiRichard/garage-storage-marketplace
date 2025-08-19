import React, { ReactNode, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const KeyboardWrapper = ({ children }: { children: ReactNode }) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const keyboardDidShow = () => setKeyboardOffset(-45);
    const keyboardDidHide = () => setKeyboardOffset(0);

    const showSub = Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    const hideSub = Keyboard.addListener("keyboardDidHide", keyboardDidHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : keyboardOffset}
      enabled={true}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardWrapper;
