import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";


/**
 * To hangle logout 
 */
export const handleLogout = async () => {
  try {
    // Import queryClient dynamically to avoid circular dependencies
    const { queryClient } = await import("@/app/_layout");

    const user = queryClient.getQueryData(["user"]);

    if (!user) {
      // Still clear storage and navigate even if no user data
      await AsyncStorage.removeItem("accessToken");
      queryClient.clear();

      // Use setTimeout to ensure navigation happens after current rendering cycle
      setTimeout(() => {
        try {
          router.dismissAll();
        } catch (navError) {
          console.error("Navigation error during logout:", navError);
        }
      }, 100);
      return;
    }

    queryClient.setQueryData(["user"], null);
    await AsyncStorage.removeItem("accessToken");

    // Use setTimeout to ensure navigation happens after current rendering cycle
    setTimeout(() => {
      try {
        router.dismissAll();
        queryClient.clear();
      } catch (navError) {
        console.error("Navigation error during logout:", navError);
        // Force clear anyway
        queryClient.clear();
      }
    }, 100);
  } catch (error) {
    console.error("Error during logout:", error);
    // Even if there's an error, try to clear storage and navigate
    try {
      await AsyncStorage.removeItem("accessToken");
    } catch (fallbackError) {
      console.error("Fallback logout also failed:", fallbackError);
    }
  }
};
