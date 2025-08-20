import { Container } from "@/components";
import NotificationCard, {
  NotificationCardSkeleton,
} from "@/components/notification/NotificationCard";
import { useMyNotification } from "@/hooks/useNotification";
import { FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  const { data, isLoading } = useMyNotification();
  return (
    <Container className="pt-0">
      {isLoading && (
        <FlatList
          data={[...Array(8)]}
          renderItem={() => <NotificationCardSkeleton />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View className="my-5 border-b border-solid border-gray-400" />
          )}
        />
      )}
      {!!data?.length && (
        <FlatList
          data={data}
          renderItem={({ item }) => <NotificationCard {...item} />}
          keyExtractor={(item) => item.id!}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View className="my-5 border-b border-solid border-gray-400" />
          )}
          onEndReachedThreshold={0.5}
        />
      )}
      {!!!data?.length && !isLoading && (
        <>
          <Text className="text-[18px] font-medium text-center mt-[10vh]">
            You currently have no notifications
          </Text>
        </>
      )}
    </Container>
  );
}
