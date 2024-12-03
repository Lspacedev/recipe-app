import {
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
type InputType = string | NativeSyntheticEvent<TextInputChangeEventData>;

type SearchProps = {
  name: string;
  onChange: (value: InputType) => void;
};
const SearchBar: React.FC<SearchProps> = ({ name, onChange }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={name}
        placeholderTextColor={"#717171"}
        onChangeText={(text) => onChange(text)}
      />
      <EvilIcons
        name="search"
        size={24}
        color="grey"
        style={{ position: "absolute", top: 10, left: 10 }}
      />
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    position: "relative",
    borderRadius: 25,
    backgroundColor: "white",
  },

  input: {
    height: 40,
    borderRadius: 25,
    borderColor: "#BDBDBD",
    textAlign: "center",
    color: "#BDBDBD",
    borderWidth: 0.8,
  },
});
