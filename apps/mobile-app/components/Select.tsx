import React, { FC, useEffect, useState } from "react";
import ModalSlide from "./ModalSlide";
import { FlatList, Pressable, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { EvilIcons } from "@expo/vector-icons";

interface SelectProp {
  options: string[];
  name: string;
  value: string;
  setValue: (newValue: string) => void;
  customContainerClassname?: string;
  customTextClassname?: string;
  firstOptionSelect?: boolean;
}

const Select: FC<SelectProp> = ({
  options,
  name,
  value,
  setValue,
  customContainerClassname,
  customTextClassname,
  firstOptionSelect,
}) => {
  const [openSelectModal, setOpenSelectModal] = useState(false);

  const onItemSelect = (item: string) => {
    setValue(item);
    setOpenSelectModal(false);
  };

  useEffect(() => {
    if (firstOptionSelect) {
      setValue(options[0]);
    }
  }, [firstOptionSelect]);

  const renderItem = ({ item }: { item: string }) => (
    <Pressable
      onPress={() => onItemSelect(item)}
      className={twMerge(
        "w-full h-[63px] bg-white rounded-md px-4 flex flex-row items-center ",
        value === item && "bg-primary/10"
      )}
    >
      <Text className=" text-[14px] font-medium text-black">{item}</Text>
    </Pressable>
  );
  return (
    <>
      <Pressable
        onPress={() => setOpenSelectModal(true)}
        className={twMerge(
          "h-[55px] w-full border border-gray-300 rounded-xl px-4 flex flex-row items-center justify-between relative",
          customContainerClassname
        )}
      >
        <Text numberOfLines={1} className="font-poppins text-[#0D0D0D]">
          {value ? value : name}
        </Text>
        <EvilIcons name="chevron-down" size={24} color="black" />
      </Pressable>
      <ModalSlide
        visible={openSelectModal}
        onClose={() => setOpenSelectModal(false)}
      >
        <View className=" w-full bg-white rounded-t-[30px] p-6 mb-10">
          <Text className="w-full items-start font-poppins-medium text-base my-6">
            {name}{" "}
          </Text>
          <FlatList
            data={options}
            contentContainerStyle={{ width: "100%" }}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </ModalSlide>
    </>
  );
};

export default Select;
