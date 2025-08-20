import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Control, useWatch } from "react-hook-form";
import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react";
import { BlurView } from "expo-blur";
import { PortalHost } from "@rn-primitives/portal";
import { twMerge } from "tailwind-merge";
import CheckboxSquared from "../Checkbox";
import RangeInput from "../RangeInput";
import Button from "../Button";
import Chips from "../Chips";
import Input from "../Input";
import { useStatusBar } from "@/hooks";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { FilterType } from "@/app/space";
import { categories } from "@/constants/categories";
import CountryPicker from "react-native-country-picker-modal";

type Props = {
  setValue: (name: any, value: any) => void;
  defaultValue: FilterType;
  control: Control<FilterType>;
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
};

const FilterBar = (props: Props) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [changedLocation, setChangedLocation] = useState(false);
  const [showCountry, setShowCountry] = useState(false);


  const [filters, setFilters] = useState({
    category: props.defaultValue.category,
    minRating: props.defaultValue.minRating,
    minPrice: props.defaultValue.minPrice,
    maxPrice: props.defaultValue.maxPrice,
    country: props.defaultValue.country,
    city: props.defaultValue.city,
  });

  const updateFilter = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const { handleLight, handleDark } = useStatusBar();

  const handleFilterOpen = (open: boolean) => {
    if (open) {
      handleDark();
      setFilters({
    category: props.defaultValue.category,
        minRating: props.defaultValue.minRating,
        minPrice: props.defaultValue.minPrice,
        maxPrice: props.defaultValue.maxPrice,
        country: props.defaultValue.country,
        city: props.defaultValue.city,
      });
    } else {
      handleLight();
    }
    props.setIsFilterOpen(open);
  };


  return (
    <Modal visible={props.isFilterOpen} animationType="slide">
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, marginTop: Platform.OS === "ios" ? 50 : 0 }}
      >
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          scrollEnabled={scrollEnabled}
        >
          <View className="gap-5 px-[17px] py-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold">Filters</Text>
              <Pressable
                className="size-10 items-center justify-center rounded-full bg-gray-400"
                onPress={() => handleFilterOpen(false)}
              >
                <Feather name="x" size={24} color="black" />
              </Pressable>
            </View>

            <View className="border-t border-gray-400" />

            <View>
              <Text className="mb-2.5 text-base font-semibold">Ratings</Text>
              <View className="flex-row gap-1">
                {[1, 2, 3, 4, 5]?.map((i) => (
                  <View key={i}>
                    {(Number(filters.minRating) || 0) >= i ? (
                      <Entypo
                        onPress={() => updateFilter("minRating", i)}
                        size={30}
                        name="star"
                        color="#28287a"
                      />
                    ) : (
                      <Entypo
                        onPress={() => updateFilter("minRating", i)}
                        key={i}
                        name="star-outlined"
                        size={30}
                        color="black"
                      />
                    )}
                  </View>
                ))}
              </View>
            </View>
            <View>
              <Text className="mb-2.5 text-base font-semibold">Categories</Text>
              <View>
                {categories?.map((c) => (
                  <Pressable
                  key={c.id}
                    onPress={() =>  updateFilter("category", c.id)}
                    className="flex-row mb-2 items-center gap-2"
                  >
                    <CheckboxSquared
                      checked={filters.category === c.id}
                    />
                    <Text>{c.name}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View>
              <Text className="mb-2.5 text-base font-semibold">Location</Text>

              <Pressable onPress={() => setShowCountry(true)}>
                <Input
                  control={props.control}
                  name="country"
                  placeholder={filters?.country || "Country"}
                  disabled
                />
              </Pressable>
            </View>

            <View>
              <Text className="mb-2.5 text-base font-semibold">Price</Text>
              <View className="flex-col items-center justify-center gap-4">
                <View
                  className={twMerge(
                    "flex-row items-center justify-between gap-4"
                  )}
                >
                  <RangeInput
                    label={"Minimum"}
                    value={filters.minPrice}
                    onChange={(e) => {
                      updateFilter("minPrice", e);
                    }}
                    onBlur={() => {
                      // Validate only when user finishes editing minimum price
                      if (
                        filters.minPrice &&
                        filters.maxPrice &&
                        Number(filters.minPrice) > Number(filters.maxPrice)
                      ) {
                        updateFilter("maxPrice", undefined);
                      }
                    }}
                  />
                  <RangeInput
                    label={"Maximum"}
                    value={filters.maxPrice}
                    onChange={(e) => {
                      updateFilter("maxPrice", e);
                    }}
                    onBlur={() => {
                      // Validate only when user finishes editing maximum price
                      if (
                        filters.maxPrice &&
                        filters.minPrice &&
                        Number(filters.maxPrice) < Number(filters.minPrice)
                      ) {
                        updateFilter("minPrice", undefined);
                      }
                    }}
                  />
                </View>
                <View className="my-3 flex-row items-center">
                  <View className="flex-1 border-b border-gray-400" />
                  <Text className="text-gray-450 px-3 font-semibold">or</Text>
                  <View className="flex-1 border-b border-gray-400" />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {showCountry && (
          <CountryPicker
            countryCode="NG"
            onClose={() => setShowCountry(false)}
            onSelect={(value) => updateFilter("country", value.name)}
            containerButtonStyle={{ height: 0 }}
            visible={true}
            withFlag
          />
        )}
        <View className="bg-white p-4 pb-6 shadow-lg">
          <Button
            className="w-full"
            text={"Confirm"}
            variant="primary"
            onPress={() => {
              props.setIsFilterOpen(false);
              props.setValue("minRating", filters.minRating);
              props.setValue("minPrice", filters.minPrice);
              props.setValue("maxPrice", filters.maxPrice);
              props.setValue("country", filters.country);
              props.setValue("city", filters.city);
              props.setValue("category", filters.category);
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <PortalHost name="filter-dropdown-portal" />
    </Modal>
  );
};

export default FilterBar;
