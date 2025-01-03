import { Tabs, router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    router.push({ pathname: "/(auth)/sign-in" });
  };
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          borderBottomWidth: 5,
          borderBottomColor: "#edece9",
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Text style={{ fontSize: 13, color: focused ? "red" : "gray" }}>
              {route.name}
            </Text>
          );
        },

        tabBarActiveTintColor: "#C0D461",
        tabBarInactiveTintColor: "#13211a",
        tabBarActiveBackgroundColor: "#f2f2f0",
        tabBarInactiveBackgroundColor: "#f2f2f0",
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "Home",

          tabBarIcon: ({ color }) => {
            return <Entypo name="home" size={24} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          headerTintColor: "whitesmoke",
          headerStyle: {
            backgroundColor: "#1a2821",
          },

          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons name="person-circle-sharp" size={24} color={color} />
            );
          },

          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <MaterialIcons
                name="logout"
                size={24}
                color="whitesmoke"
                style={{ paddingHorizontal: 15 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
