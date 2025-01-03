import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
const parseJwt = async (token) => {
  console.log({ token });
  if (token) {
    const decode = JSON.parse(atob(token.split(".")[1]));
    console.log({ decode });
    console.log(decode.exp * 1000 < new Date().getTime());
    if (decode.exp * 1000 < new Date().getTime()) {
      //localStorage.clear("token");
      await AsyncStorage.removeItem("token");
      console.log("Time Expired");
      router.push({ pathname: "/(auth)/sign-in" });
    }
  }
};

export default parseJwt;
