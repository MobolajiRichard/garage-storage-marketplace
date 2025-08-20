import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: ({ children }) => (
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text
              allowFontScaling={false}
              style={[
                {
                  fontSize: 32,
                  fontWeight: "700",
                },
              ]}
            >
              {children}
            </Text>
          </View>
        ),
        headerShown:false,

        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}
    >

      <Stack.Screen name="main" options={{ headerShown: false }} />
      <Stack.Screen
        name="PersonalInformation"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MySpaces" options={{ headerShown: false }} />
      <Stack.Screen name="MyBookings" options={{ headerShown: false }} />
      <Stack.Screen name="Security" options={{ headerShown: false }} />
      <Stack.Screen name="Languages" options={{ headerShown: false }} />
      <Stack.Screen name="CreateSpace" options={{ headerShown: false }} />

    </Stack>
  );
}
