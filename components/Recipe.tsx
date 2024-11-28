import React from "react";
import { Link } from "expo-router";
import { View, Pressable, Image } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
type RecipeType = {
  _id: string;
  name: string;
  ingredients: string;
  instructions: string;
  category: string;
  prepTime: number;
  cookingTime: number;
  servings: number;
  //imageUrl: string,
  createdAt: string;
};

type RecipeProps = {
  deleteRecipe: (value: string) => void;
  recipe: RecipeType;
};

const Recipe: React.FC<RecipeProps> = ({ deleteRecipe, recipe }) => {
  return <View></View>;
};
export default Recipe;
