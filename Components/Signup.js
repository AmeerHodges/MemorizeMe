import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Colors from "../assets/Colors/Colors.js";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import colors from "../assets/Colors/Colors.js";
import Login from "./Login.js";
import * as SQLite from "expo-sqlite";

//open database
const db = SQLite.openDatabase("MemorizeMe.db");

export default Signup = ({ navigation, route }) => {
  const { handleLoginApp } = route.params;
  /**intialise Database*/
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
          "username TEXT UNIQUE NOT NULL, password TEXT NOT NULL);",
        [],
        (_, result) => console.log("table users successfully created"),
        (_, error) => console.log(error)
      );
    });
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function createUser() {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users(username, password) VALUES(?, ?)",
        [username, password],
        (_, result) => handleLoginApp(),
        (_, error) => {
          if (error.message.includes("UNIQUE constraint failed")) {
            alert(
              "Username already exists. Please choose a different username."
            );
          } else if (error.message.includes("NOT NULL constraint failed")) {
            alert("Please fill in all details ");
          } else {
            // Handle other errors
            console.error("Error creating user:", error);
            alert("An error occurred while creating the user.");
          }
        }
      );
    });
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={20} style={styles.backArrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/SignUp.png")}
            style={{ width: 200, height: 200, marginTop: 20 }}
          />
        </View>
      </SafeAreaView>
      <View style={styles.formContainer}>
        <View styles={styles.form}>
          <Text style={[styles.inputLabel, { paddingTop: 15 }]}>Username</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Enter Username"
            onChangeText={setUsername}
          />
        </View>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.inputs}
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.signButton}
          onPress={() => createUser()}
        >
          <Text style={styles.signText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.redirectToLogin}>
          <Text>Already Have An Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: Colors.primary }}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  backArrow: {
    paddingLeft: 20,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 30,
    flex: 1,
  },
  form: {},
  inputLabel: {
    paddingLeft: 15,
  },
  inputs: {
    marginBottom: 15,
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: Colors.grey,
    color: Colors.textDark,
  },
  signButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 20,
  },
  signText: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.textDark,
  },
  redirectToLogin: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
});
