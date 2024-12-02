import { useLocalSearchParams, Link, router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
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
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
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
    if (JSON.stringify(recipe) === "{}") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [recipe]);
  useEffect(() => {
    getRecipe();
  }, [id]);

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
  if (loading)
    return (
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="#2E4057" />
      </View>
    );

  return (
    <View style={styles.container}>
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

      <ImageBackground
        source={{ uri: recipe.imageUrl }}
        resizeMode="cover"
        style={styles.img}
      >
        <View style={styles.nav}>
          <Pressable
            style={styles.backArrow}
            onPress={() => router.push("./", { relativeToDirectory: true })}
          >
            <AntDesign name="arrowleft" size={24} style={styles.arrowText} />
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
      </ImageBackground>
      <View style={styles.details}>
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
            <EvilIcons name="close" size={24} color="black" />
          </Pressable>
        )}
        {!edit ? (
          <Text
            style={{
              color: "#2E4057",
              fontSize: 30,
              fontWeight: 600,
              textAlign: "start",
            }}
          >
            {recipe && recipe.name}
          </Text>
        ) : (
          <CustomInput
            name={"Name"}
            onChange={setName}
            //onBlur={() => handleInput("string", "userName", userName)}
            error=""
          />
        )}
        <View
          style={[!edit ? styles.timeContainer : { flexDirection: "column" }]}
        >
          {!edit ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Feather name="clock" size={24} color="black" />
              <Text>{recipe && recipe.prepTime}</Text>
            </View>
          ) : (
            <CustomInput
              name={"PrepTime"}
              onChange={setPrepTime}
              //onBlur={() => handleInput("string", "userName", userName)}
              error=""
            />
          )}

          {!edit ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <MaterialCommunityIcons name="av-timer" size={24} color="black" />
              <Text>{recipe && recipe.cookingTime}</Text>
            </View>
          ) : (
            <CustomInput
              name={"CookingTime"}
              onChange={setCookingTime}
              //onBlur={() => handleInput("string", "userName", userName)}
              error=""
            />
          )}

          {!edit ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Entypo name="bowl" size={24} color="black" />
              <Text>{recipe && recipe.servings}</Text>
            </View>
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
            <View style={styles.infoContainer}>
              <Text style={{ fontSize: 21, fontWeight: 600, color: "#121b27" }}>
                {recipe && "Ingredients"}
              </Text>

              <Text>{recipe && recipe.ingredients}</Text>
            </View>
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
            <View style={styles.infoContainer}>
              <Text style={{ fontSize: 21, fontWeight: 600, color: "#121b27" }}>
                {recipe && "Instructions"}
              </Text>
              <Text>{recipe && recipe.instructions}</Text>
            </View>
          ) : (
            <CustomInput
              name={"Instructions"}
              onChange={setInstructions}
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
    backgroundColor: "transparent",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  backArrow: {
    color: "white",
    backgroundColor: "black",
    padding: 5,
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  arrowText: {
    color: "whitesmoke",
  },
  imgContainer: {
    flex: 1,
  },
  img: {
    flex: 1,
  },
  details: {
    marginTop: -25,
    paddingTop: 15,
    padding: 25,
    flex: 2,
    borderRadius: 35,
    backgroundColor: "white",
  },
  timeContainer: {
    marginVertical: 25,
    flexDirection: "row",
  },
  infoContainer: {
    marginVertical: 25,
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
  },
  menu: {
    position: "absolute",
    right: 0,
    width: 200,
    height: 100,
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