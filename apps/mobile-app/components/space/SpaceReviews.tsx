import React, { useState } from "react";
import { Alert, FlatList, View } from "react-native";
import SpaceReviewCard from "./SPaceReviewCard";
import Button from "../Button";
import ModalSlide from "../ModalSlide";
import { Text } from "react-native";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import KeyboardWrapper from "../KeyboardWrapper";
import { SpaceProps } from "@/types";
import { leaveSpaceReview } from "@/queries";
import { useUser } from "@/hooks/useUser";
import Toast from "react-native-toast-message";
import { queryClient } from "@/app/_layout";

const SpaceReviews = ({ data }: { data: SpaceProps }) => {
  const { control, watch, reset } = useForm({
    defaultValues: {
      review: "",
    },
  });

  const { data: user } = useUser();

  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await leaveSpaceReview({
        rating,
        review: watch("review"),
        spaceId: data.id,
        userId: user?.id!,
      });

      setOpenModal(false);

    //   Alert.alert("Sucess", "Review added");
      queryClient.invalidateQueries({ queryKey: ["space", data.id] });
      reset();
      setRating(1);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="mt-6">
      <Button
        onPress={() => setOpenModal(true)}
        className="mb-4"
        variant="secondary"
        text="Leave Review"
      />
      <FlatList
        data={data.reviews || []}
        renderItem={({item}) => <SpaceReviewCard {...item}/>}
        contentContainerClassName="gap-6 "
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.createdAt?.toString()!}
        ListFooterComponent={() => <View />}
        ListFooterComponentClassName="mb-[100px]"
      />
      <ModalSlide
        onClose={() => setOpenModal(false)}
        containerClassName="items-center h-[80vh]"
        visible={openModal}
      >
        <Text className="mb-10 mt-4 text-[18px] font-semibold">Review</Text>
        <View className="flex-row gap-1 mb-8">
          {[1, 2, 3, 4, 5]?.map((i) => (
            <>
              {rating >= i + 1 ? (
                <Entypo
                  onPress={() => setRating(i)}
                  size={50}
                  name="star"
                  color="#28287a"
                />
              ) : (
                <Entypo
                  onPress={() => setRating(i)}
                  key={i}
                  name="star-outlined"
                  size={50}
                  color="black"
                />
              )}
            </>
          ))}
        </View>
        <Input
          control={control}
          name="review"
          parentClassName="w-full"
          className="h-32 w-full"
          multiline
          placeholder="Enter your review here..."
        />
        <Button
          onPress={onSubmit}
          loading={isLoading}
          className="mt-6 mb-20"
          text="Submit"
        />
      </ModalSlide>
    </View>
  );
};

export default SpaceReviews;
