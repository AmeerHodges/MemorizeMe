import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Components/Home";
import Subject from "./Components/Subject";

//Dont touch this constant, its how im working on navigation
const Stack = createNativeStackNavigator();

//what loads up when the page starts
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// All CSS goes here, Same format As CSS if you know it
const styles = StyleSheet.create({});
