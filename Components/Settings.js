import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../assets/Colors/Colors.js";
import { openDatabase } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

export default Settings = () => {
  const handleLogout = () => {
    console.log("handle logout");
  };
  const handleDeleteAccount = () => {
    console.log("handle Account Delete");
  };
  const handleDeleteSubject = () => {
    console.log("handle Subject Delete");
  };
  const options = [
    {
      name: "logout",
      onPress: handleLogout(),
    },
    {
      name: "Delete Account",
      onPress: handleDeleteAccount(),
    },
    {
      name: "Delete Subjects",
      onPress: handleDeleteSubject(),
    },
  ];
  return (
    <SafeAreaView>
      <Text> Settings</Text>
      {options.map((item) => {
        return (
          <View>
            <TouchableOpacity onPress={item.onPress}>
              <Text> {item.name} </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </SafeAreaView>
  );
};
