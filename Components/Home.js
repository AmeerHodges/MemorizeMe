import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather"; //public open source icons
import { MaterialCommunityIcons } from "@expo/vector-icons"; //open source icons
import colors from "../assets/Colors/Colors.js";

/**Import The Data for demo*/
import infoData from "../assets/data/infoData";
import subjectData from "../assets/data/subjectsData";
import * as SQlite from "expo-sqlite";
import Subject from "../Components/Subject.js";

const db = SQlite.openDatabase("MemorizeMe.db");

export default Home = ({ navigation }) => {
  const [displaySubject, setDisplaySubject] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS subject (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, progress INTEGER NOT NULL, color TEXT, image TEXT );",
        [],
        (_, result) => console.log("table subject succesfully created"),
        (_, error) => console.log(error)
      );
    });
    /**db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO subject(title, progress, color, image) VALUES ('French', 50 , '#8ab7ff', '../images/french_flag.png');",
        [],
        (_, result) => console.log("inserted new subject"),
        (_, error) => console.log(error)
      );
    });*/
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * from subject",
        [],
        (_, result) => console.log(setDisplaySubject(result.rows._array)),
        (_, error) => console.log(error)
      );
    });
  }, []);
  // item pointer function to get data for each item in the info list
  const renderInfoItem = ({ item }) => {
    return (
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
    );
  };

  //adds a predefined subject to the subject card and live updates the app using use states

  const handleAddSubject = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO subject(title, progress, color, image) VALUES ('New Subject', '0', '#FFF' ,'../images/placeholder_subject.png'",
        [],
        (_, result) => console.log("seccessfull new Subject"),
        (_, error) => console.log(error)
      );
    }, []);
  };

  return (
    <ScrollView showsVerticalScrollIndicator="false">
      <View style={styles.contianer}>
        {/** Profile Picture and  Menu Icons, use gettyimage profile picturs and 
        open source icons wouldnt let me write this under the return*/}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <Image
              source={require("../assets/images/profile.png")}
              style={styles.profileImage}
            />
            <Feather name="menu" size={24} />
          </View>
        </SafeAreaView>

        {/* Welcome Title */}
        <View style={styles.titlesWrapper}>
          <Text style={styles.titlesHeader1}>Welcome!</Text>
        </View>
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
                onPress={() => navigation.navigate("Subject", { item: item })}
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
                      </View>
                      <View style={styles.subjectSubTextWrapper}>
                        <Text style={styles.subjectSubText}>
                          Progress: {item.progress}%
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.subjectCardRight}>
                    <Image source={item.image} style={styles.subjectImage} />
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
            <TouchableOpacity onPress={() => handleAddSubject()}>
              <View style={styles.addSubjectWrapper}>
                <Text style={styles.addSubjectText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },

  titlesWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  titlesHeader1: {
    fontSize: 32,
    color: colors.textDark,
    fontWeight: "900",
  },

  infoWrapper: {
    paddingTop: 20,
  },

  categoryListWrapper: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  categoryItemMainText: {
    textAlign: "center",
    fontSize: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    fontWeight: "bold",
  },

  categoryItemSubText: {
    flexDirection: "row",
    textAlign: "center",
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 30,
  },
  subjectWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  subjectTitle: {
    fontSize: 28,
    fontWeight: "700",
  },
  subjectCardWrapper: {
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: "row",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
  },
  subjectLeftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  subjectMainText: {
    marginLeft: 10,
    fontSize: 16,
  },
  subjectSubTextWrapper: {
    marginTop: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  subjectSubText: {
    fontSize: 14,
    color: colors.grey,
  },
  subjectCardRight: {
    alignContent: "center",
    flexDirection: "row",
    paddingBottom: -5,
    marginTop: -10,
  },
  subjectImage: {
    width: 64,
    height: 64,
    marginRight: 30,
  },
  subjectArrow: {
    alignSelf: "center",
    paddingRight: 15,
  },
  addSubjectWrapper: {
    borderColor: colors.grey,
    borderRadius: "60%",
    borderWidth: 1,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addSubjectContainer: {
    paddingHorizontal: "45%",
    marginTop: 20,
    paddingBottom: 20,
  },
});
