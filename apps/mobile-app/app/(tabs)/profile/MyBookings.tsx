import { Container } from "@/components";
import MyBookingCard, { BookingCardSkeleton } from "@/components/profile/MyBookingCard";
import ScreenHeader from "@/components/profile/ScreenHeader";
import { useMyBookings } from "@/hooks/useBookings";
import React from "react";
import { FlatList, Text, View } from "react-native";

const MyBookings = () => {
  const { data, isLoading } = useMyBookings();
  console.log({data})
  return (
    <Container>
      <ScreenHeader title="My Bookings" />
      <View className="mt-3">
        <Text>Spaces that you have booked will appear here</Text>
         {!isLoading && (
        <FlatList
          data={data || []}
          renderItem={({item}) => <MyBookingCard {...item} />}
          keyExtractor={(item) => item.id!}
          showsVerticalScrollIndicator={false}
        />
      )}
      {isLoading && (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={() => <BookingCardSkeleton />}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
      </View>
    </Container>
  );
};

export default MyBookings;
