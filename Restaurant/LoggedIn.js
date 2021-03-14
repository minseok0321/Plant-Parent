import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import CustomerActions from './src/components/CustomerActions/CustomerActions'
import AdminActions from './src/components/AdminActions/AdminActions'
import ManagerActions from './src/components/ManagerActions/ManagerActions'
import "react-native-gesture-handler";
import {
  StyleSheet,
  Navigation,
  Text,
  View,
  Button,
  Form,
  TextInput,
} from "react-native";
import Menu from "./Menu";
import { NavigationContainer } from "@react-navigation/native";
import OrderActions from "./src/components/CustomerActions/Order"
import PrintBill from "./src/components/CustomerActions/PrintBill"

//test
import 'react-native-gesture-handler';



function CustomerActionScreen({ navigation }) {
  return <CustomerActions navigation={navigation} />;
}

function AdminActionScreen({ navigation }) {
  return <AdminActions navigation={navigation} />;
}

function ManagerActionScreen({ navigation }) {
  return <ManagerActions navigation={navigation} />;
}

const Stack = createStackNavigator();

export default class LoggedIn extends React.Component {
    username = this.props.route.params.username;
    accountType = this.props.route.params.accountType;

    constructor(props) {
        super(props);
    }
    
    render(){
      if (this.accountType.toLowerCase() == "customer") {
        return (
          <Stack.Navigator>
          <Stack.Screen name="CustomerActions" initialParams={{ username: this.username, accountType: this.accountType }} component={CustomerActionScreen} />
          <Stack.Screen name="MenuItems" initialParams={{ username: this.username, accountType: this.accountType }} component={Menu} />
          <Stack.Screen name="Order" initialParams={{ username: this.username, accountType: this.accountType }} component={OrderActions} />
          <Stack.Screen name="PrintBill" initialParams={{ username: this.username, accountType: this.accountType }} component={PrintBill} />
        </Stack.Navigator>
      );
      }
      else if (this.accountType.toLowerCase() == "admin") {
        return (
          <Stack.Navigator>
          <Stack.Screen name="AdminActions" initialParams={{ username: this.username, accountType: this.accountType }} component={AdminActionScreen} />
        </Stack.Navigator>
      );
      }
      else if (this.accountType.toLowerCase() == "staff") {
        return(
          <Stack.Navigator>
          <Stack.Screen name="ManagerActions" initialParams={{ username: this.username, accountType: this.accountType }} component={ManagerActionScreen} />
        </Stack.Navigator>
        );
      }
  
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