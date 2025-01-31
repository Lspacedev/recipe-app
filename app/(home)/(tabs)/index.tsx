import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
} from "react-native";
import FAB from "@/components/FAB";
import RecipeCard from "@/components/RecipeCard";
import Searchbar from "@/components/Searchbar";
import useFetch from "@/hooks/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import parseJWT from "@/utils/checkToken";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import Constants from "expo-constants";

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
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  const [loading, recipes, getFetch] = useFetch();
  const [searchText, setSearchText] = useState<InputType>("");
  const [searchResults, setSearchResults] = useState<Array<RecipeType>>([]);
  const [notFound, setNotFound] = useState(false);
  const url = `${Constants.expoConfig?.extra?.API_URL}/api`;
  useFocusEffect(
    useCallback(() => {
      getRecipes();
    }, [])
  );
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
    getFetch(`${url}/recipes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jsonValue}`,
      },
    });
  };

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
      } else if (searchText.toString() === "Other") {
        const filteredRecipes = recipes.filter(
          (recipe) =>
            !recipe.category.toLowerCase().includes("Breakfast") ||
            !recipe.category.toLowerCase().includes("Lunch") ||
            !recipe.category.toLowerCase().includes("Dinner")
        );
        setSearchResults(filteredRecipes);
      } else {
        setSearchResults([]);
        setNotFound(true);
      }
    } else {
      setSearchResults([]);

      setNotFound(false);
    }
  }, [searchText]);

  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#edece9",
          }}
          contentContainerStyle={{
            paddingBottom: 25,
          }}
        >
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

          <ImageBackground
            source={require("@/assets/images/pexels-yaroslav-shuraev-8851929.jpg")}
            resizeMode="cover"
            style={{
              flex: 1,
              justifyContent: "center",
              height: 150,
              marginHorizontal: 15,
              marginVertical: 10,
            }}
            imageStyle={{ borderRadius: 30 }}
          >
            <Text style={styles.title}>Your Personal Cooking Book</Text>
          </ImageBackground>
          <View style={styles.search}>
            <Searchbar name="Find recipes" onChange={setSearchText} />
          </View>
          <View style={styles.categories}>
            <TouchableOpacity
              onPress={() => setSearchText("")}
              style={[
                {
                  height: 50,
                  width: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#bbb",
                  shadowOffset: { width: 2, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  // borderWidth: 0.7,
                  // borderColor: "#c6d974",
                },
                searchText.toString() === "" && {
                  backgroundColor: "#1f3328",
                  borderColor: "#1f3328",
                },
              ]}
            >
              <Text
                style={[
                  styles.iconTitle,
                  searchText.toString() === "" && { color: "white" },
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSearchText("Breakfast")}
              style={[
                {
                  height: 50,
                  width: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#bbb",
                  shadowOffset: { width: 2, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  // borderWidth: 0.7,
                  // borderColor: "#c6d974",
                  // backgroundColor: "#e9edeb",
                },
                searchText.toString() === "Breakfast" && {
                  backgroundColor: "#1f3328",
                  borderColor: "#1f3328",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="egg-fried"
                size={24}
                color={
                  searchText.toString() === "Breakfast" ? "white" : "#1f3328"
                }
              />
              <Text
                style={[
                  styles.iconTitle,
                  searchText.toString() === "Breakfast" && { color: "white" },
                ]}
              >
                Breakfast
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSearchText("Lunch")}
              style={[
                {
                  height: 50,
                  width: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#bbb",
                  shadowOffset: { width: 2, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  // borderWidth: 0.7,
                  // borderColor: "#c6d974",
                },
                searchText.toString() === "Lunch" && {
                  backgroundColor: "#1f3328",
                  borderColor: "#1f3328",
                },
              ]}
            >
              <Ionicons
                name="fast-food-outline"
                size={24}
                color={searchText.toString() === "Lunch" ? "white" : "#1f3328"}
              />
              <Text
                style={[
                  styles.iconTitle,
                  searchText.toString() === "Lunch" && { color: "white" },
                ]}
              >
                Lunch
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSearchText("Dinner")}
              style={[
                {
                  height: 50,
                  width: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#bbb",
                  shadowOffset: { width: 2, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  // borderWidth: 0.7,
                  // borderColor: "#c6d974",
                },
                searchText.toString() === "Dinner" && {
                  backgroundColor: "#1f3328",
                  borderColor: "#1f3328",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="food-drumstick-outline"
                size={24}
                color={searchText.toString() === "Dinner" ? "white" : "#1f3328"}
              />
              <Text
                style={[
                  styles.iconTitle,
                  searchText.toString() === "Dinner" && { color: "white" },
                ]}
              >
                Dinner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSearchText("Other")}
              style={[
                {
                  height: 50,
                  width: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#bbb",
                  shadowOffset: { width: 2, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  // borderWidth: 0.7,
                  // borderColor: "#c6d974",
                },
                searchText.toString() === "Other" && {
                  backgroundColor: "#1f3328",
                  borderColor: "#1f3328",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="food-outline"
                size={24}
                color={searchText.toString() === "Other" ? "white" : "#1f3328"}
              />
              <Text
                style={[
                  styles.iconTitle,
                  searchText.toString() === "Other" && { color: "white" },
                ]}
              >
                Other
              </Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.recipes}>
              {searchResults.length !== 0 ? (
                searchResults.map((item, i) => (
                  <RecipeCard key={i} recipe={item} />
                ))
              ) : searchResults.length === 0 && notFound === true ? (
                <Text
                  style={{ flex: 1, textAlign: "center", color: "#385747" }}
                >
                  No results
                </Text>
              ) : recipes.length > 0 ? (
                recipes.map((item, i) => <RecipeCard key={i} recipe={item} />)
              ) : (
                <Text
                  style={{
                    flex: 1,
                    textAlign: "center",
                    color: "#385747",
                  }}
                >
                  No recipes added
                </Text>
              )}
            </View>
          )}
        </ScrollView>
        {!loading && !notFound && <FAB />}
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
    textAlignVertical: "center",
    textAlign: "center",
    borderColor: "orange",
    borderWidth: 3,
    borderRadius: 100,
    padding: 5,
  },
  recipes: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginHorizontal: 15,
    fontFamily: "Poppins_400Regular",
  },

  categories: {
    marginVertical: 25,
    marginHorizontal: 15,
    paddingVertical: 15,
    paddingHorizontal: 0,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#e6e6e4",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: "whitesmoke",
  },
  iconTitle: {
    color: "#1f3328",
    fontSize: 10,
  },
  search: {
    padding: 15,
  },
});
