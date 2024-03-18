import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Components/Home";
import Subject from "./Components/Subject";
import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

import * as SQlite from "expo-sqlite";

//Dont touch this constant, its how im working on navigation
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const loginStatus = false;

//what loads up when the page starts
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loginStatus ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Subject"
              component={Subject}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Subject"
              component={Subject}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// All CSS goes here, Same format As CSS if you know it
const styles = StyleSheet.create({});
