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
import Feather from "@expo/vector-icons/Feather";
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
    <Link
      href={{
        pathname: "./[id]",
        params: { id: recipe._id },
      }}
    >
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={{ uri: recipe.imageUrl }} style={styles.img} />
        </View>
        <View style={styles.recipeText}>
          <Text style={{ color: "black" }}>{recipe.name}</Text>
        </View>
      </View>
    </Link>
  );
};
export default RecipeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: (Dimensions.get("window").width - 60) / 2,
    height: 200,
    borderRadius: 25,
    marginTop: 15,
  },
  imgContainer: {
    width: (Dimensions.get("window").width - 60) / 2,
    height: 180,
    borderRadius: 25,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  img: {
    flex: 1,
    borderRadius: 25,
  },
  recipeText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    fontWeight: 600,
  },
});
