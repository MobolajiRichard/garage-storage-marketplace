import { View, Text, TextInput } from 'react-native';
import React from 'react';

export default function RangeInput({
  label,
  value,
  onChange,
  onBlur,
}: {
  label: 'Minimum' | 'Maximum';
  value: number | undefined;
  onChange: (val: number | undefined) => void;
  onBlur?: () => void;
}) {
  const handleValueChange = (text: string) => {
    if (text === '') {
      onChange(undefined);
      return;
    }

    // Allow only numbers and limit to 9 digits
    const numericText = text.replace(/[^0-9]/g, '');


    const numValue = Number(numericText);
    onChange(numValue);
  };

  return (
    <View className="flex-1 flex-col items-center justify-start gap-2">
      <Text className="text-gray-450 text-sm">{label}</Text>
      <View className="relative w-full flex-row items-center">
        <TextInput
          className="w-full rounded-full border border-gray-400 px-3 py-3 text-center"
          keyboardType="numeric"
          value={value ? value.toString() : ''}
          placeholder=""
          onChangeText={handleValueChange}
          onBlur={onBlur}
        />
      </View>
    </View>
  );
}
