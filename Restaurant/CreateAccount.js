import React, { Component } from "react";
import { ScrollView } from "react-native";
import {Picker} from '@react-native-community/picker';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";
import Constants from "expo-constants";



export default class CreateAccount extends Component {
    
constructor(props) {
    super(props)
    this.state = {
        selectedAccountType:"Customer",
        username:"",
        password:""
    }
   
   

}

async createAccount() {


  console.log("here")
    await fetch('https://badgerbytes.herokuapp.com/users/createAccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            type: this.state.selectedAccountType
    }) } ).then(async res=> {
       let response = await res.json();
       if (response == "Too short") {
           Alert.alert("Your username is too short! It needs be at least 8 characters long")
       }
       else if (response == "Duplicate") {
           Alert.alert("This username already exists. Try another one!")
       }
       else {
           Alert.alert("Signed up successfully!");
           this.props.navigation.navigate('Login')
       }
    })
}


  render() {
    return (
      <View style={styles.container}>
            <View style={styles.accountLink}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={{ color: "#5e85bd" }}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        <View style={styles.logoContainer}>
        <Image
            style={styles.logo}
            source={require("./src/components/Images/badgerbytes-logo.png")}
          />
          </View>
        <View style={styles.formContainer}>
          <View style={styles.container2}>
            <TextInput
              placeholder="Enter your username or email"
              placeholderTextColor="rgba(29, 53, 87, .7)"
              style={styles.input}
              onChangeText = {(text)=> {
                  this.setState({username:text})
              }}
            />

            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="rgba(29, 53, 87, .7)"
              secureTextEntry
              style={styles.input}
              onChangeText={(text) => {
                  this.setState({password:text})
              }}
            />

            <Picker style = {{margin:"1%", height:50, borderColor:"rgba(29, 53, 87, .7)",marginBottom:30 ,marginTop:50, backgroundColor:'rgba(255,255,255,.2)'}} selectedValue = {this.state.selectedAccountType} onValueChange={(itemValue, itemIndex) => this.setState({selectedAccountType:itemValue})}>
                <Picker.Item  label="Customer" value="Customer" />
                <Picker.Item  label="Admin" value="Admin"/>
                <Picker.Item  label="Staff" value="Staff"/>
          </Picker>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text
                style={styles.buttonText}
                onPress={() =>
                   this.createAccount()
                }
              >
               Create Account 
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
  container2: {
    padding: 20,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom:30,
  },
  logo: {
    flex: 1,
    width: 200,
    height: 100,
    resizeMode: "contain",
    alignItems:'center'
  },
  title: {
    color: "#1d3557",
    marginBottom: 10,
    marginTop:30,
    marginLeft: 100,
    textAlign:'center',
    width: 200,
 
    justifyContent: "center",
    opacity: 0.9,
    fontSize: 30,
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#b5b5b5",
    marginBottom: 20,
    color: "#383838",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: "center",
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
    // Navy brand color
    backgroundColor: "#1d3557",
  },
  buttonText: {
    borderColor: "white",
    fontSize: 15,
    color: "white",
    padding: 10,
    borderRadius: 20,
  },
});
