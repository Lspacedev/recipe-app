import { Href, router } from "expo-router";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from "react-native";
import CustomInput from "@/components/CustomInput";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import userFetch from "@/hooks/userFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

type InputType =
  | string
  | Number
  | NativeSyntheticEvent<TextInputChangeEventData>;
export default function SignIn() {
  const { getFetch } = userFetch();

  const [username, setUsername] = useState<InputType>("");
  const [password, setPassword] = useState<InputType>("");
  const [error, setError] = useState<InputType>("");
  const url = process.env.EXPO_PUBLIC_API_URL ?? "";

  const signIn = async () => {
    const res = await getFetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (res?.status) {
      Alert.alert("Login success");
      await AsyncStorage.setItem("token", JSON.stringify(res.data.token));
      router.push("/(app)/(home)" as Href);
    } else {
      const errors = res?.data.errors || res?.data.error;
      console.log({ errors });
      //console.log(data?.errors);
      Alert.alert(errors);
    }
    // router.push("/home" as Href);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.formTitle}>Login</Text>
        <CustomInput
          name={"Username"}
          onChange={(text) => {
            setUsername(text);
          }}
          //onBlur={() => handleInput("string", "username", username)}
          error=""
        />
        <CustomInput
          name={"Password"}
          onChange={(text) => {
            setPassword(text);
          }}
          //onBlur={() => handleInput("password", "password", password)}
          error=""
        />

        <Pressable style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => {
              signIn();
              // Navigate after signing in. You may want to tweak this to ensure sign-in is
              // successful before navigating.
            }}
          >
            Sign In
          </Text>
        </Pressable>
        <View>
          <Text style={{ color: "#BDBDBD" }}>Don't have an account?</Text>
          <Pressable>
            <Text
              style={{ color: "#F7F0F0", padding: 5 }}
              onPress={() => {
                router.replace("/register" as Href);
              }}
            >
              Sign up
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#010709" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0C0910",
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
    borderColor: "#BDBDBD",
    padding: 5,
    paddingHorizontal: 10,
    color: "#BDBDBD",
    borderWidth: 0.8,
  },
  button: {
    backgroundColor: "#F7F0F0",
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#0C0910",
    textAlign: "center",
    textTransform: "uppercase",
  },
});