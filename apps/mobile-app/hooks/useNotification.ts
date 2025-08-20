import { getMyNotifications } from "@/queries";
import { useQuery } from "@tanstack/react-query";

export function useMyNotification() {
  const data = useQuery({
    queryKey: ['myNotifications'],
    queryFn: async () => {
      return getMyNotifications();
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
    return data;
}