import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../assets/Colors/Colors.js";
import { openDatabase } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

const db = openDatabase("MemorizeMe.db");

export default Topics = ({ route }) => {
  const { item } = route.params;
  const subjectColor = item.color;
  const subject_Id = item.id;
  const navigation = useNavigation();
  const [topics, setTopics] = useState([]);
  const [counter, setCounter] = useState([]);
  const [progressCounter, setProgressCounter] = useState([]);

  const getFlashcardCount = (topicId) => {
    const topicCounter = counter.find((count) => count.topic_id === topicId);
    return topicCounter ? topicCounter.CardCount : 0;
  };
  const getProgress = (topicId) => {
    const progressTracker = progressCounter.find(
      (count) => count.topic_id === topicId
    );
    return progressTracker ? progressTracker.Progress : 0;
  };

  const [newId, setNewId] = useState(0);
  const handleAddTopic = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO topics(name, subject_id) VALUES (? , ?);",
        ["New Topic", subject_Id],
        (_, result) => {
          tx.executeSql(
            "SELECT id FROM topics WHERE name = ? AND subject_id = ?;",
            ["New Topic", subject_Id],
            (_, result) => {
              const newId = result.rows._array.pop().id;
              console.log("New topic ID:", newId);
              setNewId(newId); // Update newId state
              setTopics((prevTopics) => [
                ...prevTopics,
                {
                  id: newId,
                  name: "New Topic",
                  progress: "0",
                },
              ]);
            },
            (_, error) => console.log("Error fetching new topic ID:" + error)
          );
        },
        (_, error) => console.log("Error inserting new topic:" + error)
      );
    });
  };

  const handleDeleteTopic = (item) => {
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
        "DELETE FROM topics WHERE id = ?",
        [itemId],
        (_, result) => {
          setTopics((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
          );
          console.log("GONE " + itemId);
        },
        (_, error) => console.log(error)
      );
    });
  };
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS topics(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
          " name VARCHAR(30) NOT NULL, subject_id INTEGER NOT NULL, FOREIGN KEY(subject_id) REFERENCES subject(id) ON DELETE CASCADE)",
        [],
        (_, result) => console.log("topics table created"),
        (_, error) => console.log("topics: " + error)
      );
      tx.executeSql(
        "SELECT topic_id, COUNT(*) AS CardCount FROM Cards GROUP BY topic_id",
        [],
        (_, result) => {
          setCounter(result.rows._array);
          console.log(result.rows._array);
        },
        (_, error) => console.log(error)
      );
      tx.executeSql(
        "SELECT topic_id, ROUND(100 * SUM(confidence) / (5 * COUNT(*))) AS Progress FROM Cards GROUP BY topic_id",
        [],
        (_, result) => {
          setProgressCounter(result.rows._array);
          console.log(result.rows._array);
        },
        (_, error) => console.log(error)
      );
      tx.executeSql(
        "SELECT * FROM topics WHERE subject_id = ?",
        [subject_Id],
        (_, result) => {
          console.log(result.rows._array), setTopics(result.rows._array);
        },
        (_, error) => console.log(error)
      );
    });
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            backgroundColor:
              subjectColor == "#000" ? Colors.grey : subjectColor,
          },
        ]}
      >
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Feather name="chevron-left" size={24} color={Colors.textDark} />
            </TouchableOpacity>
            <View style={styles.headerLeft}>
              <Text>Subjects</Text>
            </View>
          </View>
          <View style={styles.headerContainer}>
            <Image source={{ uri: item.image }} style={styles.subjectImage} />
            <Text style={styles.headerTitle}>{item.title}</Text>
          </View>
        </SafeAreaView>
      </View>
      <View style={styles.topicWrapper}>
        {topics.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => [
                console.log({ item: item }),
                navigation.navigate("Cards", { item: item }),
              ]}
              onLongPress={() => handleDeleteTopic({ item: item })}
            >
              <View
                style={[
                  styles.topicCardWrapper,
                  {
                    marginTop: item.id == 1 ? 10 : 20,
                    borderColor: item.color,
                  },
                ]}
              >
                <View>
                  <View>
                    <View style={styles.topicLeftWrapper}>
                      <Text style={styles.topicMainText}>{item.name}</Text>
                      <TouchableOpacity
                        onPress={() => handleDeleteTopic(item.id)}
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
                    <View style={styles.topicSubTextWrapper}>
                      <Text style={styles.topicSubText}>
                        Progress: {getProgress(item.id)}%
                      </Text>
                      <Text style={styles.topicSubText}>
                        Flashcards:
                        {getFlashcardCount(item.id)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Feather
                    name="arrow-right"
                    size={16}
                    style={[styles.topicArrow]}
                    color={Colors.textLight}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.addTopicContainer}>
        <TouchableOpacity onPress={() => handleAddTopic()}>
          <View style={styles.addTopicWrapper}>
            <Text style={styles.addSubjectText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 215,
    shadowOffset: 5,
    shadowOpacity: 0.25,
  },
  headerTitle: {
    paddingTop: 40,
    fontSize: 32,
    fontWeight: "400",
    color: Colors.textDark,
  },
  headerWrapper: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  topicWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topicTitle: {
    fontSize: 28,
    fontWeight: "700",
  },
  topicCardWrapper: {
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: "row",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
  },
  topicLeftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  topicMainText: {
    marginLeft: 10,
    fontSize: 16,
  },
  topicSubTextWrapper: {
    marginTop: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  topicSubText: {
    fontSize: 14,
    color: Colors.grey,
  },
  topicCardRight: {
    alignContent: "center",
    flexDirection: "row",
    paddingBottom: -5,
    marginTop: -10,
  },
  topicImage: {
    width: 64,
    height: 64,
    marginRight: 30,
  },
  topicArrow: {
    alignSelf: "center",
    paddingRight: 15,
    marginTop: 20,
  },
  addTopicWrapper: {
    borderColor: Colors.grey,
    borderRadius: "60%",
    borderWidth: 1,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addTopicContainer: {
    paddingHorizontal: "45%",
    marginTop: 20,
    paddingBottom: 20,
  },
  subjectImage: {
    width: 84,
    aspectRatio: 1,
    marginRight: 30,
  },
  addTopicWrapper: {
    borderColor: Colors.grey,
    borderRadius: "60%",
    borderWidth: 1,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addTopicContainer: {
    paddingHorizontal: "45%",
    marginTop: 20,
    paddingBottom: 20,
  },
});
