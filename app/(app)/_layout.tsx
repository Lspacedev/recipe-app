import { Redirect, Stack, usePathname } from "expo-router";
import { Text } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
type TokenType = string | null;
export default function Root() {
  const pathname = usePathname();
  const authRoutes = ["/sign-in", "/register"];
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
      setLoading(false);
      setToken(jsonValue);
    })();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!token && !authRoutes.includes(pathname)) {
    return <Redirect href={{ pathname: "/sign-in" }} />;
  }
  if (token && authRoutes.includes(pathname)) {
    return <Redirect href={{ pathname: "/(app)/(home)" }} />;
  }
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
    </Stack>
  );
}
