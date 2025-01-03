import React from "react";
import { useState } from "react";
import { Href, Link, router } from "expo-router";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import CustomInput from "@/components/CustomInput";
import userFetch from "@/hooks/userFetch";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { validateInput } from "@/utils/validateInput";

const Register = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });
  const { loading, getFetch } = userFetch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  const url = `${process.env.EXPO_PUBLIC_API_URL}`;
  const [errors, setErrors] = useState({
    username: { error: "" },
    email: { error: "" },
    password: { error: "" },
  });

  const handleInput = (type: string, stateName: string, value: string) => {
    setErrors((errors) => ({
      ...errors,
      [stateName]: validateInput(type, value),
    }));
  };
  const createUser = async () => {
    try {
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
        console.log(res?.data);
      }
    } catch (err) {
      console.log("Error", err);
    }
  };
  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={24}
            color="black"
          />
          <Text style={styles.logo}>CookBook</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="always"
        >
          <Text style={styles.formTitle}>Register</Text>
          <CustomInput
            name={"Username"}
            placeholder="Username"
            handleChange={(text: string) => setUsername(text)}
            onBlur={() => handleInput("string", "username", username)}
            error={errors?.username?.error}
          />
          <CustomInput
            name={"Email"}
            placeholder="Email"
            handleChange={(text: string) => setEmail(text)}
            onBlur={() => handleInput("email", "email", email)}
            error={errors?.email?.error}
          />

          <CustomInput
            name={"Password"}
            placeholder="Password"
            handleChange={(text: string) => setPassword(text)}
            // onBlur={() => handleInput("password", "password", password)}
            error={""}
          />

          <View style={styles.signInSection}>
            <Text style={{ color: "#F7F0F0" }}>Already have an account?</Text>
            <Pressable>
              <Link href="./sign-in" style={{ color: "#F7F0F0", padding: 5 }}>
                Sign In
              </Link>
            </Pressable>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={
              !loading
                ? () => {
                    createUser();
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
        {/* </KeyboardAvoidingView> */}

        <StatusBar backgroundColor="#0C0910" />
      </ScrollView>
    );
  }
};
export default Register;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a2821",
    flex: 1,
    paddingHorizontal: 25,
  },
  logo: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginVertical: 35,
    color: "white",
  },
  scrollView: {
    gap: 15,
    paddingVertical: 20,
  },
  formTitle: {
    fontSize: 36,
    fontFamily: "Poppins_400Regular",
    marginVertical: 10,
    color: "#F7F0F0",
    textAlign: "center",
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
    color: "#385747",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  signInSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
