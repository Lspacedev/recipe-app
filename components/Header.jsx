import React from "react";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Modal,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <View style={styles.nav}>
        <Pressable
          style={styles.options}
          onPress={() => {
            setOpenMenu(true);
          }}
        >
          <SimpleLineIcons name="options-vertical" size={24} color="black" />
        </Pressable>
      </View>
      <Modal
        style={styles.menuModal}
        animationType="fade"
        transparent={true}
        visible={openMenu}
        onRequestClose={() => {
          setOpenMenu(false);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setOpenMenu(false);
          }}
        >
          <View style={{ backgroundColor: "transparent", flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.menu}>
                <Text
                  onPress={() => {
                    setOpenMenu(false);
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    textAlign: "right",
                  }}
                >
                  <EvilIcons name="close" size={24} color="black" />
                </Text>

                <Pressable
                  style={styles.menuItem}
                  onPress={() => deleteRecipe()}
                >
                  <MaterialIcons name="delete" size={24} />
                  <Text>Delete</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
export default Header;
const styles = StyleSheet.create({
  container: { flex: 1 },
  nav: {
    backgroundColor: "#2E4057",
    padding: 15,
    alignItems: "flex-end",
  },
  details: {
    flex: 1,
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
  menuModal: {
    flex: 1,

    backgroundColor: "blue",
  },
  menu: {
    position: "absolute",
    right: 0,
    width: 200,
    height: 150,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    alignItems: "center",
    padding: 5,
  },
});
