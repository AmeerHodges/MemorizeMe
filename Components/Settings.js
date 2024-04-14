import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../assets/Colors/Colors.js";
import { openDatabase } from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Settings = ({ navigation, handleLogout }) => {
  const handelLogoutPress = () => {
    handleLogout;
  };
  const handleDeleteAccount = () => {
    console.log("handle Account Delete");
  };
  const handleDeleteSubject = () => {
    console.log("handle Subject Delete");
  };
  const options = [
    {
      name: "profile",
      onPress: console.log("hello, this doesnt exist"),
    },
    {
      name: "logout",
      onPress: handelLogoutPress,
    },
    {
      name: "Delete Account",
      onPress: handleDeleteAccount,
    },
    {
      name: "Delete Subjects",
      onPress: handleDeleteSubject,
    },
  ];
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text> Settings</Text>
      </SafeAreaView>
      <ScrollView>
        {options.map((item) => {
          return (
            <View style={styles.container} key={item.name}>
              <View>
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => item.onPress()}
                >
                  <Text> {item.name} </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  optionItem: {
    flexDirection: "column",
    paddingVertical: 10,
    marginVertical: 10,
  },
});
