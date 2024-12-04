import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Button,
} from "react-native";
import CustomInput from "@/components/CustomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFetch from "@/hooks/useFetch";
import { Href, router } from "expo-router";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import * as ImagePicker from "expo-image-picker";
import { Buffer } from "buffer";
import parseJWT from "@/utils/checkToken";
import Constants from "expo-constants";
import { Platform } from "react-native";
const FormData = global.FormData;
// type TokenType = string | null;
// type Props = {};
// type InputType =
//   | string
//   | Number
//   | NativeSyntheticEvent<TextInputChangeEventData>;
const AddRecipe = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [cookingTime, setCookingTime] = useState(0);
  const [servings, setServings] = useState(0);
  const [category, setCategory] = useState("");

  const [image, setImage] = useState("");
  const [filename, setFilename] = useState("");
  const [mimeType, setMimeType] = useState("");

  const [recipes, getFetch] = useFetch();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  //const url = process.env.EXPO_PUBLIC_API_URL ?? "";
  const url =
    "http://" +
    Constants.expoConfig?.hostUri?.split(":").shift()?.concat(":3000");
  const getData = async (key) => {
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
      parseJWT(jsonValue);

      setLoading(false);
      setToken(jsonValue);
    })();
  }, []);
  const createRecipe = async (uri) => {
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    // const imageBuffer = Buffer.from(uri, "base64");
    // const imageBlob = new Blob([imageBuffer], { mimeType });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("category", category);
    formData.append("prepTime", prepTime);
    formData.append("cookingTime", cookingTime);
    formData.append("servings", servings);
    const fname = filename.slice(0, filename.lastIndexOf("."));

    formData.append("image", {
      name: fname,
      type: `image/${fileType}`,
      uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
    });

    const res = await fetch(`${url}/api/recipes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    router.push("/(app)/(home)");
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setFilename(result.assets[0].fileName);
      setMimeType(result.assets[0].mimeType);
      setImage(result.assets[0].uri);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        onPress={() => {
          router.push("/(app)/(home)");
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
        name="Category"
        onChange={(text) => setCategory(text)}
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
      <Button title="Pick an image from camera roll" onPress={pickImage} />

      <Pressable
        style={styles.button}
        onPress={() => {
          createRecipe(image);
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
