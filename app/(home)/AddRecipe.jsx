import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomInput from "@/components/CustomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import * as ImagePicker from "expo-image-picker";
import parseJWT from "@/utils/checkToken";
import { Platform } from "react-native";
import { validateInput } from "@/utils/validateInput";

const FormData = global.FormData;

const AddRecipe = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState("");
  const [category, setCategory] = useState("");

  const [image, setImage] = useState("");
  const [filename, setFilename] = useState("");
  const [mimeType, setMimeType] = useState("");

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api`;
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
    if (
      name === "" &&
      ingredients === "" &&
      instructions === "" &&
      category === "" &&
      prepTime === "" &&
      cookingTime === "" &&
      servings === ""
    ) {
      Alert.alert("Fields cannot be empty");
      return;
    }
    try {
      setLoading(true);
      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];

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

      const res = await fetch(`${url}/recipes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      router.push({ pathname: "/(home)/(tabs)" });
    } catch (error) {
      console.log("Error", error);
    }
    setLoading(false);
  };
  const pickImage = async () => {
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
  const handleInput = (type, stateName, value) => {
    setErrors((errors) => ({
      ...errors,
      [stateName]: validateInput(type, value),
    }));
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="always"
    >
      <TouchableOpacity
        onPress={() => {
          router.push({ pathname: "/(home)/(tabs)" });
        }}
        style={{
          padding: 0,
          margin: 0,
          alignItems: "flex-end",
        }}
      >
        <EvilIcons name="close" size={24} color="black" />
      </TouchableOpacity>
      <CustomInput
        name="Name"
        placeholder="e.g. Pasta"
        handleChange={(text) => setName(text)}
        onBlur={() => handleInput("string", "name", name)}
        error={errors?.name?.error}
      />
      <CustomInput
        name="Ingredients"
        placeholder="e.g. Flour, sugar, water"
        handleChange={(text) => setIngredients(text)}
        onBlur={() => handleInput("string", "ingredients", ingredients)}
        error={errors?.ingredients?.error}
      />
      <CustomInput
        name="Instructions"
        placeholder="e.g. Add water"
        handleChange={(text) => setInstructions(text)}
        onBlur={() => handleInput("string", "instructions", instructions)}
        error={errors?.instructions?.error}
      />
      <CustomInput
        name="Category"
        placeholder="e.g. Breakfast"
        handleChange={(text) => setCategory(text)}
        onBlur={() => handleInput("string", "category", category)}
        error={errors?.category?.error}
      />
      <CustomInput
        name="PrepTime"
        placeholder="e.g. 10"
        handleChange={(text) => setPrepTime(text)}
        onBlur={() => handleInput("number", "prepTime", prepTime)}
        error={errors?.prepTime?.error}
      />
      <CustomInput
        name="CookingTime"
        placeholder="e.g. 30"
        handleChange={(text) => setCookingTime(text)}
        onBlur={() => handleInput("number", "cookingTime", cookingTime)}
        error={errors?.cookingTime?.error}
      />
      <CustomInput
        name="Servings"
        placeholder="e.g. 10"
        handleChange={(text) => setServings(text)}
        onBlur={() => handleInput("number", "servings", servings)}
        error={errors?.servings?.error}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "transparent",
          paddingVertical: 15,
          borderRadius: 10,
          borderColor: "#BDBDBD",
          borderWidth: 0.8,
        }}
        onPress={pickImage}
      >
        <Text style={{ color: "#1f3328", textAlign: "center" }}>
          Select image
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={
          !loading
            ? () => {
                createRecipe(image);
              }
            : () => {
                console.log("tap");
              }
        }
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#edece9",
    padding: 20,
    gap: 20,
  },
  button: {
    backgroundColor: "#1f3328",
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
