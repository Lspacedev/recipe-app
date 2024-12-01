import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
} from "react-native";
import FAB from "@/components/FAB";
import RecipeCard from "@/components/RecipeCard";
import Searchbar from "@/components/Searchbar";
import useFetch from "@/hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};
type TokenType = string | null;
type InputType = string | NativeSyntheticEvent<TextInputChangeEventData>;

type RecipeType = {
  _id: string;
  name: string;
  ingredients: string;
  instructions: string;
  category: string;
  prepTime: number;
  cookingTime: number;
  servings: number;
  imageUrl: string;
  createdAt: string;
};
const Home = (props: Props) => {
  const [recipes, getFetch] = useFetch();
  const [token, setToken] = useState<TokenType>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<InputType>("");
  const [searchResults, setSearchResults] = useState<Array<RecipeType>>([]);
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
  useEffect(() => {
    if (searchText.toString().length > 0) {
      console.log(recipes);

      const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchText.toString().toLowerCase())
      );
      console.log({ filteredRecipes });
      if (filteredRecipes.length > 0) {
        setSearchResults(filteredRecipes);
      }
    } else {
      setSearchResults([]);
    }
  }, [searchText]);
  console.log("home", token, recipes);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F6F4" }}>
      <View>
        <Text style={styles.title}>Your Personal Cooking Book</Text>
      </View>
      <View style={styles.search}>
        <Searchbar name="Find recipes" onChange={setSearchText} />
      </View>
      <View style={styles.recipes}>
        {searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-around" }}
            renderItem={({ item }) => {
              return <RecipeCard recipe={item} />;
            }}
          />
        ) : recipes.length > 0 ? (
          <FlatList
            data={recipes}
            numColumns={2}
            columnWrapperStyle={{
              gap: 10,
              justifyContent: "space-around",
            }}
            renderItem={({ item }) => {
              return <RecipeCard recipe={item} />;
            }}
          />
        ) : (
          <Text style={{ textAlign: "center", color: "#385747" }}>
            No recipes added
          </Text>
        )}
      </View>
      <FAB />
    </SafeAreaView>
  );
};
export default Home;
const styles = StyleSheet.create({
  recipes: {
    flex: 1,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "#385747",
  },
  search: {
    padding: 15,
  },
});
