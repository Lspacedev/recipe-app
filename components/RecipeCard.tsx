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
        {/* <Image source={{ uri: recipe.imageUrl }} /> */}
        <View style={styles.recipeText}>
          <Text style={{ color: "whitesmoke" }}>{recipe.name}</Text>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Feather name="clock" size={24} color="whitesmoke" />
            <Text style={{ color: "whitesmoke" }}>{recipe.cookingTime}</Text>
          </View>
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
    backgroundColor: "grey",
    borderRadius: 25,
    marginTop: 15,
  },
  recipeText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});
