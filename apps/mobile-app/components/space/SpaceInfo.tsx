import React from "react";
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Text, View } from "react-native";
import Input from "../Input";
import { formatPriceInput, priceParser } from "@/utils/price";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownTriggerButton,
} from "../Dropdown";
import { EvilIcons } from "@expo/vector-icons";

export const CURRENCY = ["USD", "EUR", "NGN", "GBP", "AUD"];

const SpaceInfo = ({
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
  errors: FieldErrors<{ title: string; description: string }>;
}) => {
  return (
    <View className="gap-4 mt-6">
      <Text className="mb-2 font-semibold ml-1">
        Enter some basic info about your space
      </Text>
      <Input
        control={control}
        name="title"
        placeholder="Title"
        error={errors.title?.message}
      />
      <Input
        control={control}
        name="description"
        placeholder="Description"
        multiline
        textAlignVertical="top"
        className="h-32"
        error={errors.description?.message}
      />
      <View className="mt-5 flex-row items-center gap-2">
        <DropdownMenu className="w-fit">
          <DropdownMenuTrigger className="flex-row border h-[55px] rounded-2xl px-3 items-center text-[#0D0D0D] border-gray-300">
            <Text>{watch("currency")}</Text>
            <EvilIcons name="chevron-down" size={20} color="#0D0D0D" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <View className="rounded-2xl bg-white px-3">
              {CURRENCY.map((type) => (
                <DropdownMenuItem
                  key={type}
                  onPress={() => {
                    setValue("currency", type);
                  }}
                >
                  <Text className="text-base  text-black">{type}</Text>
                </DropdownMenuItem>
              ))}
            </View>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          keyboardType="numeric"
          name={"price"}
          control={control}
          placeholder={"Price"}
          parentClassName="flex-1"
          formatter={formatPriceInput}
          parser={priceParser}
        />
      </View>
    </View>
  );
};

export default SpaceInfo;
