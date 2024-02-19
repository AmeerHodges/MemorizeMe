import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather"; //public open source icons
import { MaterialCommunityIcons } from "@expo/vector-icons"; //open source icons
import colors from "../assets/colors/colors";
import infoData from "../assets/data/infoData";
import subjectData from "../assets/data/subjectsData";

export default Home = () => {
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
  // pointer function to get data for subject items INVALID
  /**const renderSubjectItem = ({ item }) => {
    return (
      <View style={styles.subjectListWrapper}>
        <Image source={item.image} />
        <Text>{item.name}</Text>
        <Text>{item.Learned}</Text>
      </View>
    );
  };*/
  return (
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

      {/* Welcome Titles */}
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
        ></FlatList>
      </View>

      {/* Subject Titles */}
      <View style={styles.titlesWrapper}>
        <Text style={styles.titlesHeader2}>Subjects</Text>
      </View>

      {/** Subject Cards */}

      <View style={styles.subjectWrapper}>
        {subjectData.map((item) => (
          <View
            style={[
              styles.subjectCardWrapper,
              { marginTop: item.id == 1 ? 10 : 20 },
            ]}
          >
            <Image source={item.image} style={styles.subjectCardImage} />
            <Text style={styles.subjectCardMainText}>{item.title}</Text>
            <Text style={styles.subjectCardSubText}>
              Percentage Learned: {item.Learned}
            </Text>
            <Feather
              name="arrow-right"
              size={16}
              stye={styles.subjectCardRight}
            />
          </View>
        ))}
        <View style={styles.addSubjectContainer}>
          <TouchableOpacity>
            <View style={styles.addSubjectWrapper}>
              <Text style={styles.addSubjectText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    marginTop: 20,
    paddingHorizontal: 20,
  },

  titlesHeader1: {
    fontSize: 32,
    color: colors.textDark,
    fontWeight: "900",
  },

  titlesHeader2: {
    fontSize: 28,
    color: colors.textDark,
    fontWeight: "800",
  },

  infoWrapper: {
    paddingTop: 20,
  },

  categoryListWrapper: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
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
  },
  subjectCardWrapper: {
    fontSize: 12,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  subjectCardImage: {
    height: 64,
    width: 64,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  subjectCardMainText: { paddingVertical: 20 },
  subjectCardSubText: { paddingTop: 10 },
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
  },
});
