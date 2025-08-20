import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTime } from "luxon";
import { FontAwesome } from "@expo/vector-icons";

type DateTimePickerModalProps = {
  visible: boolean;
  onClose: () => void;
  value: Date | null;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  title?: string;
  placeholder?: string;
  label?: string;
};

export default function DateTimePickerModal({
  visible,
  onClose,
  value,
  onChange,
  minimumDate,
  title = "Select Date & Time",
  placeholder = "Pick date and time",
  label,
}: DateTimePickerModalProps) {
  const [tempDate, setTempDate] = useState<Date>(value || new Date());
  const [currentStep, setCurrentStep] = useState<"date" | "time">("date");

  const formatDisplayDate = (date: Date | null) => {
    if (!date) return null;
    return DateTime.fromJSDate(date).toFormat("LLL dd, yyyy HH:mm");
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android" && event.type === "dismissed") {
      onClose();
      return;
    }

    if (selectedDate) {
      setTempDate(selectedDate);

      if (Platform.OS === "android") {
        // On Android, show time picker after date selection
        setCurrentStep("time");
      } else {
        // On iOS, datetime mode handles both, so we can save immediately
        onChange(selectedDate);
        onClose();
      }
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === "android" && event.type === "dismissed") {
      onClose();
      return;
    }

    if (selectedTime) {
      // Combine the date from tempDate with the time from selectedTime
      const finalDate = new Date(tempDate);
      finalDate.setHours(selectedTime.getHours());
      finalDate.setMinutes(selectedTime.getMinutes());

      onChange(finalDate);
      onClose();
    }
  };

  const handleCancel = () => {
    setCurrentStep("date");
    onClose();
  };

  const renderIOSPicker = () => (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <View className="flex-1 justify-end">
        <View className="bg-white">
          {/* Header */}
          <View className="flex-row items-center justify-between border-b border-gray-200 px-4 py-3">
            <TouchableOpacity onPress={handleCancel}>
              <Text className="text-base text-blue-500">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-base font-medium">{title}</Text>
            <TouchableOpacity
              onPress={() => {
                onChange(tempDate);
                onClose();
              }}
            >
              <Text className="text-base font-medium text-blue-500">Done</Text>
            </TouchableOpacity>
          </View>

          {/* Date Time Picker */}
          <DateTimePicker
            value={tempDate}
            mode="datetime"
            display="spinner"
            onChange={(event, date) => {
              if (date) setTempDate(date);
            }}
            minimumDate={minimumDate}
            textColor="#000000"
          />
        </View>
      </View>
    </Modal>
  );

  const renderAndroidPicker = () => {
    if (!visible) return null;

    if (currentStep === "date") {
      return (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={minimumDate}
        />
      );
    } else {
      return (
        <DateTimePicker
          value={tempDate}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      );
    }
  };

  return Platform.OS === "ios" ? renderIOSPicker() : renderAndroidPicker();
}

// Trigger component for opening the picker
type DateTimePickerTriggerProps = {
  value: Date | null;
  onPress: () => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
};

export function DateTimePickerTrigger({
  value,
  onPress,
  placeholder = "Pick date and time",
  label,
  disabled = false,
}: DateTimePickerTriggerProps) {
  const formatDisplayDate = (date: Date | null) => {
    if (!date) return null;
    return DateTime.fromJSDate(date).toFormat("LLL dd, yyyy HH:mm");
  };

  return (
    <View>
      {label && <Text className="mb-2 text-base font-medium">{label}</Text>}
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        className={`h-[55px] flex-row items-center justify-between rounded-2xl border border-gray-400 bg-white px-4 ${
          disabled ? "opacity-50" : ""
        }`}
      >
        <Text className={`text-base ${value ? "text-black" : "text-gray-450"}`}>
          {value ? formatDisplayDate(value) : placeholder}
        </Text>
        <FontAwesome name="calendar" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
