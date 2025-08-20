import { fetchMyBookings } from "@/queries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

export function useMyBookings() {
  const data = useQuery({
    queryKey: ['myBookings'],
    queryFn: async () => {
      // Check if token exists before making the API call
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        // If no token, return null instead of making the API call
        return null;
      }
      return fetchMyBookings();
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
    return data;
}