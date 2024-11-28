import { useState } from "react";
import {
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import CustomInput from "@/components/CustomInput";
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

  const createRecipe = () => {};
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <CustomInput
        name="Image"
        onChange={(text) => setImageUrl(text)}
        error={""}
      />
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
