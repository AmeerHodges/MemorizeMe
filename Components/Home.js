import React from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather"; //public open source icons
import { MaterialCommunityIcons } from "@expo/vector-icons"; //open source icons
import infoData from "../assets/data/infoData";
import colors from "../assets/colors/colors";

export default Home = () => {
  {
    /** Profile Picture and  Menu Icons, use gettyimage profile picturs and 
open source icons wouldnt let me write this under the return*/
  }

  const renderInfoItem = ({ item }) => {
    return (
      <View
        style={[
          styles.categoryListWrapper,
          { backgroundColor: item.selected ? colors.primary : colors.white },
          { color: item.selected ? colors.textLight : colors.textDark },
          { marginLeft: (item.id = 1) ? 30 : 0 },
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
          renderItem={renderInfoItem}
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
    color: colors.textDark,
    fontWeight: "900",
  },
  infoWrapper: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  categoryListWrapper: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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
});
