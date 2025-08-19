import { View, Text } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { twMerge } from 'tailwind-merge';
import { EvilIcons } from '@expo/vector-icons';

export default function ScreenHeader({
  title,
  subTitle,
  className,
}: {
  title: string;
  subTitle?: string;
  className?: string;
}) {
  return (
    <View className={twMerge('flex-col gap-4', className)}>
      <EvilIcons onPress={() => router.back()} name="chevron-left" size={24} color="black" />
      <View className="flex-col gap-2">
        <Text className="text-4xl font-bold">{title}</Text>
        {subTitle && <Text className="text-gray-450">{subTitle}</Text>}
      </View>
    </View>
  );
}