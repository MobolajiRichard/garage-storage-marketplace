import React from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  View,
  Pressable,
  useColorScheme,
} from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Feather, Ionicons } from "@expo/vector-icons";

export type InputProps<T extends FieldValues> = Partial<TextInputProps> & {
  name: Path<T>;
  control?: Control<T>;
  error?: string;
  parentClassName?: string;
  search?: boolean;
  disabled?: boolean;
  addButton?: boolean;
  onAddPress?: () => void;
  white?: boolean;
  formatter?: (value: string) => string;
  parser?: (formattedValue: string) => any;
};

const Input = <T extends FieldValues>({
  name,
  control,
  error,
  className,
  parentClassName,
  disabled = false,
  search = false,
  addButton = false,
  onAddPress,
  white = false,
  formatter,
  parser,
  ...textInputProps
}: InputProps<T>) => {
  const systemColorScheme = useColorScheme();

  const inputBackgroundColor = white ? "transparent" : "#FFFFFF";
  const inputTextColor = white ? "#FFFFFF" : "#0D0D0D";
  const inputBorderColor = error ? "#DC2626" : "#d1d5db";
  const iconColor = white ? "#FFFFFF" : "#0D0D0D";
  const placeholderColor = white ? "#FFFFFF" : "#959595";

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => {
        // Derive display value directly from form value (no state needed)
        const getDisplayValue = (): string => {
          if (value === undefined || value === null) return "";
          const stringValue = value.toString();
          return formatter ? formatter(stringValue) : stringValue;
        };

        const handleChangeText = (text: string) => {
          if (formatter && parser) {
            // Parse and update form value directly
            const parsedValue = parser(text);
            onChange(parsedValue);
          } else {
            // No formatting, use default behavior
            onChange(text);
          }
        };

        const currentValue = getDisplayValue();

        return (
          <View
            pointerEvents={disabled ? "none" : "auto"}
            className={twMerge("relative", parentClassName)}
          >
            {search && (
              <View
                style={{ zIndex: 2 }}
                className="absolute left-4 top-1/2 -mt-3 size-5"
              >
                <Ionicons name="search-outline" color={iconColor} size={20} />
              </View>
            )}
            <TextInput
              style={{
                fontFamily: "Poppins",
                paddingLeft: search ? 48 : 16,
                paddingRight: currentValue ? 40 : 16,
                textAlignVertical: "center",
                backgroundColor: inputBackgroundColor,
                borderColor: inputBorderColor,
                color: inputTextColor,
                ...(textInputProps.secureTextEntry &&
                  systemColorScheme === "dark" && {
                    backgroundColor: "#FFFFFF",
                    color: "#0D0D0D",
                  }),
              }}
              className={twMerge(
                "h-[55px] w-full rounded-2xl border p-4 text-base font-medium placeholder:align-middle",
                error && "border-red-600",
                className
              )}
              placeholderTextColor={placeholderColor}
              onBlur={onBlur}
              onChangeText={handleChangeText}
              value={currentValue}
              {...textInputProps}
            />
            {currentValue && (
              <Pressable
                onPress={() => {
                  onChange("");
                }}
                className={twMerge(
                  "absolute right-4 top-1/2 size-5",
                  error ? "-mt-7" : "-mt-3"
                )}
              >
                <Feather name="x" size={20} color={iconColor} />
              </Pressable>
            )}
            {error && (
              <Text className="mt-3 text-sm text-red-600">{error}</Text>
            )}
          </View>
        );
      }}
    />
  );
};

export default Input;
