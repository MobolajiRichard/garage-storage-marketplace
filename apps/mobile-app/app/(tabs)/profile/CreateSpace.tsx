import { queryClient } from "@/app/_layout";
import {
  Button,
  Container,
  SpaceAddress,
  SpaceCategory,
  SpaceImages,
} from "@/components";
import SpaceInfo from "@/components/space/SpaceInfo";
import StepsProgressBar from "@/components/StepProgressBar";
import { useUser } from "@/hooks/useUser";
import { createSpace } from "@/queries";
import { processImages } from "@/utils/image";
import { Entypo } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";

type Step = "category" | "image" | "info" | "address";

export const createSpaceSchema = z.object({
  hostId: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be greater than 0").optional(),
  currency: z.string(),
  address: z.object({
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
    zipCode: z.string().min(1, "Zip code is required"),
  }),
});

export type CreateSpaceInput = z.infer<typeof createSpaceSchema>;

const CreateSpace = () => {
  const [step, setStep] = useState<Step>("category");
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      hostId: user?.hostProfile?.id,
      title: "",
      description: "",
      price: undefined,
      currency: "USD",
      address: {
        country: "",
        city: "",
        address: "",
        zipCode: "",
      },
    },
    resolver: zodResolver(createSpaceSchema),
  });

  const handleNext = async () => {
    if (step === "category") setStep("info");
    else if (step === "info") setStep("address");
    else if (step === "address") setStep("image");
    else if (step === "image") {
      try {
        setIsLoading(true);
        // Only process and upload images when actually submitting the service
        const processedImages = await processImages(images);

        const body = {
          ...watch(),
          images: processedImages,
          price: parseFloat(watch("price")?.toString() || "0"),
          categories: selectedCategories,
        };

        await createSpace(body);
        queryClient.invalidateQueries({ queryKey: ["mySpaces"] });
        router.push({
          pathname: "/(tabs)/profile/MySpaces",
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text2: "Please try again",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step === "category") router.back();
    else if (step === "info") setStep("category");
    else if (step === "address") setStep("info");
    else if (step === "image") setStep("address");
    else router.back();
  };

  const renderStep = () => {
    switch (step) {
      case "category":
        return (
          <SpaceCategory
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        );
      case "info":
        return (
          <SpaceInfo
            control={control}
            setValue={setValue}
            errors={errors}
            watch={watch}
          />
        );
      case "address":
        return (
          <SpaceAddress
            control={control}
            setValue={setValue}
            errors={errors}
            watch={watch}
          />
        );
      case "image":
        return <SpaceImages images={images} setImages={setImages} />;

      default:
        break;
    }
  };

  return (
    <Container>
      <StepsProgressBar
        step={step}
        steps={["category", "info", "address", "image"]}
      />
      <View className="flex-1 mt-4">
        <View className={"flex-col gap-4"}>
          <Entypo
            onPress={handleBack}
            name="chevron-left"
            size={24}
            color="black"
          />
          <View className="flex-col gap-2">
            <Text className="text-4xl font-bold">Create Space</Text>
          </View>
        </View>
        <View className="flex-1">{renderStep()}</View>
        <Button loading={isLoading} onPress={handleNext} text="Continue" />
      </View>
    </Container>
  );
};

export default CreateSpace;
