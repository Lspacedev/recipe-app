import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
  Pressable,
} from "react-native";
import FAB from "@/components/FAB";
import RecipeCard from "@/components/RecipeCard";
import Searchbar from "@/components/Searchbar";
import useFetch from "@/hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import parseJWT from "@/utils/checkToken";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
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
  console.log("index");

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });
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
    parseJWT(jsonValue);
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
      const filteredRecipes = recipes.filter(
        (recipe) =>
          recipe.name
            .toLowerCase()
            .includes(searchText.toString().toLowerCase()) ||
          recipe.category
            .toLowerCase()
            .includes(searchText.toString().toLowerCase())
      );
      if (filteredRecipes.length > 0) {
        setSearchResults(filteredRecipes);
      }
    } else {
      setSearchResults([]);
    }
  }, [searchText]);
  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={24}
            color="black"
          />
          <Text style={styles.logo}>CookBook</Text>
        </View>
        <View>
          <Text style={styles.title}>Your Personal Cooking Book</Text>
        </View>
        <View style={styles.search}>
          <Searchbar name="Find recipes" onChange={setSearchText} />
        </View>
        <View style={styles.categories}>
          <Pressable
            onPress={() => setSearchText("")}
            style={{
              height: 50,
              width: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#bbb",
              shadowOffset: { width: 2, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: 600, color: "#385747" }}>
              All
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSearchText("Breakfast")}
            style={{
              height: 50,
              width: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#bbb",
              shadowOffset: { width: 2, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
            }}
          >
            <MaterialCommunityIcons
              name="egg-fried"
              size={24}
              color="#385747"
            />
            <Text style={styles.iconTitle}>Breakfast</Text>
          </Pressable>
          <Pressable
            onPress={() => setSearchText("Lunch")}
            style={{
              height: 50,
              width: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#bbb",
              shadowOffset: { width: 2, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
            }}
          >
            <Ionicons name="fast-food-outline" size={24} color="#385747" />
            <Text style={styles.iconTitle}>Lunch</Text>
          </Pressable>
          <Pressable
            onPress={() => setSearchText("Dinner")}
            style={{
              height: 50,
              width: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#bbb",
              shadowOffset: { width: 2, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
            }}
          >
            <MaterialCommunityIcons
              name="food-drumstick-outline"
              size={24}
              color="#385747"
            />
            <Text style={styles.iconTitle}>Dinner</Text>
          </Pressable>
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
  }
};
export default Home;
const styles = StyleSheet.create({
  logo: {
    color: "black",
    fontSize: 15,
    fontWeight: "800",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  recipes: {
    flex: 1,
    marginHorizontal: 15,
    fontFamily: "Poppins_400Regular",
  },

  categories: {
    marginVertical: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  title: {
    marginTop: 25,
    fontSize: 45,
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: "#213b2d",
  },
  iconTitle: {
    color: "#385747",
    fontSize: 10,
  },
  search: {
    padding: 15,
  },
});
