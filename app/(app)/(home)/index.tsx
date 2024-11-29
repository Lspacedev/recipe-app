import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import FAB from "@/components/FAB";
import RecipeCard from "@/components/RecipeCard";
import useFetch from "@/hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};
type TokenType = string | null;
const Home = (props: Props) => {
  const [recipes, getFetch] = useFetch();
  const [token, setToken] = useState<TokenType>("");
  const [loading, setLoading] = useState<boolean>(false);
  const url = process.env.EXPO_PUBLIC_API_URL ?? "";
  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const getRecipes = async () => {
    const jsonValue = await getData("token");
    getFetch(`${url}/api/recipes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jsonValue}`,
      },
    });
  };
  useEffect(() => {
    getRecipes();
  }, []);

  console.log("home", token, recipes);
  return (
    <>
      <FlatList
        data={recipes}
        numColumns={2}
        renderItem={({ item }) => {
          return <RecipeCard recipe={item} />;
        }}
      />

      <FAB />
    </>
  );
};
export default Home;
