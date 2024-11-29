import { useLocalSearchParams, Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import useGet from "@/hooks/useGet";
import useFetch from "@/hooks/useFetch";

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "@/components/CustomInput";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, getRecipeById] = useGet();
  const [recipes, getFetch] = useFetch();
  const [name, setName] = useState();
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [cookingTime, setCookingTime] = useState(0);
  const [servings, setServings] = useState(0);
  const [edit, setEdit] = useState(false);

  //   type RecipeType = {
  //     _id: string;
  //     name: string;
  //     ingredients: string;
  //     instructions: string;
  //     category: string;
  //     prepTime: number;
  //     cookingTime: number;
  //     servings: number;
  //     //imageUrl: string,
  //     createdAt: string;
  //   };

  //   type RecipeProps = {
  //     deleteRecipe: (value: string) => void;
  //     recipe: RecipeType;
  //   };
  const url = process.env.EXPO_PUBLIC_API_URL ?? "";
  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const getRecipe = async () => {
    const jsonValue = await getData("token");
    getRecipeById(`${url}/api/recipes/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jsonValue}`,
      },
    });
  };
  useEffect(() => {
    getRecipe();
  }, []);
  const updateRecipe = () => {
    getFetch(`${url}/api/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        ingredients,
        instructions,
        prepTime,
        cookingTime,
        servings,
      }),
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        {!edit ? (
          <Text>{recipe && recipe.name}</Text>
        ) : (
          <CustomInput
            name={"Name"}
            onChange={setName}
            //onBlur={() => handleInput("string", "userName", userName)}
            error=""
          />
        )}
        <View>
          {!edit ? (
            <Text>{recipe && recipe.ingredients}</Text>
          ) : (
            <CustomInput
              name={"Ingredients"}
              onChange={setIngredients}
              //onBlur={() => handleInput("string", "userName", userName)}
              error=""
            />
          )}
        </View>
        <View>
          {!edit ? (
            <Text>{recipe && recipe.instructions}</Text>
          ) : (
            <CustomInput
              name={"Instructions"}
              onChange={setInstructions}
              //onBlur={() => handleInput("string", "userName", userName)}
              error=""
            />
          )}
        </View>
        <View>
          {!edit ? (
            <Text>{recipe && recipe.prepTime}</Text>
          ) : (
            <CustomInput
              name={"PrepTime"}
              onChange={setPrepTime}
              //onBlur={() => handleInput("string", "userName", userName)}
              error=""
            />
          )}
        </View>
        <View>
          {!edit ? (
            <Text>{recipe && recipe.cookingTime}</Text>
          ) : (
            <CustomInput
              name={"CookingTime"}
              onChange={setCookingTime}
              //onBlur={() => handleInput("string", "userName", userName)}
              error=""
            />
          )}
        </View>
        <View>
          {!edit ? (
            <Text>{recipe && recipe.servings}</Text>
          ) : (
            <CustomInput
              name={"Servings"}
              onChange={setServings}
              //onBlur={() => handleInput("string", "userName", userName)}
              error=""
            />
          )}
        </View>
        <View>
          {!edit ? (
            <Text>{recipe && recipe.name}</Text>
          ) : (
            <CustomInput
              name={"Name"}
              onChange={setName}
              //onBlur={() => handleInput("string", "userName", userName)}
              error=""
            />
          )}
        </View>
      </View>

      <Pressable
        style={{
          height: 50,
          width: 50,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#C0D461",
          position: "absolute",
          bottom: 30,
          right: 30,
        }}
        onPress={() => setEdit(true)}
      ></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  details: {
    flex: 1,
  },
});
