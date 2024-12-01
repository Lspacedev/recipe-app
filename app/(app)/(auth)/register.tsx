import React from "react";
import { useState, useEffect } from "react";
import { Href, Link, router } from "expo-router";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomInput from "@/components/CustomInput";
import userFetch from "@/hooks/userFetch";

type Props = {};
type InputType =
  | string
  | Number
  | NativeSyntheticEvent<TextInputChangeEventData>;
const Register = () => {
  const { getFetch } = userFetch();

  const [username, setUsername] = useState<InputType>("");
  const [email, setEmail] = useState<InputType>("");
  const [password, setPassword] = useState<InputType>("");
  const [role, setRole] = useState<InputType>("ADMIN");
  const url = process.env.EXPO_PUBLIC_API_URL ?? "";

  //   const handleInput = (type, stateName, value) => {
  //     setErrors((errors) => ({
  //       ...errors,
  //       [stateName]: validateInput(type, value),
  //     }));
  //   };
  const createUser = async () => {
    const res = await getFetch(`${url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, role }),
    });
    console.log({ res });
    if (res?.status) {
      router.push("/sign-in" as Href);
    } else {
      //const errors = res?.data.errors;
      console.log(res?.data);
      // Alert.alert(errors.join(","));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.formTitle}>Register</Text>
        <CustomInput
          name={"Username"}
          onChange={setUsername}
          //onBlur={() => handleInput("string", "userName", userName)}
          error=""
        />
        <CustomInput
          name={"Email"}
          onChange={setEmail}
          //onBlur={() => handleInput("string", "userName", userName)}
          error=""
        />

        <CustomInput
          name={"Password"}
          onChange={setPassword}
          //onBlur={() => handleInput("password", "password", password)}
          error=""
        />

        <View style={styles.signInSection}>
          <Text style={{ color: "#F7F0F0" }}>Already have an account?</Text>
          <Pressable>
            <Link href="./sign-in" style={{ color: "#F7F0F0", padding: 5 }}>
              Sign In
            </Link>
          </Pressable>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => {
            createUser();
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}

      <StatusBar backgroundColor="#0C0910" />
    </SafeAreaView>
  );
};
export default Register;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#385747",
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollView: {
    gap: 15,
    paddingVertical: 20,
  },
  formTitle: {
    fontSize: 36,
    marginVertical: 10,
    color: "#F7F0F0",
  },
  inputContainer: {
    gap: 5,
  },
  label: {
    color: "#F7F0F0",
  },
  input: {
    borderRadius: 5,
    borderColor: "#F7F0F0",
    padding: 5,
    paddingHorizontal: 10,
    color: "#F7F0F0",
    borderWidth: 0.8,
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
  signInSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
