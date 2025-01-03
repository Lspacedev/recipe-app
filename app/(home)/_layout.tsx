import { Redirect, Stack, usePathname } from "expo-router";
import { Text } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import parseJWT from "@/utils/checkToken";

type TokenType = string | null;
export default function Root() {
  const [token, setToken] = useState<TokenType>("");
  const [loading, setLoading] = useState<boolean>(false);
  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      const jsonValue = await getData("token");
      parseJWT(jsonValue);
      setLoading(false);
      setToken(jsonValue);
    })();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!token) {
    console.log({ token });
    return <Redirect href={{ pathname: "/(auth)/sign-in" }} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="AddRecipe"
        options={{
          headerShown: true,
          headerTitle: "Add recipe",
          headerTintColor: "whitesmoke",
          headerStyle: {
            backgroundColor: "#1a2821",
          },
        }}
      />
    </Stack>
  );
}
