import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Modal,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import useGet from "@/hooks/useGet";
import useFetch from "@/hooks/useFetch";

import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "@/components/CustomInput";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import parseJWT from "@/utils/checkToken";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
export default function DetailsScreen() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  const { id } = useLocalSearchParams();
  const [loading, recipe, getRecipeById] = useGet();
  const [updateLoading, recipes, getFetch] = useFetch();

  const [name, setName] = useState();
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState("");
  const [edit, setEdit] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  useFocusEffect(
    useCallback(() => {
      getRecipe();
    }, [id])
  );
  useEffect(() => {
    if (!loading) {
      setName(recipe.name);
      setCategory(recipe.category);
      setCookingTime(recipe.cookingTime.toString());
      setPrepTime(recipe.prepTime.toString());
      setInstructions(recipe.instructions);
      setIngredients(recipe.ingredients);
      setServings(recipe.servings.toString());
    }
  }, [loading, recipe]);
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api`;

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
    parseJWT(jsonValue);

    getRecipeById(`${url}/recipes/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jsonValue}`,
      },
    });
  };

  const updateRecipe = async () => {
    const jsonValue = await getData("token");
    parseJWT(jsonValue);
    console.log({ prepTime });
    await getFetch(
      `${url}/recipes/${id}`,
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
          category,
          prepTime,
          cookingTime,
          servings,
        }),
      },
      id
    );
    await getRecipe();
    setEdit(false);
  };
  const deleteRecipe = async () => {
    const jsonValue = await getData("token");
    parseJWT(jsonValue);

    getFetch(
      `${url}/recipes/${id}`,
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

  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="always"
        >
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
                <AntDesign
                  name="arrowleft"
                  size={24}
                  style={styles.arrowText}
                />
              </Pressable>
              <Pressable
                style={styles.options}
                onPress={() => {
                  setOpenMenu(true);
                }}
              >
                <SimpleLineIcons
                  name="options-vertical"
                  size={24}
                  style={{
                    color: "whitesmoke",
                    backgroundColor: "black",
                    padding: 5,
                    borderRadius: 50,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                  }}
                />
              </Pressable>
            </View>
          </ImageBackground>
          <ScrollView
            style={[
              !edit
                ? styles.details
                : {
                    marginTop: -30,

                    paddingVertical: 15,
                    padding: 25,
                    borderTopLeftRadius: 35,
                    borderTopRightRadius: 35,
                    backgroundColor: "#edece9",
                    fontFamily: "Poppins_400Regular",
                  },
            ]}
            keyboardShouldPersistTaps="always"
          >
            {edit && (
              <TouchableOpacity
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
              </TouchableOpacity>
            )}
            {!edit ? (
              <Text
                style={{
                  color: "#1f3328",
                  fontSize: 30,
                  fontWeight: 600,
                  textAlign: "start",
                  fontFamily: "Poppins_400Regular",
                }}
              >
                {recipe && recipe.name}
              </Text>
            ) : (
              <CustomInput
                name={"Name"}
                handleChange={(text) => setName(text)}
                //onBlur={() => handleInput("string", "userName", userName)}
                error=""
                value={name}
              />
            )}
            <View
              style={[
                !edit
                  ? styles.timeContainer
                  : { flexDirection: "column", gap: 10 },
              ]}
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
                  <Feather name="clock" size={24} style={styles.icon} />
                  <Text style={{ fontWeight: 500, color: "#58605b" }}>
                    {recipe && recipe.prepTime}
                  </Text>
                </View>
              ) : (
                <CustomInput
                  name={"PrepTime"}
                  handleChange={(text) => setPrepTime(text)}
                  //onBlur={() => handleInput("string", "userName", userName)}
                  error=""
                  value={prepTime}
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
                  <MaterialCommunityIcons
                    name="av-timer"
                    size={24}
                    style={styles.icon}
                  />
                  <Text style={{ fontWeight: 500, color: "#58605b" }}>
                    {recipe && recipe.cookingTime}
                  </Text>
                </View>
              ) : (
                <CustomInput
                  name={"CookingTime"}
                  handleChange={(text) => setCookingTime(text)}
                  //onBlur={() => handleInput("string", "userName", userName)}
                  error=""
                  value={cookingTime}
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
                  <Entypo name="bowl" size={24} style={styles.icon} />
                  <Text style={{ fontWeight: 500, color: "#58605b" }}>
                    {recipe && recipe.servings}
                  </Text>
                </View>
              ) : (
                <CustomInput
                  name={"Servings"}
                  handleChange={(text) => setServings(text)}
                  //onBlur={() => handleInput("string", "userName", userName)}
                  error=""
                  value={servings}
                />
              )}
            </View>
            <View>
              {!edit ? (
                <View style={styles.infoContainer}>
                  <Text
                    style={{ fontSize: 21, fontWeight: 600, color: "#1f3328" }}
                  >
                    {recipe && "Category"}
                  </Text>
                  <Text style={{ color: "#58605b" }}>
                    {recipe && recipe.category}
                  </Text>
                </View>
              ) : (
                <CustomInput
                  name={"Category"}
                  handleChange={(text) => setCategory(text)}
                  //onBlur={() => handleInput("string", "userName", userName)}
                  error=""
                  value={category}
                />
              )}
            </View>
            <View>
              {!edit ? (
                <View style={styles.infoContainer}>
                  <Text
                    style={{ fontSize: 21, fontWeight: 600, color: "#1f3328" }}
                  >
                    {recipe && "Ingredients"}
                  </Text>

                  <Text style={{ color: "#58605b" }}>
                    {recipe && recipe.ingredients}
                  </Text>
                </View>
              ) : (
                <CustomInput
                  name={"Ingredients"}
                  handleChange={(text) => setIngredients(text)}
                  //onBlur={() => handleInput("string", "userName", userName)}
                  error=""
                  value={ingredients}
                />
              )}
            </View>
            <View>
              {!edit ? (
                <View style={styles.infoContainer}>
                  <Text
                    style={{ fontSize: 21, fontWeight: 600, color: "#1f3328" }}
                  >
                    {recipe && "Instructions"}
                  </Text>
                  <Text style={{ color: "#58605b" }}>
                    {recipe && recipe.instructions}
                  </Text>
                </View>
              ) : (
                <CustomInput
                  name={"Instructions"}
                  handleChange={(text) => setInstructions(text)}
                  //onBlur={() => handleInput("string", "userName", userName)}
                  error=""
                  value={instructions}
                />
              )}
            </View>

            {edit && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  updateRecipe();
                }}
              >
                {updateLoading ? (
                  <ActivityIndicator size="small" color="#2E4057" />
                ) : (
                  <Text style={styles.buttonText}>Submit</Text>
                )}
              </TouchableOpacity>
            )}
          </ScrollView>
        </ScrollView>
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
            <Octicons name="pencil" size={24} color="black" />
          </Pressable>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#edece9",
  },
  nav: {
    height: 260,
    backgroundColor: "transparent",
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  backArrow: {
    color: "white",
    backgroundColor: "black",
    padding: 5,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  arrowText: {
    color: "whitesmoke",
  },
  imgContainer: {},
  img: { flex: 1 },
  details: {
    marginTop: -30,
    paddingTop: 15,
    padding: 25,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: "#edece9",
    fontFamily: "Poppins_400Regular",
  },
  timeContainer: {
    marginVertical: 15,
    flexDirection: "row",
  },
  icon: {
    // backgroundColor: "#f2f7e2",

    color: "#1f3328",
    padding: 5,
    borderRadius: 10,
  },
  infoContainer: {
    marginVertical: 10,
    fontFamily: "Poppins_400Regular",
    // backgroundColor: "#e6e6e4",
    paddingVertical: 5,
    borderRadius: 25,
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
