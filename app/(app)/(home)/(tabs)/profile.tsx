import {
  Text,
  TextInput,
  View,
  Pressable,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { Href, router } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import userFetch from "@/hooks/userFetch";
import parseJWT from "@/utils/checkToken";
import Constants from "expo-constants";

type InputType =
  | string
  | Number
  | NativeSyntheticEvent<TextInputChangeEventData>;
type UserType = {
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
};

export default function Profile() {
  const { getFetch } = userFetch();

  const [user, setUser] = useState<UserType>();

  const [edit, setEdit] = useState(false);

  const [username, setUsername] = useState<InputType>("");
  const [email, setEmail] = useState<InputType>("");

  const [password, setPassword] = useState<InputType>("");
  const [error, setError] = useState<InputType>("");
  const url = process.env.EXPO_PUBLIC_API_URL ?? "";

  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const jsonValue = await getData("token");
    parseJWT(jsonValue);
    const res = await getFetch(`${url}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jsonValue}`,
      },
    });
    if (res?.status) {
      setUser(res?.data);
    } else {
      //const errors = res?.data.errors;
      console.log(res?.data);
      // Alert.alert(errors.join(","));
    }
  };
  const updateProfile = async () => {
    const jsonValue = await getData("token");
    parseJWT(jsonValue);

    const res = await getFetch(`${url}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jsonValue}`,
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (res?.status) {
      console.log(res);
      setEdit(false);
      //setUser(res?.data);
    } else {
      //const errors = res?.data.errors;
      console.log(res?.data);
      // Alert.alert(errors.join(","));
    }
  };

  return (
    <View style={[styles.container]}>
      {edit && (
        <Text style={[styles.text, ,]} onPress={() => setEdit(false)}>
          x
        </Text>
      )}
      {user !== null &&
        (!edit ? (
          user && <Text style={styles.text}>Username: {user.username}</Text>
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={"#717171"}
            onChangeText={(text) => setUsername(text)}
          />
        ))}
      {user !== null &&
        (!edit ? (
          user && <Text style={styles.text}>Email: {user.email}</Text>
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"#717171"}
            onChangeText={(text) => setEmail(text)}
          />
        ))}
      {user !== null &&
        (!edit ? (
          user && <Text style={styles.text}>Password: {user.password}</Text>
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"#717171"}
            onChangeText={(text) => setPassword(text)}
          />
        ))}
      <Pressable
        style={styles.btn}
        onPress={!edit ? () => setEdit(true) : () => updateProfile()}
      >
        {!edit ? (
          <Text style={styles.btnText}>Edit</Text>
        ) : (
          <Text style={styles.btnText}>Update</Text>
        )}
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  text: {
    textAlign: "center",
    textTransform: "uppercase",
    padding: 15,
    color: "grey",
  },
  btn: {
    backgroundColor: "#F7F0F0",
    textAlign: "center",
    marginHorizontal: 80,
    padding: 10,
    borderRadius: 25,
  },
  btnText: {
    textAlign: "center",
  },
  input: {
    borderRadius: 5,
    borderColor: "#BDBDBD",
    padding: 5,
    margin: 15,
    paddingHorizontal: 10,
    color: "#BDBDBD",
    borderWidth: 0.8,
  },
});
