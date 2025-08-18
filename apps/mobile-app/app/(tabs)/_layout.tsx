import { Tabs } from "expo-router";
import React, { useCallback } from "react";
import { Platform, Text } from "react-native";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const renderTabIcon = useCallback(
    ({ focused, iconType }: { focused: boolean; iconType: string }) => {
      const color = focused ? "#28287a" : "#959595";

      switch (iconType) {
        case "explore":
          return <Ionicons name="search-outline" size={24} color={color} />;
        case "chats":
          return (
            <Ionicons name="chatbubbles-outline" size={24} color={color} />
          );
        case "notifications":
          return <Feather name="bell" size={24} color={color} />;
        case "profile":
          return <FontAwesome6 name="circle-user" size={24} color={color} />;
        default:
          return null;
      }
    },
    []
  );

  const renderTabLabel = useCallback(
    ({ focused, label }: { focused: boolean; label: string }) => {
      return (
        <Text
          
          className={"text-[12px]  "}
          style={{ color: focused ? "#28287a" : "#959595" , fontFamily:"Poppins"}}
        >
          {label}
        </Text>
      );
    },
    []
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontSize: 32,
          fontWeight: '700',
        },
        tabBarStyle: {
          backgroundColor: 'white',
          paddingBottom: 6,
          paddingTop: 6,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) =>
            renderTabIcon({ focused, iconType: "explore" }),
            tabBarLabel: ({ focused }) => renderTabLabel({ focused, label: 'Explore' }),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ focused }) =>
            renderTabIcon({ focused, iconType: "chats" }),
            tabBarLabel: ({ focused }) => renderTabLabel({ focused, label: 'Chats' }),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ focused }) =>
            renderTabIcon({ focused, iconType: "notifications" }),
            tabBarLabel: ({ focused }) => renderTabLabel({ focused, label: 'Notifications' }),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) =>
            renderTabIcon({ focused, iconType: "profile" }),
            tabBarLabel: ({ focused }) => renderTabLabel({ focused, label: 'Profile' }),
        }}
      />
    </Tabs>
  );
}
