import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../assets/Colors/Colors.js";
import { openDatabase } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

export default Settings = () => {
  return (
    <SafeAreaView>
      <Text> Settings</Text>
    </SafeAreaView>
  );
};
