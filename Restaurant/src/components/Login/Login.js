import React, { Component } from "react";
import { ScrollView } from "react-native";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
//import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      type: "",
    };
  }

  async login() {
    fetch('https://badgerbytes.herokuapp.com/users/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
  .then(async res=> {
    let response = await res.json();
    if(response == 'Not Found') {
      Alert.alert('Invalid username/password. Try again!')
    }
    else {
      await this.getUserType();
      console.log(this.state.type)
      this.props.navigation.navigate("LoggedIn", {
        username: this.state.username,
        accountType: this.state.type
      })
    }
  }).catch((err) => {
        console.log(err);
      });
  }

  async getUserType() {
    await fetch('https://badgerbytes.herokuapp.com/users/type/'+this.state.username, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => this.setState({ type: res.type }))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* <View style={styles.container}> */}
        {/* ---------- Logo ---------- */}
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("./../Images/badgerbytes-logo.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}> Username </Text>
          <TextInput
            placeholder="Username or email"
            placeholderTextColor="#b5b5b5"
            style={styles.input}
            autoCapitalize='none'
            onChangeText={(text) => {
              this.setState({ username: text });
            }}
          />

          <Text style={styles.formTitle}> Password </Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#b5b5b5"
            secureTextEntry
            style={styles.input}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />


          {/* ------ Buttons ------ */}
          <TouchableOpacity onPress={() => this.login()} style={styles.buttonContainer}>
            <Text style={styles.buttonText} >
              Log In
            </Text>
          </TouchableOpacity>

          <View style={styles.accountLink}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("CreateAccount")}
            >
              <Text style={{ color: "#5e85bd" }}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate("CreateAccount")}
            >
              <Text>Create Account</Text>
            </TouchableOpacity> */}
        {/* </View> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },

  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },

  logo: {
    flex: 1,
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  formContainer: {
    paddingTop: 40,
  },
  formTitle: {
    color: "#1d3557",
    paddingBottom: 10,
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
  accountLink: {
    justifyContent: "center",
    alignItems: "baseline",
    paddingTop: 20,
    flexDirection: "row",
  },
});
