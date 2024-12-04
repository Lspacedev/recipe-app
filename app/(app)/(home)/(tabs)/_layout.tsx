import { Tabs, router } from "expo-router";
import { Text } from "react-native";
import { useState, useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    router.push("/(app)/(auth)/sign-in");
  };
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        tabBarLabelStyle: {
          color: "#BDBDBD",
        },
        tabBarActiveTintColor: "#C0D461",
        tabBarInactiveTintColor: "#13211a",
        tabBarActiveBackgroundColor: "white",
        tabBarInactiveBackgroundColor: "white",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color }) => {
            return <Entypo name="home" size={24} color={color} />;
          },
        }}
      />
      {/* <Tabs.Screen name="recordings" options={{ headerShown: false }} /> */}

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          headerTintColor: "whitesmoke",
          headerStyle: {
            backgroundColor: "#385747",
          },
          tabBarLabel: "",

          tabBarIcon: ({ color }) => {
            return (
              <Ionicons name="person-circle-sharp" size={24} color={color} />
            );
          },

          headerRight: () => (
            <Text
              style={{ color: "whitesmoke", paddingHorizontal: 15 }}
              onPress={() => {
                signOut();
              }}
            >
              Sign Out
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
