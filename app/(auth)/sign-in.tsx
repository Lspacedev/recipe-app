import { Href, router, useNavigation, useFocusEffect } from "expo-router";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import CustomInput from "@/components/CustomInput";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useCallback } from "react";
import userFetch from "@/hooks/userFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import Constants from "expo-constants";
type InputType =
  | string
  | Number
  | NativeSyntheticEvent<TextInputChangeEventData>;
export default function SignIn() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });
  const { loading, getFetch } = userFetch();
  const [username, setUsername] = useState<InputType>("");
  const [password, setPassword] = useState<InputType>("");
  const [error, setError] = useState<InputType>("");
  const url = Constants.expoConfig?.extra?.API_URL;
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      navigation.addListener("beforeRemove", async (e) => {
        e.preventDefault();
      });
    }, [])
  );
  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const signIn = async () => {
    try {
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
        router.push({ pathname: "/(home)/(tabs)" });
      } else {
        const errors = res?.data.errors || res?.data.error;
        console.log(errors);
        Alert.alert(errors);
      }
    } catch (error) {
      console.log(error);
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
          <Text style={styles.formTitle}>Sign in</Text>
          <CustomInput
            name={"Username"}
            placeholder="Username"
            handleChange={(text: string) => {
              setUsername(text);
            }}
            //onBlur={() => handleInput("string", "username", username)}
            error=""
          />
          <CustomInput
            name={"Password"}
            placeholder="Password"
            handleChange={(text: string) => {
              setPassword(text);
            }}
            //onBlur={() => handleInput("password", "password", password)}
            error=""
          />

          <TouchableOpacity
            style={styles.button}
            onPress={
              !loading
                ? () => {
                    signIn();
                  }
                : () => {
                    console.log("tap");
                  }
            }
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
          <View>
            <Text style={{ color: "#BDBDBD" }}>Don't have an account?</Text>
            <Pressable>
              <Text
                style={{ color: "#F7F0F0", padding: 5 }}
                onPress={() => {
                  router.push({ pathname: "/(auth)/register" });
                }}
              >
                Sign up
              </Text>
            </Pressable>
          </View>
        </ScrollView>

        <StatusBar backgroundColor="#010709" />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a2821",
    flex: 1,
    paddingHorizontal: 25,
    fontFamily: "Poppins_400Regular",
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
    borderColor: "#BDBDBD",
    padding: 5,
    paddingHorizontal: 10,
    color: "#BDBDBD",
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
});
