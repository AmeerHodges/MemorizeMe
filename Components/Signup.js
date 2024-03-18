import React from "react";
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
import Login from "./Login.js";

export default Signup = ({ navigation }) => {
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
            source={require("../assets/images/SignUp.png")}
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
        <TouchableOpacity style={styles.signButton}>
          <Text style={styles.signText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.redirectToLogin}>
          <Text>Already Have An Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate(Login)}>
            <Text style={{ color: Colors.primary }}>Log in</Text>
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
