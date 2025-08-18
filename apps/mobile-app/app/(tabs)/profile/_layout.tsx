import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function ProfileLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: ({ children}) => (
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text
              allowFontScaling={false}
              style={[
                {
                  fontSize: 32,
                  fontWeight: '700',
                },
              ]}
            >
              {children}
            </Text>
          </View>
        ),

        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Stack.Screen name="main" options={{ headerShown: false }} />

      {/* <Stack.Screen name="FAQ" options={{ headerShown: false }} />
      <Stack.Screen name="Languages" options={{ headerShown: false }} />
      <Stack.Screen name="MyServices" options={{ headerShown: false }} />
      <Stack.Screen name="MyVerificationStatus" options={{ headerShown: false }} />
      <Stack.Screen name="Notifications" options={{ headerShown: false }} />
      <Stack.Screen name="PersonalInformation" options={{ headerShown: false }} />
      <Stack.Screen name="Security" options={{ headerShown: false }} />
      <Stack.Screen name="BoostService" options={{ headerShown: false }} />
      <Stack.Screen name="create-service/index" options={{ headerShown: false }} />
      <Stack.Screen name="update-service/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" options={{ headerShown: false }} />
      <Stack.Screen name="AiAvatar" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
