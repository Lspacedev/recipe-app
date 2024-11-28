import React, { useState } from "react";
import { Text, View, FlatList } from "react-native";
import FAB from "@/components/FAB";
import RecipeCard from "@/components/RecipeCard";
type Props = {};
const Home = (props: Props) => {
  const [recipes, setRecipes] = useState([]);
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
