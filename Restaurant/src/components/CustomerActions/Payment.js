//NOTE:
// THIS FILE NEEDS TO BE RENAMED TO ADDPAYMENT WHEN INTEGRATING INTO PROJECT
//THIS COMPONENT LOADS A CARD THAT LISTS ALL OF THE USER'S SAVED PAYMENT OPTIONS, AND ALLOWS THE USER TO ADD ANOTHER PAYMENT OPTION

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Touchable} from 'react-native';
import {Picker} from '@react-native-community/picker'
import {Card} from 'react-native-elements';
import { Ionicons, Entypo } from '@expo/vector-icons';
import {RadioButton} from 'react-native-paper'

export default class Payment extends React.Component {

  username = this.props.username; //Passed in props should include the userName so we can retrieve the user's saved payment options
  width = 250; //Passed in props should include the width of the card container (based on screen size); this is a dummy value for now
  //Retrieve user's saved payment options from DB 
  //Dummy data:
  savedPayments = [
    {img: "card", number: "1234" , name: "Al Pacino"},
    {img: "paypal", number: "7890", name: "Al Pacino"},
    {img: "apple", number: "3478", name: "Marty Scorsese" }
  ]

  constructor(props) {
    super(props)
    this.state= {
      addPaymentOpen:false, //tells RN whether to display the Input fields for adding a new method
      selectedCardType:'card', //stores the new method's type (card/paypal/apple)
      cardNumber:undefined, //stores the new method's number
      cardName:undefined, //stores the new method's owner's name,
      selectedPaymentMethod: {
        cardName:undefined,
        cardNumber:undefined,
        cardType:undefined
      },
      savedPayments:[]
    }
  }

  async getPaymentMethods() {
    console.log("In get payments")
    await fetch('https://badgerbytes.herokuapp.com/users/payment/'+this.username, {
      method: 'GET',
    }).then(res => res.json()).then(res=> {
      this.setState({savedPayments:res.paymentMethods, selectedPaymentMethod:{
        cardName:res.paymentMethods[0].name, cardNumber:res.paymentMethods[0].number, cardType:res.paymentMethods[0].method
      }})
    })
  }

  async componentDidMount () {
    await this.getPaymentMethods();
  }

  /**
   * This method returns an array of <Views>, where one <View> constitutes one row of Type, number, and name in the Payment Card. I will call this method in render(), so that we render the views that I put into this array
   */
  dispPayments() {
    let paymentDisplays = [];
    for(let payment of this.state.savedPayments) {
      paymentDisplays.push(
        //flexDirection:row makes the contents of the <View> go side by side instead of below each other
        //The {payment.img == _ && <Element>} means, if the condition (payment.img == _) is true, then render the <Element>. Since any payment method can only have one type and therefore one image, only one of the 3 of those statements will ultimately render
        <View key = {payment.number} style = {{flexDirection:'row'}}>
          <RadioButton
          value={payment.number}
          status= {this.state.selectedPaymentMethod.cardNumber === payment.number ? 'checked':'unchecked'}
          onPress={()=>{this.setState({selectedPaymentMethod:{
            cardName:payment.name,
            cardNumber:payment.number,
            cardType:payment.method
          }})}}></RadioButton>
          {payment.method == "card" && <Ionicons name="card" size={20} color="black" style={{padding:"5%"}}/>}
          {payment.method == "paypal" && <Entypo name="paypal" size={20} color="black" style={{padding:"5%"}}/>}
          {payment.method == "apple" && <Ionicons name="logo-apple" size={20} color="black" style={{padding:"5%"}}/>}
          <Text style={{padding:"5%"}}>
             {payment.number}
          </Text>
          <Text style={{padding:"5%"}}>
            {payment.name}
          </Text>
        </View>
      )
    }
    return paymentDisplays; //return the array of <View>s I just made to render
  }

  /**
   * This method is called when the user clicks save on the Add payment dialog
   * This method needs to be filled with functionality to send the new payment details to the DB. 
   * Right now, all it does is closes the Add Payment dialog
   */
  async savePayment() {
    console.log("In save payment")
    fetch('https://badgerbytes.herokuapp.com/users/payment/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.username,
        paymentMethod: {
          name:this.state.cardName,
          number:this.state.cardNumber,
          method:this.state.selectedCardType.toLowerCase()
        }
      })
    }).then(res => res.json()).then(res=> {
      console.log("HERE status")
      if(res.status == 400) {
        Alert.alert("Invalid payment method!")
      }
      else {
        this.getPaymentMethods();
        this.setState({addPaymentOpen:false});
      }
    })
    
  }


  render() {
  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <Card>
        <Card.Title>
          Saved Payment Options
        </Card.Title>
        <Card.Divider/>
        <View style={{width:this.width}}>
          {this.dispPayments()}
        </View>
        {!this.state.addPaymentOpen && <TouchableOpacity onPress={()=>{
          this.setState({addPaymentOpen:true})
        }}>
        <View style = {{flexDirection:'row', justifyContent: "center", marginTop: "5%"}}>
          <Ionicons name="add-circle" size={20} color="black" style={{paddingRight:"2%"}}/>
          <Text>
            Add New Payment Method
          </Text>
        </View>
        </TouchableOpacity>}
        
        {this.state.addPaymentOpen && <View>
          <Picker selectedValue = {this.state.selectedCardType} onValueChange={(itemValue, itemIndex) => this.setState({selectedCardType:itemValue})}>
            <Picker.Item label="Card" value="Card" />
            <Picker.Item label="Paypal" value="Paypal"/>
            <Picker.Item label="Apple" value="Apple"/>
          </Picker>
          <TextInput
          style={{ borderColor: 'grey', borderWidth: 0.5, margin:3, padding: 10}} defaultValue="Enter your payment ID" onChangeText={(text) => {this.setState({cardNumber:text})}}>
          </TextInput>
          <TextInput
          style={{ borderColor: 'grey', borderWidth: 0.5, margin:3, padding: 10}} defaultValue="Enter name on payment method" onChangeText={(text) => {this.setState({cardName:text})}}>
          </TextInput>
          <TouchableOpacity style={{borderColor:'grey', borderWidth:0.5, padding:10, width:"30%", borderRadius:3, marginLeft:'35%', marginTop:5, backgroundColor:'black'}}
           onPress={()=> {this.savePayment()}} 
          >
            <Text style={{textAlign:'center', color:'white'}}>
              Save
            </Text>
          </TouchableOpacity>
        </View>}
      </Card>
    </View>
    </SafeAreaProvider>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
