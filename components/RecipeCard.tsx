import React from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
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
  imageUrl: string;
  createdAt: string;
};

type RecipeProps = {
  recipe: RecipeType;
};

const RecipeCard: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <View>
      {/* <Image source={{ uri: recipe.imageUrl }} /> */}
      <View>
        <Text>{recipe.name}</Text>
      </View>
      <View>
        <Link
          href={{
            pathname: "./recipes/[id]",
            params: { id: recipe._id },
          }}
        >
          <Pressable>
            <Text>View More</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};
export default RecipeCard;

const styles = StyleSheet.create({
  container: {
    width: (Dimensions.get("window").width - 60) / 2,
    height: 200,
  },
});
