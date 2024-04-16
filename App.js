import React, { useEffect, useState } from "react";
import { NavigationContainer, Image } from "@react-navigation/native";
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
import { openDatabase } from "expo-sqlite";
import TestData from "./Components/TestCards";

//navigation constants
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//create database and populate with test data, if it doesnt exist
//open databse
const db = openDatabase("MemorizeMe.db");
//helper function to detemine if a table exists
const tableExists = (tableName) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Execute the SQL query to check if the table exists
      tx.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name=?;`,
        [tableName],
        (_, { rows }) => {
          // Check if the query returned any rows
          if (rows.length > 0) {
            // Table exists
            resolve(true);
          } else {
            // Table does not exist
            resolve(false);
          }
        },
        (_, error) => {
          // Error occurred while executing the query
          reject(error);
        }
      );
    });
  });
};
const dropAllTables = () => {
  console.log("Dropping Tables");
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';",
      [],
      (_, { rows }) => {
        for (let i = 0; i < rows.length; i++) {
          const tableName = rows.item(i).name;
          console.log(tableName);
          tx.executeSql(
            `DROP TABLE IF EXISTS ${tableName};`,
            [],
            (_, result) => {
              console.log(`Table '${tableName}' dropped successfully`);
            },
            (_, error) => {
              console.error(`Error dropping table '${tableName}':`, error);
            }
          );
        }
      },
      (_, error) => {
        console.error("Error fetching table names:", error);
      }
    );
  });
};

const testDB = async () => {
  console.log("Testing database...");
  try {
    // Check if users table exists, if not, create and populate
    if (!(await tableExists("users"))) {
      console.log("Creating users table...");
      await createUserTable();
    }
    // Check if subject table exists, if not, create and populate
    if (!(await tableExists("subject"))) {
      console.log("Creating subject table...");
      await createSubjectTable();
    }
    // Check if topics table exists, if not, create and populate
    if (!(await tableExists("topics"))) {
      console.log("Creating topics table...");
      await createTopicsTable();
    }
    // Check if Cards table exists, if not, create and populate
    if (!(await tableExists("Cards"))) {
      console.log("Creating Cards table...");
      await createCardsTable();
    }
    console.log("Database setup completed successfully.");
  } catch (error) {
    console.error("Error setting up database:", error);
  }
};

const createUserTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
          "username TEXT UNIQUE NOT NULL, password TEXT NOT NULL);",
        [],
        (_, result) => {
          console.log("Created Table users");
          tx.executeSql(
            "INSERT INTO users(username, password) VALUES ('TestUser', 'TestPassword')",
            [],
            (_, result) => {
              console.log("Test User Created Login : TestUser, TestPassword");
              resolve();
            },
            (_, error) => {
              console.error("Error creating test user:", error);
              reject(error);
            }
          );
        },
        (_, error) => {
          console.error("Error creating users table:", error);
          reject(error);
        }
      );
    });
  });
};

const createSubjectTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Create subject table
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS subject (id INTEGER PRIMARY KEY AUTOINCREMENT," +
          " title TEXT NOT NULL, progress INTEGER NOT NULL, color TEXT, image TEXT, User_id INTEGER NOT NULL , FOREIGN KEY(User_id) REFERENCES users(id));",
        [],
        async (_, result) => {
          console.log("Created Table subject");
          await populateSubjectTable();
          resolve();
        },
        (_, error) => {
          console.error("Error creating subject table", error);
          reject(error);
        }
      );
    });
  });
};
const populateSubjectTable = async () => {
  await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Populate subject table with test data
      tx.executeSql(
        "INSERT INTO subject(title, progress, color, image, User_id) VALUES (?, ?, ?, ?, ?);",
        ["French", 50, "#8ab7ff", "null", 1],
        (_, result) => {
          console.log("Inserted test subject");
          resolve(); // Resolve the promise when the transaction is successful
        },
        (_, error) => {
          console.error("Error inserting test subject", error);
          reject(error); // Reject the promise if there is an error
        }
      );
    });
  });
};
const createTopicsTable = async () => {
  console.log("creating topics table");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Create topics table
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS topics(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
          " name VARCHAR(30) NOT NULL, subject_id INTEGER NOT NULL, FOREIGN KEY(subject_id) REFERENCES subject(id) ON DELETE CASCADE)",
        [],
        async (_, result) => {
          console.log("Created table topics");
          await populateTopicTable();
          resolve();
        },
        (_, error) => {
          console.error("Error creating topics table", error);
          reject(error);
        }
      );
    });
  });
};
const populateTopicTable = async () => {
  await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Populate topics table with test data
      tx.executeSql(
        "INSERT INTO topics (name, subject_id) VALUES (?, ?), (?, ?), (?, ?);",
        ["Numbers", 1, "Colours", 1, "Fruits", 1],
        (_, result) => {
          console.log("Populated topics with data");
          resolve(); // Resolve the promise when the transaction is successful
        },
        (_, error) => {
          console.error("Error populating topics", error);
          reject(error); // Reject the promise if there is an error
        }
      );
    });
  });
};
const createCardsTable = async () => {
  return new Promise((resolve, reject) => {
    const values = TestData.map(
      ([prompt, answer, topic_id]) => `('${prompt}', '${answer}', ${topic_id})`
    ).join(", ");
    const sql = `INSERT INTO Cards (prompt, answer, topic_id) VALUES ${values};`;
    db.transaction((tx) => {
      // Create Cards table
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Cards (id INTEGER PRIMARY KEY AUTOINCREMENT," +
          " prompt TEXT NOT NULL, answer INTEGER NOT NULL, topic_id INTEGER NOT NULL, confidence INTEGER DEFAULT 0, FOREIGN KEY(topic_id) REFERENCES topics(id) ON DELETE CASCADE);",
        [],
        (_, result) => {
          console.log("Created Table Cards");
          // Populate Cards table with test data
          tx.executeSql(
            sql,
            [],
            (_, result) => {
              console.log("Populated test Data");
              resolve();
            },
            (_, error) => {
              console.error("Error populating Cards: ", error);
              reject(error);
            }
          );
        },
        (_, error) => {
          console.error("Error creating Cards: ", error);
          reject(error);
        }
      );
    });
  });
};

//initialise tab screens
const TabScreens = ({ navigation, route }) => {
  const { handleLogoutApp } = route.params;
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
      <Tab.Screen
        name="Settings"
        options={{ headerShown: false }}
        component={Settings}
        initialParams={{ handleLogoutApp }}
      />
    </Tab.Navigator>
  );
};

//this is what is called when the app is launched to determin the order of loading pages
export default function App() {
  const [loginStatus, setLoginStatus] = useState(null);

  //only passed as a prop to cause app to reload on login/logout
  const handleLoginApp = () => {
    setLoginStatus(true);
  };
  const handleLogoutApp = () => {
    setLoginStatus(false);
  };

  //checks login status by AsyincStorage, if userId exists, the user is logged in other wise they arent
  const checkLoginStatus = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        setLoginStatus(true);
      }
    } catch (e) {
      console.error("Error retrieving login status:" + e);
    }
  };
  useEffect(() => {
    checkLoginStatus();
    async function init() {
      await dropAllTables();
      testDB();
    }
    init();
  }, []);
  //determine what loads up when the app is loaded
  return (
    <NavigationContainer warnAboutNonSerializableValues={false}>
      {loginStatus ? (
        <Stack.Navigator initialRouteName="TabScreens">
          <Stack.Screen
            name="TabScreens"
            component={TabScreens}
            options={{ headerShown: false }}
            initialParams={{ handleLogoutApp }}
          />
          <Stack.Screen
            name="Subjects"
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
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
            initialParams={{ handleLoginApp }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
            initialParams={{ handleLoginApp }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
