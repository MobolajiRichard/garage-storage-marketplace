import { View, Text } from 'react-native';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';

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
      <Entypo onPress={() => router.back()} name="chevron-left" size={24} color="black" />
      <View className="flex-col gap-2">
        <Text className="text-4xl font-bold">{title}</Text>
        {subTitle && <Text className="text-gray-450">{subTitle}</Text>}
      </View>
    </View>
  );
}