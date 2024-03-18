import React, { useEffect } from "react";
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
import SignUp from "./Signup.js";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("MemorizeMe.db");
export default Login = ({ navigation }) => {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM TABLE users"),
        [],
        (_, result) => console.log(result),
        (_, error) => console.log(error);
    });
  });
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
          <TextInput style={styles.inputs} placeholder="Enter Username" />
        </View>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.inputs}
          placeholder="Enter Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.redirectToLogin}>
          <Text>Don't Have An Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate(Signup)}>
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