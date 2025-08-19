import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import React, { ReactNode, useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { useStatusBar } from '../hooks';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  fullScreen?: boolean;
  edges?: Edge[];
  scrollable?: boolean;
  statusBarStyle?: 'light' | 'dark';
};

const Container = ({
  children,
  className,
  fullScreen = false,
  edges,
  scrollable = false,
  statusBarStyle = 'dark',
}: ContainerProps) => {
  const { handleLight, handleDark } = useStatusBar();
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const keyboardDidShow = () => setKeyboardOffset(-45);
    const keyboardDidHide = () => setKeyboardOffset(0);

    const showSub = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const hideSub = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (statusBarStyle === 'dark') {
      handleDark();
    } else {
      handleLight();
    }
  }, [statusBarStyle]);

  const content = scrollable ? (
    <SafeAreaView
      className={twMerge('h-full flex-1 bg-white py-4 px-6', fullScreen && 'pt-0', className)}
      edges={fullScreen ? [] : edges}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  ) : (
    <SafeAreaView
      className={twMerge('h-full flex-1 bg-white py-4 px-6', fullScreen && 'pt-0', className)}
      edges={fullScreen ? [] : edges}
    >
      {children}
    </SafeAreaView>
  );

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : keyboardOffset}
      enabled={true}
    >
      {content}
    </KeyboardAvoidingView>
  );
};

export default Container;
