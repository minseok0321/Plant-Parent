import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import CustomerActions from "./src/components/CustomerActions/CustomerActions";
import AdminActions from "./src/components/AdminActions/AdminActions";
import ManagerActions from "./src/components/ManagerActions/ManagerActions";
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
import Login from "./src/components/Login/Login";
import CreateAccount from './CreateAccount';
import LoggedIn from './LoggedIn';

import MenuActions from "./Menu";
import { NavigationContainer } from "@react-navigation/native";
import { render } from "react-dom";
import OrderActions from "./src/components/CustomerActions/Order";

//test
import "react-native-gesture-handler";

function LoginScreen({ navigation }) {
  return <Login navigation={navigation} />;
}

function LoggedInScreen({ route, navigation }) {
  return <LoggedIn navigation={navigation} route={route} />;
}

function CreateAccountScreen({ navigation }) {
  return <CreateAccount navigation={navigation} />;
}


function AdminActionScreen({ navigation }) {
  return <AdminActions accountType="staff" navigation={navigation} />;
}
function ManagerActionsScreen({ navigation }) {
  return <ManagerActions accountType="staff" navigation={navigation} />;
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator 
    screenOptions={{headerShown:false}}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen}/>
      <Stack.Screen name="LoggedIn" component={LoggedInScreen}/>

    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
