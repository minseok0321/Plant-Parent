import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";

export default class ManagerActions extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Badger Bytes Manager</Text>
        <Text style={styles.subText}>
          Please select one of the buttons below
        </Text>
        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.categoryButton} onPress={() => {}}>
            <View style={styles.categoryIcon}>
              <Ionicons name="ios-restaurant" size={35} color="#FF5C4D" />
            </View>
            <Text style={styles.categoryButtonTxt}> View Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryButton} onPress={() => {}}>
            <View style={styles.categoryIcon}>
            <Ionicons
                name="print-outline"
                size={35}
                color="#FF5C4D"
              />
            </View>
            <Text style={styles.categoryButtonTxt}> Print Order</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleText: {
    textAlign: "center",
    fontFamily: "Helvetica",
    fontSize: 40,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    color: "black",
    paddingBottom: 20,
  },
  subText: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 40,
  },
  categoryContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    backgroundColor: "black",
    borderRadius: 50,
  },
  categoryButton: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  categoryButtonTxt: {
    alignSelf: "center",
    marginTop: 5,
    color: "black",
  },
});
