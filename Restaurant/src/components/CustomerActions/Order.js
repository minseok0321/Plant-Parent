import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Card } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";
import Payment from "./Payment";

export default class OrderActions extends Component {
  accountType = this.props.route.params.accountType;
  username = this.props.route.params.username;
  pickUpTimes = [];

  constructor(props) {
    super(props);
    this.state = {
      order: [],
      totalCost: 0,
      pickUpTime: undefined,
    };
  }

  async getOrder() {
    await fetch(
      "http://badgerbytes.herokuapp.com/orders/viewOrder/" + this.username,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res.orderPurchased) this.setState({ order: res.itemsOrdered });
      });
  }

  async componentDidMount() {
    await fetch(
      "http://badgerbytes.herokuapp.com/orders/viewOrder/" + this.username,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.orderPurchased);
        if (!res.orderPurchased) {
          this.setState({ order: res.itemsOrdered });
        }
        let sum = 0;
        for (let item of res.itemsOrdered) {
          sum += item.cost;
        }
        this.setState({ totalCost: sum });
        let timeNowHours = new Date().getHours();
        let timeNowMins = new Date().getMinutes() + 15;
        for (let i = 0; i < 5; i++) {
          console.log("Doing this");
          if (timeNowMins >= 60) {
            timeNowHours++;
            timeNowMins = timeNowMins - 60;
          }
          this.pickUpTimes.push({ hours: timeNowHours, mins: timeNowMins });
          timeNowMins += 15;
        }
        this.setState({ pickUpTime: this.pickUpTimes[0] });
      });
  }

  async deleteItem(item) {
    await fetch("https://badgerbytes.herokuapp.com/orders/deleteItem", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: this.username,
        order: item,
      }),
    }).then(async (res) => {
      this.getOrder();
    });
  }

  async purchaseOrder() {
    await fetch("http://badgerbytes.herokuapp.com/orders/purchaseOrder", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: this.username,
      }),
    });
    let pickuptimeString =
      this.state.pickUpTime.hours +
      ":" +
      (this.state.pickUpTime.mins < 10
        ? "0" + this.state.pickUpTime.mins
        : this.state.pickUpTime.mins);
    console.log(pickuptimeString);
    await fetch("http://badgerbytes.herokuapp.com/orders/addPickUpTime", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.username,
        pickUpTime: pickuptimeString,
      }),
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>View Order</Text>

          {this.state.order.length > 0 && (
            <Card>
              <Card.Title>Here's what you've ordered</Card.Title>
              <Card.Divider />
              {this.state.order.map((item) => {
                return (
                  <View
                    key={item.name}
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>
                      {item.name} : ${item.cost}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.deleteItem(item);
                      }}
                    >
                      <View style={{ paddingLeft: 20 }}>
                        <Ionicons name="trash" size={24} color="#bf331b" />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </Card>
          )}
          {this.state.order.length == 0 && (
            <Card>
              <Card.Title>Here's what you've ordered</Card.Title>
              <Card.Divider />
              {<Text>You haven't ordered anything yet!</Text>}
            </Card>
          )}

          {this.state.order.length > 0 && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              <Text>Total Cost: ${this.state.totalCost}</Text>
              

              <Payment username={this.username}></Payment>
              <TouchableOpacity
                style={{
                  backgroundColor: "grey",
                  borderRadius: 3,
                  padding: 5,
                  margin: 5,
                }}
                onPress={() => {
                  this.purchaseOrder();
                  this.props.navigation.navigate("PrintBill");
                }}
              >
                <Text>Place Order</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
});
