import { Container, MySpaceCard } from "@/components";
import { SpaceCardSkeleton } from "@/components/profile/MySpaceCard";
import ScreenHeader from "@/components/profile/ScreenHeader";
import { useMySpaces } from "@/hooks/useSpaces";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable,  View } from "react-native";

const MySpaces = () => {
  const { data, isLoading } = useMySpaces();
  return (
    <Container edges={["top"]}>
      <View className="flex-row items-end justify-between mb-4">
        <ScreenHeader title={"My Spaces"} />
        <Pressable
          onPress={() => router.push("/(tabs)/profile/CreateSpace")}
          className="bg-gray-100 w-[40px] h-[40px] rounded-full items-center justify-center"
        >
          <Feather name="plus" size={24} color="black" />
        </Pressable>
      </View>
      {!isLoading && (
        <FlatList
          data={data || []}
          renderItem={({item}) => <MySpaceCard {...item} />}
          keyExtractor={(item) => item?.id}
          showsVerticalScrollIndicator={false}
        />
      )}
      {isLoading && (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={() => <SpaceCardSkeleton />}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Container>
  );
};

export default MySpaces;
