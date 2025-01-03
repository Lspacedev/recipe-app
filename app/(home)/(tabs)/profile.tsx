import {
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userFetch from "@/hooks/userFetch";
import parseJWT from "@/utils/checkToken";
import EvilIcons from "@expo/vector-icons/EvilIcons";

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
  const { loading, getFetch } = userFetch();

  const [user, setUser] = useState<UserType>();

  const [edit, setEdit] = useState(false);

  const [username, setUsername] = useState<InputType>("");
  const [email, setEmail] = useState<InputType>("");

  const [password, setPassword] = useState<InputType>("");
  const [error, setError] = useState<InputType>("");
  const url = `${process.env.EXPO_PUBLIC_API_URL}`;

  useFocusEffect(
    useCallback(() => {
      getUser();
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

  const getUser = async () => {
    try {
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
        setUsername(res?.data.username);
        setEmail(res?.data.email);
      } else {
        //const errors = res?.data.errors;
        console.log(res?.data);
        // Alert.alert(errors.join(","));
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  const updateProfile = async () => {
    try {
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
        getUser();
        setEdit(false);
        //setUser(res?.data);
      } else {
        //const errors = res?.data.errors;
        console.log(res?.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="always"
    >
      {edit && (
        <TouchableOpacity style={[styles.close]} onPress={() => setEdit(false)}>
          <EvilIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      )}
      {user !== null && !edit && user && (
        <Image
          source={require("@/assets/images/profile.png")}
          resizeMode="cover"
          style={{
            flexDirection: "row",
            width: 150,
            height: 150,
            marginHorizontal: "auto",
            marginVertical: 15,
            borderRadius: 75,
          }}
        />
      )}
      {user !== null &&
        (!edit ? (
          user && <Text style={styles.text}>{user.username}</Text>
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={"#717171"}
            onChangeText={(text) => setUsername(text)}
            value={username as string}
          />
        ))}
      {user !== null &&
        (!edit ? (
          user && <Text style={styles.text}> {user.email}</Text>
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"#717171"}
            onChangeText={(text) => setEmail(text)}
            value={email as string}
          />
        ))}
      {user !== null &&
        (!edit ? (
          user && <Text style={styles.text}>******</Text>
        ) : (
          <TextInput
            style={styles.input}
            placeholder="New password"
            placeholderTextColor={"#717171"}
            onChangeText={(text) => setPassword(text)}
          />
        ))}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity
          style={styles.btn}
          onPress={!edit ? () => setEdit(true) : () => updateProfile()}
        >
          {!edit ? (
            <Text style={styles.btnText}>Edit</Text>
          ) : (
            <Text style={styles.btnText}>Update</Text>
          )}
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  close: {
    padding: 15,
    alignItems: "flex-end",
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
    padding: 10,
    borderRadius: 25,
    width: "100%",
    marginVertical: 15,
  },
  btnText: {
    textAlign: "center",
  },
  input: {
    borderRadius: 5,
    borderColor: "#BDBDBD",
    padding: 5,
    marginVertical: 15,
    paddingHorizontal: 10,
    color: "#BDBDBD",
    borderWidth: 0.8,
    width: "100%",
  },
});
