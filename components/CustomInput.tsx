import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React from "react";
import { useState } from "react";

type InputType = string | NativeSyntheticEvent<TextInputChangeEventData>;

type CustomInputProps = TextInputProps & {
  name: string;
  placeholder: string;
  error: string | Array<string>;
  handleChange: (value: string) => void;
  value?: string | undefined;
};

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  placeholder,
  handleChange,
  error,
  onBlur,
  value,
}) => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{name}</Text>
      {name === "Password" || name === "Confirm Password" ? (
        <TextInput
          secureTextEntry={!showPassword}
          style={[styles.input]}
          placeholder={placeholder}
          placeholderTextColor={"#717171"}
          onChangeText={(text) => handleChange(text)}
          onBlur={onBlur}
        />
      ) : name === "Instructions" ? (
        <TextInput
          multiline={true}
          style={styles.input}
          textAlignVertical="top"
          placeholder={placeholder}
          placeholderTextColor={"#717171"}
          onChangeText={(text) => handleChange(text)}
          onBlur={onBlur}
          value={value}
        />
      ) : (
        <TextInput
          style={[styles.input]}
          placeholder={placeholder}
          placeholderTextColor={"#717171"}
          onChangeText={(text) => handleChange(text)}
          onBlur={onBlur}
          value={value}
        />
      )}

      {typeof error === "string" && error !== null && (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
};

export default CustomInput;
const styles = StyleSheet.create({
  inputContainer: {
    gap: 5,
    marginVertical: 5,
  },
  label: {
    color: "gray",
    fontWeight: "600",
  },
  input: {
    borderRadius: 5,
    borderColor: "#BDBDBD",
    padding: 5,
    paddingHorizontal: 10,
    color: "#BDBDBD",
    borderWidth: 0.8,
  },
  error: {
    color: "#B9382C",
    marginVertical: -5,
  },
});
