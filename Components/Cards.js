import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../assets/Colors/Colors.js";
import { openDatabase } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

const db = openDatabase("MemorizeMe.db");

export default Cards = ({ route }) => {
  const { item } = route.params;
  const subject_Id = item.id;
  const navigation = useNavigation();
  const [isFlipped, setisFlipped] = useState(false);
  const Prompt = "front";
  const Answer = "back";

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Cards (id INTEGER PRIMARY KEY AUTOINCREMENT," +
          " prompt TEXT NOT NULL, answer INTEGER NOT NULL, subject_Id INTEGER NOT NULL, confidence INTEGER, FOREIGN KEY(subject_id) REFERENCES subjects(id) );",
        [],
        (_, result) => console.log("table subject successfully created"),
        (_, error) => console.log(error)
      );
    });
  }, []);

  const handleFlip = () => {
    setisFlipped(!isFlipped);
  };

  const handleRating = (value) => {
    console.log(value);
  };
  const ratings = [
    {
      value: 1,
      color: "#CF4343",
    },
    {
      value: 2,
      color: "#CF9843",
    },
    {
      value: 3,
      color: "#D6C726",
    },
    {
      value: 4,
      color: "#B0D626",
    },
    {
      value: 5,
      color: "#54D626",
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="chevron-left" size={24} color={Colors.textDark} />
          </TouchableOpacity>
          <View style={styles.headerLeft}>
            <Text>{item.title} Cards</Text>
          </View>
        </View>
      </SafeAreaView>
      <TouchableOpacity
        style={[isFlipped ? styles.back : styles.front, styles.card]}
        onPress={handleFlip}
        activeOpacity={0.8}
      >
        <View style={styles.cardContainer}>
          <Text style={isFlipped ? styles.backText : styles.frontText}>
            {isFlipped ? Answer : Prompt}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={[styles.centerText, styles.ratingText]}>Rate Yourself!</Text>
      <View style={styles.ratingContainer}>
        {ratings.map((item) => {
          return (
            <TouchableOpacity
              value={item.value}
              style={[styles.ratingCircle, { backgroundColor: item.color }]}
              onPress={() => handleRating(item.value)}
            >
              <Text style={styles.centerText}>{item.value}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity style={{ marginHorizontal: "auto" }}>
        <Text style={styles.centerText}>Click Here to Skip this card</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  headerWrapper: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  backButton: {
    marginRight: 10,
  },
  cardContainer: {
    width: "auto",
    height: 300,
    backgroundColor: Colors.white,
    marginHorizontal: 60,
    marginTop: 60,
    borderRadius: 25,
    alignContent: "center",
    justifyContent: "center",
  },
  frontText: {
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    color: Colors.textDark,
  },
  backText: {
    fontWeight: "300",
    fontSize: 16,
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 30,
  },
  ratingCircle: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 50,
    marginVertical: 30,
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  centerText: {
    textAlign: "center",
  },
  ratingText: {
    marginTop: 30,
    fontWeight: "bold",
    fontSize: 16,
  },
});
