import { View, Text, Pressable } from "react-native";
import ScreenHeader from "@/components/profile/ScreenHeader";
import { Container } from "@/components";
import { LANGUAGES } from "@/constants/languages";

export default function Languages() {
  return (
    <Container className="flex-col gap-8 py-4">
      <ScreenHeader title={"Languages"} />

      <View className="flex-col gap-2">
        {LANGUAGES.map((item) => (
          <Pressable
            key={item.code}
            className="flex-row items-center justify-between border-b border-gray-200 py-2 pb-4"
          >
            <Text className="text-lg">{item.name}</Text>
          </Pressable>
        ))}
      </View>
    </Container>
  );
}
