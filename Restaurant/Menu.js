//THIS COMPONENT LOADS A SCROLLABLE VIEW OF THE MENU
//YOU MUST PASS THE ACCOUNT TYPE TO EACH MENU ITEM COMPONENT, ALONG WITH ITS NAME, DESCRIPTION, PRICE, AND AVAILABILITY

import React from "react";
import MenuItem from "./MenuItem";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Touchable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { Card } from "react-native-elements";
import { Ionicons, Entypo } from "@expo/vector-icons";

export default class Menu extends React.Component {
  accountType = this.props.route.params.accountType;
  username = this.props.route.params.username;

  constructor(props) {
    super(props);
    this.state = {
      menu: []
    }
  }

  async componentDidMount() {
    await fetch('https://badgerbytes.herokuapp.com/menuItems/', {
      method:'GET'
    }).then(res=> res.json()).then(res=>this.setState({menu:res}))
  }

  showMenu() {
    let menuItemComps = [];
    for(let menuItem of this.state.menu) {
      menuItemComps.push(
        <MenuItem accountType={this.accountType} 
                  username={this.username}
                  name={menuItem.name}
                  cost={menuItem.cost}
                  description={menuItem.description}
                  available={menuItem.available}
        />        
      )
    }
    return menuItemComps;
  }

  render() {
    return (
      <View style = {styles.container}>
        {this.showMenu()}
      </View>

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
});
