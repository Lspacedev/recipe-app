import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import CustomInput from "@/components/CustomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFetch from "@/hooks/useFetch";
import { Href, router } from "expo-router";
import EvilIcons from "@expo/vector-icons/EvilIcons";

type TokenType = string | null;
type Props = {};
type InputType =
  | string
  | Number
  | NativeSyntheticEvent<TextInputChangeEventData>;
const AddRecipe = (props: Props) => {
  const [name, setName] = useState<InputType>("");
  const [ingredients, setIngredients] = useState<InputType>("");
  const [instructions, setInstructions] = useState<InputType>("");
  const [prepTime, setPrepTime] = useState<InputType>(0);
  const [cookingTime, setCookingTime] = useState<InputType>(0);
  const [servings, setServings] = useState<InputType>(0);
  const [imageUrl, setImageUrl] = useState<InputType>("");

  const [recipes, getFetch] = useFetch();
  const [token, setToken] = useState<TokenType>("");
  const [loading, setLoading] = useState<boolean>(false);
  const url = process.env.EXPO_PUBLIC_API_URL ?? "";
  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      const jsonValue = await getData("token");
      setLoading(false);
      setToken(jsonValue);
    })();
  }, []);
  const createRecipe = () => {
    getFetch(`${url}/api/recipes`, {
      method: "POST",
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
    router.push("/(app)/(home)" as Href);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        onPress={() => {
          router.push("/(app)/(home)" as Href);
        }}
        style={{
          padding: 0,
          margin: 0,
          textAlign: "right",
        }}
      >
        <EvilIcons name="close" size={24} color="black" />
      </Text>
      <CustomInput name="Name" onChange={(text) => setName(text)} error={""} />
      <CustomInput
        name="Ingredients"
        onChange={(text) => setIngredients(text)}
        error={""}
      />
      <CustomInput
        name="Instructions"
        onChange={(text) => setInstructions(text)}
        error={""}
      />
      <CustomInput
        name="PrepTime"
        onChange={(text) => setPrepTime(text)}
        error={""}
      />
      <CustomInput
        name="CookingTime"
        onChange={(text) => setCookingTime(text)}
        error={""}
      />
      <CustomInput
        name="Servings"
        onChange={(text) => setServings(text)}
        error={""}
      />
      {/* <CustomInput
        name="Image"
        onChange={(text) => setImageUrl(text)}
        error={""}
      /> */}
      <Pressable
        style={styles.button}
        onPress={() => {
          createRecipe();
        }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    padding: 20,
    gap: 10,
  },
  button: {
    backgroundColor: "#2E4057",
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
export default AddRecipe;
