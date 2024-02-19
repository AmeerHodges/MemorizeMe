import React from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather"; //public open source icons
//import MaterialComunityIcons from "react-native-vector-icons/MaterialComunityIcons"; //public open source icons
import { colors } from "../assets/Colors/Colors";

export default Home = () => {
  {
    /** Profile Picture and  Menu Icons, use gettyimage profile picturs and 
open source icons wouldnt let me write this under the return*/
  }
  return (
    <View style={styles.contianer}>
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <Image
            source={require("../assets/images/profile.png")}
            style={styles.profileImage}
          />
          <Feather name="menu" size={24} />
        </View>
      </SafeAreaView>

      {/* Welcome Titles */}
      <View style={styles.titlesWrapper}>
        <Text style={styles.titlesMain}>Welcome!</Text>
      </View>

      {/* Info Tiles */}
      <View style={styles.infoWrapper}>
        <FlatList
          style={styles.InfoCard}
          data={infoData}
          renderItem={renderInforItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#800020",
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
    marginTop: 30,
    paddingHorizontal: 20,
  },
  titlesMain: {
    fontSize: 32,
    color: "#3a3a3a",
    fontWeight: "900",
  },
  infoWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  InfoCard: {
    width: 30,
    height: 50,
    backgroundColor: "#3A67FF",
  },
});
