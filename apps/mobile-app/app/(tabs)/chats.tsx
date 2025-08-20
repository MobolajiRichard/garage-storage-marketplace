import { Container } from "@/components";
import { Image } from "expo-image";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <Container className="items-center ">
      <Text className="text-[18px] font-medium text-center mt-[10vh]">
        You currently have no active chats
      </Text>
      <Text className="mt-2 text-[14px]">Your chats will appear here</Text>
    </Container>
  );
}
