import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import Colors from "../assets/Colors/Colors.js";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import colors from "../assets/Colors/Colors.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

//open databse
const db = SQLite.openDatabase("MemorizeMe.db");

export default Login = ({ navigation }) => {
  /** intialise database*/
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
          "username TEXT UNIQUE NOT NULL, password TEXT NOT NULL);",
        /**"SELECT * FROM users;",*/
        [],
        (_, result) => console.log(result.rows._array),
        (_, error) => handelLoginError()
      );
    });
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handelLogin() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            const id = rows.item(0).id;
            AsyncStorage.setItem("userId", String(id));
            navigation.navigate("TabScreens");
          } else {
            alert("invalid Details");
          }
        },
        (_, error) => console.log(error)
      );
    });
  }
  const handelLoginError = () => {};
  return (
    <View style={styles.contianer}>
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={20} style={styles.backArrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/login.png")}
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
        <TouchableOpacity style={styles.loginButton} onPress={handelLogin}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.redirectToLogin}>
          <Text>Don't Have An Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: Colors.primary }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
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
  loginButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 20,
  },
  loginText: {
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
