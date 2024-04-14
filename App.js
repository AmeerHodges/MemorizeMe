import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Components/Home";
import Subject from "./Components/Subject";
import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Cards from "./Components/Cards";
import Settings from "./Components/Settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import Topics from "./Components/Topics";

//Dont touch this constant, its how im working on navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const handleLogout = async () => {
  try {
    await AsyncStorage.clear();
    setLoginStatus(false);
    console.log("logout worked");
    navigation.navigate("Welcome");
  } catch (e) {
    console.log(e);
  }
};
const TabScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        title: "",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
            color = focused ? "#679787" : "#c4c4c4";
          } else if (route.name === "Settings") {
            iconName = "settings";
            color = focused ? "#679787" : "#c4c4c4";
          }
          return (
            <Feather
              name={iconName}
              color={color}
              size={size}
              style={{ paddingTop: 10 }}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Settings" options={{ headerShown: false }}>
        {() => <Settings handleLogout={handleLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
//what loads up when the page starts
export default function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    //AsyncStorage.removeItem("userId");
    //console.log("clears");
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        setLoginStatus(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loginStatus ? (
          <>
            <Stack.Screen
              name="TabScreens"
              component={TabScreens}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Subject"
              component={Subject}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Topics"
              component={Topics}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cards"
              component={Cards}
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
