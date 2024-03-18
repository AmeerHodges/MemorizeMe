import { React, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../assets/Colors/Colors.js";

export default Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.welcomeText}> Welcome To MemorizeMe</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/Welcome.png")}
            style={{ width: 350, height: 350 }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.ActionsButtons}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.ActionText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ActionsButtons}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.ActionText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "space-around",
  },
  welcomeText: {
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 50,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  ActionsButtons: {
    paddingVertical: 15,
    marginHorizontal: 30,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: Colors.secondary,
  },
  ActionText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.textDark,
  },
});
