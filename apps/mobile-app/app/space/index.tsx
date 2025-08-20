import { useAllSpaces } from "@/hooks/useSpaces";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  Pressable,
  Text,
  View,
  ViewToken,
} from "react-native";
import Constants from "expo-constants";
import SpaceResultCard from "@/components/space/SpaceResultCard";
import { SpaceProps } from "@/types";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import FilterBar from "@/components/space/SpaceFilterBar";
import { useSearchParams } from "expo-router/build/hooks";

const statusBarHeight =
  Platform.OS === "ios" ? 0 : Constants.statusBarHeight || 0;

export type FilterType = {
  category: string | undefined;
  minRating: string | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  country: string | undefined;
  city: string | undefined;
};

const Spaces = () => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const city = searchParams.get("city");

  const { control, watch, setValue, reset } = useForm<FilterType>({
    defaultValues: {
      category: undefined,
      minRating: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      country: undefined,
      city: undefined,
    },
  });

  useEffect(() => {
    if (category) {
      setValue("category", category);
    }
    if (city) {
      setValue("city", city);
    }
  }, [category, city]);

  const filters = useMemo(() => {
    return {
      category: watch("category"),
      minRating: watch("minRating"),
      minPrice: watch("minPrice")?.toString(),
      maxPrice: watch("maxPrice")?.toString(),
      country: watch("country"),
      city: watch("city"),
    };
  }, [watch()]);

  // Remove keys with null/undefined/empty string
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );
  const { data, isLoading } = useAllSpaces(cleanFilters);

  const renderItem = ({ item }: { item: SpaceProps }) => {
    return (
      <View style={{ height: SCREEN_HEIGHT + statusBarHeight }}>
        <SpaceResultCard {...item} />
      </View>
    );
  };

  return (
    <View className="relative">
      <View className="absolute left-0 z-40 flex-row w-full justify-between px-6">
        <Pressable
          onPress={() => router.back()}
          className="w-[50px] h-[50px] z-40  top-[70px] bg-white/30 rounded-full items-center justify-center"
        >
          <Feather name="x" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={() => setIsFilterOpen(true)}
          className="w-[50px] h-[50px] z-40  top-[70px] bg-white/30 rounded-full items-center justify-center"
        >
          <Ionicons name="filter-outline" size={24} color="black" />
        </Pressable>
      </View>
      {!isLoading && (
        <>
          {!!data?.length ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data || []}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              numColumns={1}
              pagingEnabled={true}
              snapToAlignment="center"
              decelerationRate={0.8}
              disableIntervalMomentum={true}
              snapToInterval={SCREEN_HEIGHT + statusBarHeight}
              renderItem={renderItem}
              bounces={false}
              scrollEventThrottle={16}
              windowSize={50}
            />
          ) : (
            <View className="bg-primary/30 h-full items-center justify-center">
              <Text className="font-medium text-center text-[16px] w-[60%]">
                No spaces match your search. Try adjusting the filters.
              </Text>
            </View>
          )}
        </>
      )}
      {isLoading && (
        <View className="bg-primary/30 h-full items-center justify-center">
          <ActivityIndicator color={"white"} size={"large"} />
        </View>
      )}
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          zIndex: 10,
          paddingHorizontal: 16,
          paddingBottom: 12,
        }}
      >
        <FilterBar
          control={control}
          setValue={setValue}
          defaultValue={watch()}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
      </View>
    </View>
  );
};

export default Spaces;
