import { categories, CategoryProps } from "@/constants/categories";
import React, { Dispatch, SetStateAction } from "react";
import {
  FlatList,
  ImageSourcePropType,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryCard from "../home/CategoryCard";
import { FontAwesome5 } from "@expo/vector-icons";

const SpaceCategory = ({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}) => {
  const selectCategory = (id: string) => {
    const isSelected = selectedCategories.find((i) => i === id);
    setSelectedCategories((prev) =>
      isSelected ? prev?.filter((p) => p !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }: { item: CategoryProps }) => {
    return (
      <View className="relative">
        <CategoryCard {...item} onPress={() => selectCategory(item.id)} />
        {selectedCategories?.includes?.(item.id) && (
          <Pressable onPress={() => selectCategory(item.id)} className="bg-green-600 w-[50px] h-[50px] rounded-full absolute top-[40%] left-[40%] items-center justify-center">
            <FontAwesome5 name="check" size={24} color="white" />
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <View className="mt-6">
      <Text className="mb-8 font-semibold ml-1">
        Select all categories that applies
      </Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ justifyContent: "center", gap: 10 }}
        numColumns={2}
      />
    </View>
  );
};

export default SpaceCategory;
