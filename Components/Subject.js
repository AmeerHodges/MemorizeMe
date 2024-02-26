import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

export default Subject = ({ route }) => {
  const { item } = route.params;
  console.log({ item });

  return (
    <View style={StyleSheet.container}>
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <View style={styles.headerLeft}>
            <Text>{item.title}</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
});
