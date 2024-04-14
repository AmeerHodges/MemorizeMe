import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather"; //public open source icons
import { MaterialCommunityIcons } from "@expo/vector-icons"; //open source icons
import colors from "../assets/Colors/Colors.js";
import useStreakTracker from "./StreakTracker.js";
import * as SQlite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../assets/Styles/homeStyles.js";

const db = SQlite.openDatabase("MemorizeMe.db");

export default Home = ({ navigation }) => {
  const [displaySubject, setDisplaySubject] = useState([]);
  const [user_id, setuser_id] = useState();
  const streak = useStreakTracker();
  const [progressCounter, setProgressCounter] = useState([]);

  const infoData = [
    {
      id: 1,
      iconName: "fire",
      iconSize: 20,
      title: "Streak",
      Data: streak,
      selected: true,
    },
    {
      id: 2,
      iconName: "percent-outline",
      iconSize: 20,
      title: "Learned",
      Data: 0,
    },
  ];
  // initialise database
  useEffect(() => {
    const intialiseDataBase = async () => {
      //set the user id after getting it from local storage
      const user_id = parseInt(await AsyncStorage.getItem("userId"));
      setuser_id(user_id);
      /**db.transaction((tx) => {
        tx.executeSql(
          "DROP TABLE subject",
          [],
          (_, result) => console.log("table subject succesfully dropped"),
          (_, error) => console.log(error)
        );
      });*/
      db.transaction((tx) => {
        //create table if not exists
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS subject (id INTEGER PRIMARY KEY AUTOINCREMENT," +
            " title TEXT NOT NULL, progress INTEGER NOT NULL, color TEXT, image TEXT ,cardsStudied INT DEFAULT 0, User_id INTEGER NOT NULL , FOREIGN KEY(User_id) REFERENCES users(id));",
          [],
          (_, result) => console.log("table subject succesfully created"),
          (_, error) => console.log(error)
        );
      });
      /**db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO subject(title, progress, color, image,User_id) VALUES ('French', 50 , '#8ab7ff', ?, ?);",
          [
            Image.resolveAssetSource(
              require("../assets/images/french_flag.png")
            ).uri,
            user_id,
          ],
          (_, result) => console.log("inserted new subject"),
          (_, error) => console.log(error)
        );
      });8*/
      console.log(user_id);
      //Select and display subjects
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * from subject where User_id = ?",
          [user_id],
          (_, result) => {
            console.log(result.rows._array);
            setDisplaySubject(result.rows._array);
          },
          (_, error) => console.log(error)
        );
        tx.executeSql(
          "SELECT subject_id, topic_id, ROUND(100 * SUM(confidence) / (5 * COUNT(*))) AS Progress FROM Cards JOIN topics ON topics.id = topic_id GROUP BY subject_id",
          [],
          (_, result) => {
            setProgressCounter(result.rows._array),
              console.log(result.rows._array);
          },
          (_, error) => console.log(error)
        );
      });
    };
    intialiseDataBase();
  }, []);

  const getProgress = (SubjectId) => {
    const progressTracker = progressCounter.find(
      (count) => count.subject_id === SubjectId
    );
    return progressTracker ? progressTracker.Progress : 0;
  };
  // item pointer function to get data for each item in the info list
  const renderInfoItem = ({ item }) => {
    return (
      <View>
        <View
          style={[
            styles.categoryListWrapper,
            {
              backgroundColor: item.selected ? colors.primary : colors.white,
              color: item.selected ? colors.textLight : colors.textDark,
              marginLeft: item.id == 1 ? 30 : 0,
            },
          ]}
        >
          <Text style={styles.categoryItemMainText}>
            {" "}
            {item.Data}{" "}
            <MaterialCommunityIcons name={item.iconName} size={item.iconSize} />
          </Text>
          <Text style={styles.categoryItemSubText}>{item.title}</Text>
        </View>
      </View>
    );
  };
  const isValidHex = (Hex) => {
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return regex.test(Hex);
  };
  //adds a subject to databse and updates app
  const [modalVisible, setModalVisible] = useState(false);
  const [newSubjectTitle, setNewSubjectTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const handleAddSubject = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO subject(title, progress, color, image, User_id) VALUES (?, ?, ? ,?, ?);",
        [
          newSubjectTitle === "" ? "New Subject" : newSubjectTitle,
          "0",
          selectedColor === "" && isValidHex(selectedColor)
            ? "#000000"
            : selectedColor,
          Image.resolveAssetSource(
            require("../assets/images/placeholder_subject.png")
          ).uri,
          user_id,
        ],
        (_, result) => {
          console.log("Successfully added new subject");
          // Refresh subjects after adding
          refreshSubjects();
        },
        (_, error) => console.log(error)
      );
    });
    // Close the modal
    setModalVisible(false);
  };

  // Function to refresh subjects
  const refreshSubjects = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * from subject where User_id = ?",
        [user_id],
        (_, result) => {
          console.log(result.rows._array);
          setDisplaySubject(result.rows._array);
        },
        (_, error) => console.log(error)
      );
    });
  };
  const handleDeleteSubject = (item) => {
    // Show confirmation alert
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => Delete(item),
        },
      ]
    );
  };
  const Delete = (itemId) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM subject WHERE id = ?",
        [itemId],
        (_, result) => {
          setDisplaySubject((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
          );
          console.log("GONE " + itemId);
        },
        (_, error) => console.log(error)
      );
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator="false">
      {/** Profile Picture and  Menu Icons*/}
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <Image
            source={require("../assets/images/profile.png")}
            style={styles.profileImage}
          />
          <View style={styles.titlesWrapper}>
            <Text style={styles.titlesHeader1}>Welcome Back!</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Info Tiles */}
      <View style={styles.infoWrapper}>
        <FlatList
          style={styles.InfoCard}
          data={infoData}
          renderItem={renderInfoItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        ></FlatList>
      </View>

      {/** Subject Cards */}
      <View style={styles.subjectWrapper}>
        <Text style={styles.subjectTitle}>Subjects</Text>
        {/**for each item in displaySubjects, return a new card*/}
        {displaySubject.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate("Topics", { item: item })}
            >
              <View
                style={[
                  styles.subjectCardWrapper,
                  {
                    marginTop: item.id == 1 ? 10 : 20,
                    borderColor: item.color,
                  },
                ]}
              >
                <View>
                  <View>
                    <View style={styles.subjectLeftWrapper}>
                      <Text style={styles.subjectMainText}>{item.title}</Text>
                      <TouchableOpacity
                        onPress={() => handleDeleteSubject(item.id)}
                        style={{
                          width: 30,
                          height: 20,
                          marginHorizontal: 10,
                          paddingTop: 3,
                        }}
                      >
                        <Feather name="trash-2" size={12} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.subjectSubTextWrapper}>
                      <Text style={styles.subjectSubText}>
                        Progress: {getProgress(item.id)}%
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.subjectCardRight}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.subjectImage}
                  />
                  <Feather
                    name="arrow-right"
                    size={16}
                    style={[styles.subjectArrow, { marginTop: -10 }]}
                    color={colors.textLight}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={styles.addSubjectContainer}>
          {/* Button to open the modal */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.addSubjectWrapper}>
              <Text style={styles.addSubjectText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* Modal for adding new subject */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Subject</Text>
              <Text style={styles.modalSubTitle}>Title</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Subject Title"
                placeholderTextColor={colors.textDark}
                defaultValue={newSubjectTitle || "New Subject"}
                onChangeText={(text) => setNewSubjectTitle(text)}
                value={newSubjectTitle}
              />
              <Text style={styles.modalSubTitle}>Color</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Color (Hexcode)"
                placeholderTextColor={colors.textDark}
                defaultValue={selectedColor || "#000000"}
                onChangeText={(text) => setSelectedColor(text)}
                value={selectedColor}
              />
              <View style={styles.modalButtonContainer}>
                <View style={styles.modalButton}>
                  <Button
                    title="Cancel"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
                <View style={styles.modalButton}>
                  <Button title="Add" onPress={handleAddSubject} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
