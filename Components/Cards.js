import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../assets/Colors/Colors.js";
import { openDatabase } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

const db = openDatabase("MemorizeMe.db");

export default Cards = ({ route }) => {
  const { item } = route.params;
  const topic_id = item.id;
  const navigation = useNavigation();
  const [isFlipped, setisFlipped] = useState(false);
  const [prompt, setprompt] = useState("No Cards Yet!");
  const [answer, setanswer] = useState(
    "Press The + in the Top Right To Add Custom Flash Cards"
  );
  const [allCards, setAllCards] = useState([]);
  const [currentCard, setcurrentCard] = useState();
  const [flipAnimation] = useState(new Animated.Value(0));
  const [modalvisible, setmodalvisible] = useState(false);
  const [addCardsModal, setAddCardsModal] = useState(false);
  const [newCardPrompt, setNewCardPrompt] = useState("");
  const [newCardAnswer, setNewCardAnswer] = useState("");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Cards (id INTEGER PRIMARY KEY AUTOINCREMENT," +
          " prompt TEXT NOT NULL, answer INTEGER NOT NULL, topic_id INTEGER NOT NULL, confidence INTEGER DEFAULT 0, FOREIGN KEY(topic_id) REFERENCES topics(id) ON DELETE CASCADE);",
        [],
        (_, result) => console.log("table Cards successfully created"),
        (_, error) => console.log(error)
      );
      /**tx.executeSql(
        "insert into Cards(prompt, answer, topic_id) Values ('Salle de classe', 'Classroom', 2)",
        (_, result) => console.log("inserted banana"),
        (_, error) => console.log(error)
      );*/
      /**tx.executeSql(
        "DELETE FROM Cards WHERE id = ?",
        [],
        (_, result) => console.log("removed banana"),
        (_, error) => console.log(error)
      );*/
      tx.executeSql(
        "SELECT * FROM Cards WHERE topic_id = ?",
        [topic_id],
        (_, result) => {
          const cards = result.rows._array;
          setAllCards(cards);
          if (cards.length > 0) {
            const initialCard = cards[0];
            setprompt(initialCard.prompt);
            setanswer(initialCard.answer);
            setcurrentCard(initialCard);
            console.log(cards);
            cards.splice(0, 1);
          }
        },
        (_, error) => console.log(error)
      );
    });
  }, []);

  const handleFlip = () => {
    setisFlipped(!isFlipped);
    animateflip();
  };

  const animateflip = () => {
    Animated.sequence([
      Animated.timing(flipAnimation, {
        toValue: 90,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(flipAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const displayNextCard = () => {
    if (allCards.length > 0) {
      let nextCard = allCards.pop();
      setcurrentCard(nextCard);
      setprompt(nextCard.prompt);
      setanswer(nextCard.answer);
      setisFlipped(false);
      console.log("Next Card Shown!");
    } else {
      setmodalvisible(true);
    }
  };
  const handleAddCard = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Cards(prompt, answer, topic_id) VALUES (?, ? ,?)",
        [newCardPrompt, newCardAnswer, topic_id],
        (_, result) => [
          alert("New Card Created"),
          setNewCardAnswer(""),
          setNewCardPrompt(""),
          setAllCards(...allCards, {
            answer: newCardAnswer,
            confidence: 0,
            newCardPrompt,
          }),
        ],
        (_, error) => alert(error)
      );
    });
  };
  const handleRating = (value) => {
    //** update confidence for that car in the database, the show the next card */
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Cards SET confidence = ? WHERE id = ?",
        [value, currentCard.id],
        (_, result) => {
          console.log(
            `Successfully updated confidence to ${value} for card with id ${currentCard.id}`
          );
          displayNextCard();
        },
        (_, error) => console.log(error)
      );
    });
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
          {/*go back*/}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="chevron-left" size={24} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.headerLeft}>
            <Text style={{ color: Colors.white, marginLeft: -10 }}>
              {item.name} Topics
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setAddCardsModal(true)}
            >
              <Feather name="plus" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <TouchableOpacity
        style={[isFlipped ? styles.back : styles.front, styles.card]}
        onPress={handleFlip}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.cardContainer,
            {
              transform: [
                {
                  rotateY: flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["0deg", "180deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={isFlipped ? styles.backText : styles.frontText}>
            {isFlipped ? answer : prompt}
          </Text>
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.centerView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalvisible}
          onRequestClose={() => setmodalvisible(!modalvisible)}
        >
          <View style={styles.centerView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                You Studied All The Cards In This Topic!
              </Text>
              <Pressable
                style={styles.hideModalButton}
                onPress={() => setmodalvisible(!modalvisible)}
              >
                <Text style={styles.hidemodaltext}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <Text style={[styles.centerText, styles.ratingText]}>Rate Yourself!</Text>
      <View style={styles.ratingContainer}>
        {ratings.map((item) => {
          return (
            <TouchableOpacity
              key={item.value}
              style={[styles.ratingCircle, { backgroundColor: item.color }]}
              onPress={() => handleRating(item.value)}
            >
              <Text style={styles.centerText}>{item.value}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={addCardsModal}
        onRequestClose={() => setAddCardsModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Card</Text>
              <Text style={styles.modalSubTitle}>Prompt</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter Prompt"
                placeholderTextColor={Colors.textDark}
                defaultValue={newCardPrompt || "New Subject"}
                onChangeText={(text) => setNewCardPrompt(text)}
                value={newCardPrompt}
              />
              <Text style={styles.modalSubTitle}>Answer</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter Answer"
                placeholderTextColor={Colors.textDark}
                defaultValue={newCardAnswer || "#000000"}
                onChangeText={(text) => setNewCardAnswer(text)}
                value={newCardAnswer}
              />
              <View style={styles.modalButtonContainer}>
                <View style={styles.modalButton}>
                  <Button
                    title="Cancel"
                    onPress={() => setAddCardsModal(false)}
                  />
                </View>
                <View style={styles.modalButton}>
                  <Button title="Add" onPress={handleAddCard} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  headerRight: { marginLeft: "50%" },
  menuButton: { paddingHorizontal: 5 },
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
    fontWeight: "400",
    marginHorizontal: 5,
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
  centerView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  hideModalButton: {
    borderRadius: 5,
    borderColor: Colors.secondary,
  },
  hidemodaltext: {
    color: Colors.textDark,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBackground: {
    backgroundColor: "white",
    borderWidth: 5,
    borderRadius: 30,
    width: "70%",
    height: "40%",
    alignItems: "center",
  },
  modalContent: {
    alignContent: "center",
    justifyContent: "center",
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.textDark,
    fontSize: 20,
    marginTop: 10,
    paddingVertical: 15,
  },
  modalInput: {
    marginBottom: 15,
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: Colors.grey,
    color: Colors.textDark,
  },
  modalButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 15,
    paddingVertical: 5,
    width: 100,
    marginTop: 30,
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 30,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
