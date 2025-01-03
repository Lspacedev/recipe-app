import React from "react";
import { Link, router } from "expo-router";
import { Pressable, Image } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
type Props = {};

const FAB = (props: Props) => {
  return (
    <Pressable
      onPress={() => router.push("/(home)/AddRecipe")}
      style={{
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#C0D461",
        position: "absolute",
        bottom: 30,
        right: 30,
      }}
    >
      <FontAwesome6 name="add" size={24} color="black" />
    </Pressable>
  );
};
export default FAB;
