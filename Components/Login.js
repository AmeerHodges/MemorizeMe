import { React, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";

export default Login = () => {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL);",
        [],
        (_, result) => console.log("table user succesfully created"),
        (_, error) => console.log(error)
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * from user",
        [],
        (_, result) => console.log(result.rows._array),
        (_, error) => console.log(error)
      );
    });
    /**db.transaction((tx) => {
          tx.executeSql(
            "INSERT INTO user(username, password) VALUES ('test', 'testPassword');",
            [],
            (_, result) => console.log("inserted test user"),
            (_, error) => console.log(error)
          );
        });*/
  }, []);
  return (
    <View>
      <Text> Login </Text>
    </View>
  );
};
