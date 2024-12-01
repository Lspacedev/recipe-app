import { useLocalSearchParams, Link, router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Modal,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import useGet from "@/hooks/useGet";
import useFetch from "@/hooks/useFetch";

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "@/components/CustomInput";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, getRecipeById] = useGet();
  const [recipes, getFetch] = useFetch();
  const [name, setName] = useState();
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState("");
  const [edit, setEdit] = useState(false);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

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
  const updateRecipe = async () => {
    const jsonValue = await getData("token");

    getFetch(
      `${url}/api/recipes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jsonValue}`,
        },
        body: JSON.stringify({
          name,
          ingredients,
          instructions,
          prepTime,
          cookingTime,
          servings,
        }),
      },
      id
    );
    setEdit(false);
    getRecipe();
  };
  const deleteRecipe = async () => {
    const jsonValue = await getData("token");

    getFetch(
      `${url}/api/recipes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jsonValue}`,
        },
      },
      id
    );
    setOpenMenu(false);
    router.push("/");
  };
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Pressable
          onPress={() => router.push("./", { relativeToDirectory: true })}
        >
          <AntDesign name="arrowleft" size={24} color="black" />{" "}
        </Pressable>
        <Pressable
          style={styles.options}
          onPress={() => {
            setOpenMenu(true);
          }}
        >
          <SimpleLineIcons name="options-vertical" size={24} color="black" />
        </Pressable>
      </View>
      <Modal
        style={styles.menuModal}
        animationType="fade"
        transparent={true}
        visible={openMenu}
        onRequestClose={() => {
          setOpenMenu(false);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setOpenMenu(false);
          }}
        >
          <View style={{ backgroundColor: "transparent", flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.menu}>
                <Text
                  onPress={() => {
                    setOpenMenu(false);
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    textAlign: "right",
                  }}
                >
                  <EvilIcons name="close" size={24} color="black" />
                </Text>

                <Pressable
                  style={styles.menuItem}
                  onPress={() => deleteRecipe()}
                >
                  <MaterialIcons name="delete" size={24} />
                  <Text>Delete</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {edit && (
        <Pressable
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            alignSelf: "flex-end",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setEdit(false)}
        >
          x
        </Pressable>
      )}
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
        {edit && (
          <Pressable
            style={styles.button}
            onPress={() => {
              updateRecipe();
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        )}
      </View>

      {!edit && (
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
        >
          <AntDesign name="edit" size={24} color="black" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  nav: {
    backgroundColor: "#2E4057",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  details: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#C0D461",
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#010709",
    textAlign: "center",
    textTransform: "uppercase",
  },
  menuModal: {
    flex: 1,

    backgroundColor: "blue",
  },
  menu: {
    position: "absolute",
    right: 0,
    width: 200,
    height: 150,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    alignItems: "center",
    padding: 5,
  },
});
