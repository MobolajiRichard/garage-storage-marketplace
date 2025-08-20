import React, { useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import Input from "../Input";
import CountryPicker from "react-native-country-picker-modal";

const SpaceAddress = ({
  control,
  watch,
  setValue,
  errors,
}: {
  control: Control<any>;
  titleError?: string;
  descriptionError?: string;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<{
    address: {
      address: string;
      city: string;
      country: string;
      zipCode: string;
    };
  }>;
}) => {
  const [selected, setSelected] = useState<string>("+91");
  const [country, setCountry] = useState("");
  const [showCountry, setShowCountry] = useState(false);
  return (
    <View className="mt-6 gap-4">
      <Text className="mb-2 font-semibold ml-1">Enter space address</Text>
      <Input
        control={control}
        name="address.address"
        placeholder="Address"
        error={errors.address?.address?.message}
      />

      <Pressable onPress={() => setShowCountry(true)}>
        <Input
          control={control}
          name="address.country"
          placeholder="Country"
          error={errors.address?.country?.message}
          disabled
        />
      </Pressable>
      <Input
        control={control}
        name="address.city"
        placeholder="City"
        error={errors.address?.city?.message}
      />
      <Input
        control={control}
        name="address.zipCode"
        placeholder="zipCode"
        error={errors.address?.zipCode?.message}
      />
      {showCountry && (
        <CountryPicker
          countryCode="NG"
          onClose={() => setShowCountry(false)}
          onSelect={(value) => setValue("address.country", value.name)}
          containerButtonStyle={{ height: 0 }}
          visible={true}
          withFlag
        />
      )}
    </View>
  );
};

export default SpaceAddress;
