import { getUser } from '@/queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';


export function useUser() {
  const data = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      // Check if token exists before making the API call
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        // If no token, return null instead of making the API call
        return null;
      }
      return getUser();
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
    return data;
}