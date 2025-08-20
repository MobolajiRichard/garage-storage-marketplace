import React, { Dispatch, SetStateAction, useState } from "react";
import ModalSlide from "../ModalSlide";
import { Alert, Pressable, View } from "react-native";
import { Text } from "react-native";
import DateTimePickerModal, { DateTimePickerTrigger } from "../DateTimePicker";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../Button";
import { twMerge } from "tailwind-merge";
import { SpaceProps } from "@/types";
import { useUser } from "@/hooks/useUser";
import { bookSpace } from "@/queries";
import Toast from "react-native-toast-message";

const SpaceBookingModal = ({
  openModal,
  setOpenModal,
  data,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  data: SpaceProps;
}) => {
  const [openCalendarModal, setOpenCalendarModal] = useState("");
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [paymentType, setPaymentType] = useState("CASH");
  const [isLoading, setIsLoading] = useState(false);

  const { data: user } = useUser();
  const onSubmit = async () => {
    const body = {
      startAt: from,
      endAt: to,
      price: data.price,
      paymentType: "CASH",
      currency: data.currency,
      spaceId: data.id,
      hostId: data.hostId,
      customerId: user?.id!,
    };
    try {
      setIsLoading(true);
      await bookSpace(body);
      Alert.alert("Sucess", "Space Booked Successfully");
      setOpenModal(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Please try again!",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ModalSlide
      onClose={() => setOpenModal(false)}
      containerClassName="items-center mb-20"
      visible={openModal}
    >
      <View className="px-6 w-full">
        <Text className="font-semibold text-[18px] my-6 text-center ">
          Book Space
        </Text>
        <DateTimePickerTrigger
          onPress={() => setOpenCalendarModal("from")}
          value={from}
          label="From"
        />
        <View className="mt-6" />
        <DateTimePickerTrigger
          onPress={() => setOpenCalendarModal("to")}
          value={to}
          label="To"
        />
        <Text className="text-base mt-6">Payment Type</Text>
        <View className="flex-row justify-between mt-2">
          <Pressable
            onPress={() => setPaymentType("CASH")}
            className={twMerge(
              "flex-row gap-2 justify-center bg-primary/20 items-center rounded-[15px] px-6 h-16 w-[48%]",
              paymentType === "CASH" && "border border-primary"
            )}
          >
            <MaterialCommunityIcons name="cash-100" size={32} color="black" />
            <Text className="font-medium text-[16px]">CASH</Text>
          </Pressable>
          <Pressable
            onPress={() => setPaymentType("CARD")}
            className={twMerge(
              "flex-row gap-2 justify-center bg-primary/20 items-center rounded-[15px] px-6 h-16 w-[48%] ",
              paymentType === "CARD" && "border border-primary/60"
            )}
          >
            <AntDesign name="creditcard" size={24} color="black" />
            <Text className="font-medium text-[16px]">CARD</Text>
          </Pressable>
        </View>
        <Button
          loading={isLoading}
          onPress={onSubmit}
          text="Book"
          className="mt-6"
        />
      </View>

      <DateTimePickerModal
        visible={!!openCalendarModal}
        onClose={() => setOpenCalendarModal("")}
        value={
          openCalendarModal === ""
            ? new Date()
            : openCalendarModal === "to"
              ? to
              : from
        }
        onChange={openCalendarModal === "to" ? setTo : setFrom}
      />
    </ModalSlide>
  );
};

export default SpaceBookingModal;
