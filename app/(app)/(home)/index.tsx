import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import FAB from "@/components/FAB";
import RecipeCard from "@/components/RecipeCard";
import useFetch from "@/hooks/useFetch";
type Props = {};
const Home = (props: Props) => {
  const [recipes, getFetch] = useFetch();
  const url = process.env.EXPO_PUBLIC_API_URL ?? "";
  useEffect(() => {
    getFetch(url, {});
  }, []);
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
