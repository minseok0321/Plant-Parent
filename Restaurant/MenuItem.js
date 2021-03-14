//THIS COMPONENT LOADS A SINGLE MENU ITEM, CONSISTING OF A NAME, DESCRIPTION, PRICE
//DEPENDING ON THE ACCOUNT TYPE, WHICH IS PASSED IN THE PROPS, YOU WILL ALSO HAVE AN ADD TO ORDER BUTTON, CHANGE AVAILABILITY BUTTON, OR MODIFY NAME/DESCRIPTION/PRICE BUTTON
//WHEN YOU CLICK ON A MENU ITEM, A MODAL SHOULD POP UP WITH BUTTONS THAT THE CURRENT ACCOUNT TYPE SUPPORTS

import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native";

export default class MenuItem extends React.Component {
  accountType = this.props.accountType;
  username = this.props.username;
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      description: this.props.description,
      cost: this.props.cost,
      available: this.props.available,
      modalVisible: false,
    };
  }

  openItem() {
    this.setState({ modalVisible: true });
  }

  async changeAvailability() {
    console.log("hey");
    let stock = !this.state.available;
    this.setState({ available: !this.state.available });
    await fetch(
      "http://localhost:5000/menuItems/changeStock/" + this.state.name,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          available: stock,
        }),
      }
    ).then(Alert.alert("Availability updated!"));
  }

  async changeAvailability() {
    console.log("hey");
    let stock = !this.state.available;
    this.setState({ available: !this.state.available });
    await fetch(
      "https://badgerbytes.herokuapp.com/menuItems/changeStock/" +
        this.state.name,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          available: stock,
        }),
      }
    ).then(Alert.alert("Availability updated!"));
  }

  async addToOrder(item) {
    console.log(item);
    await fetch("https://badgerbytes.herokuapp.com/orders/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: this.username,
        order: item,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  render() {
    console.log("HERE Menu");
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.openItem();
          }}
          style={{
            borderColor: "lightgrey",
            borderWidth: 2,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ padding: 5, fontSize: 20 }}>{this.state.name}</Text>
            <Text
              style={{
                paddingLeft: 200,
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 5,
              }}
            >
              ${this.state.cost}
            </Text>
          </View>
          {!this.state.available && (
            <Text style={{ padding: 5, color: "#bf331b" }}>Out of Stock</Text>
          )}
        </TouchableOpacity>
        <SafeAreaView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={styles.modalView}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginRight: "10%" }}>{this.state.name}</Text>
                <Text>${this.state.cost}</Text>
              </View>
              {!this.state.available && (
                <Text style={{ color: "#bf331b" }}>Out of Stock</Text>
              )}
              <Text style={{ fontStyle: "italic" }}>
                {this.state.description}
              </Text>
              <Button
                onPress={() => this.setState({ modalVisible: false })}
                title="close"
              />
              {this.accountType == "customer" && this.state.available && (
                <TouchableOpacity
                  style={{
                    margin: 10,
                    padding: 5,
                    borderRadius: 3,
                    backgroundColor: "grey",
                  }}
                  onPress={() => {
                    this.setState({ modalVisible: false });
                    let item = {
                      name: this.state.name,
                      description: this.state.description,
                      cost: this.state.cost,
                      available: this.state.available,
                    };
                    this.addToOrder(item);
                  }}
                >
                  <Text>Add to order</Text>
                </TouchableOpacity>
              )}

              {(this.accountType == "staff" || this.accountType == "admin") && (
                <TouchableOpacity
                  style={{
                    margin: 10,
                    padding: 5,
                    borderRadius: 3,
                    backgroundColor: "grey",
                  }}
                  onPress={() => {
                    this.changeAvailability();
                  }}
                >
                  <Text>Change Availability</Text>
                </TouchableOpacity>
              )}

              {
                //Add buttons/ functionality to change name/price/description
              }
            </View>
          </Modal>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  button: {
    backgroundColor: "#5dc8e8",
    padding: 5,
    borderRadius: 5,
  },
  foodContainer: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
  },
});
