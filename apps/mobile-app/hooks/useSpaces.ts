import { fetchMySpaces, fetchSpace, getUser } from '@/queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';


export function useMySpaces() {
  const data = useQuery({
    queryKey: ['mySpaces'],
    queryFn: async () => {
      // Check if token exists before making the API call
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        // If no token, return null instead of making the API call
        return null;
      }
      return fetchMySpaces();
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
    return data;
}


export function useSingleSpace(id:string) {
  const data = useQuery({
    queryKey: ['space', id],
    queryFn: async () => {
      return fetchSpace(id);
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
    return data;
}