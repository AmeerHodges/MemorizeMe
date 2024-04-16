import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../assets/Colors/Colors.js";
import { openDatabase } from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

const db = openDatabase("MemorizeMe.db");
export default Settings = ({ navigation, route }) => {
  const { handleLogoutApp } = route.params;
  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      // Clear AsyncStorage
      await AsyncStorage.clear();
      handleLogoutApp();
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };
  const handleDeleteAccount = () => {
    Alert.alert(
      "Are you sure?",
      "This cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "I'm sure", onPress: () => deleteUserAccount() },
      ],
      { cancelable: false }
    );
  };
  const deleteUserAccount = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM users WHERE id = ?"),
        [AsyncStorage.getItem("userId")],
        (_, result) => {
          alert("Account Deleted"), handleLogout();
        },
        (_, error) => console.error("error deleting account: ", error);
    });
  };
  /**const handleDeleteSubject = () => {
    Alert.alert(
      "Are you sure?",
      "This cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "I'm sure", onPress: () => deleteSubjects() },
      ],
      { cancelable: false }
    );
  };
  const deleteSubjects = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM subject WHERE User_id = ?"),
        [AsyncStorage.getItem("userId")],
        (_, result) => {
          alert("Account Deleted"), handleLogout();
        },
        (_, error) => console.error("error deleting account: ", error);
    });
  };*/
  const options = [
    {
      name: "logout",
      doFunc: handleLogout,
    },
    {
      name: "Delete Account",
      doFunc: handleDeleteAccount,
    },
    /**{
      name: "Delete Subjects",
      doFunc: handleDeleteSubject,
    },*/
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
                  onPress={() => item.doFunc()}
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
