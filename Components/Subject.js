import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Subject = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.itemRight}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "cyan",
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%", // to stop text from over flowing from item
  },
  itemRight: {
    width: 12,
    height: 12,
    transform: [{ rotate: "45deg" }],
    borderRightWidth: 1,
    borderTopWidth: 1,
  },
});

export default Subject;
