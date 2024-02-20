import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default Subject = ({ route }) => {
  const { item } = route.params;
  console.log({ item });

  /**return(
     <View style={StyleSheet.container}>
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <View style={styles.headerLeft}>
          </View>
          </View>
      </SafeAreaView>
  </View>;
 )};*/

  const styles = new StyleSheet.create({
    container: {
      flex: 1,
    },
  });
};
