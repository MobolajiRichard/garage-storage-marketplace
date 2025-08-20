import {
  Button,
  CategoryCard,
  Chip,
  Container,
  Input,
  LocationCard,
  SpaceCard,
} from "@/components";
import { HomeSpaceCardSkeleton } from "@/components/home/SpaceCard";
import { categories } from "@/constants/categories";
import { locations } from "@/constants/locations";
import { useAllSpaces } from "@/hooks/useSpaces";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  const { control } = useForm({
    defaultValues: {
      search: "",
      aiText: "",
    },
  });

  const { data, isLoading } = useAllSpaces({});
  return (
    <Container fullScreen scrollable>
      <View className="flex-1 pt-4 w-full">
        <Input
          control={control}
          name="search"
          placeholder="Start your search"
          className="rounded-full"
          search
        />
        <View className="mt-6">
          <Text className="mb-4 font-semibold ml-1">Recommended Garages</Text>
          {!isLoading && (
            <FlatList
              horizontal
              data={data?.slice(0, 5)}
              keyExtractor={(item) => item.id!}
              renderItem={({ item }) => <SpaceCard {...item} />}
              contentContainerStyle={{ gap: 10 }}
              showsHorizontalScrollIndicator={false}
            />
          )}
          {isLoading && (
            <FlatList
              horizontal
              data={[1,2,3,4,5]}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <HomeSpaceCardSkeleton  />}
              contentContainerStyle={{ gap: 10 }}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View className="mt-6">
          <Text className="mb-4 font-semibold ml-1">Popular Locations</Text>
          <FlatList
            horizontal
            data={locations}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <LocationCard {...item} />}
            contentContainerStyle={{ gap: 10 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="mt-6 border border-[#959595] p-6 rounded-[15px]">
          <View className=" w-[50px] h-[50px] items-center justify-center bg-primary rounded-full">
            <Text className="font-bold text-white">sAI</Text>
          </View>
          <Text className=" my-4">
            Tell SpaceAI your needs — we’ll match you with the perfect space.
          </Text>
          <Input
            control={control}
            name="aiText"
            placeholder="what are you looking for?..."
            className="rounded-full"
          />
          <View className="flex flex-row flex-wrap gap-4 my-4">
            <Chip onPress={() => {}} text="Garage near my home" />
            <Chip onPress={() => {}} text="Garage with CCTV" />
            <Chip onPress={() => {}} text="Show me storage for boxes" />
          </View>
          <Button text="Chat With AI" />
        </View>
        <View className="mt-6">
          <Text className="mb-4 font-semibold ml-1">All Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <CategoryCard
                onPress={() =>
                  router.push({
                    pathname: "/space",
                    params: { category: item.id },
                  })
                }
                {...item}
              />
            )}
            contentContainerStyle={{ gap: 10 }}
            columnWrapperStyle={{ justifyContent: "center", gap: 10 }}
            numColumns={2}
          />
        </View>
      </View>
    </Container>
  );
}
