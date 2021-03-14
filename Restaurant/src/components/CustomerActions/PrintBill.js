import React, { Component } from "react";
import { StyleSheet, View, Image, Text, ScrollView, SafeAreaView } from "react-native";
import {Card} from 'react-native-elements';
import {Picker} from '@react-native-community/picker'
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";
import Payment from './Payment'


export default class PrintBill extends React.Component{
    accountType = this.props.route.params.accountType;
    username = this.props.route.params.username;

    constructor(props) {
        super(props);
        this.state= {
          order:[],
          totalCost:0,
          pickUpTime:""
        }
      }

      async getOrder() {
        await fetch('http://badgerbytes.herokuapp.com/orders/viewOrder/' + this.username, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(res=>res.json()).then(res=>{if (res.orderPurchased) {console.log(res); this.setState({pickUpTime:res.pickUpTime,
            order:res.itemsOrdered})}});
      }

      async componentDidMount() {
          console.log("in mount")
          await this.getOrder();
          let sum = 0;
          for(let item of this.state.order) {
            sum+=item.cost
          }
         this.setState({totalCost:sum})
      }

      async deleteOrder() {
          await fetch ('https://badgerbytes.herokuapp.com/orders/deleteOrder', {
              method: 'DELETE',
              headers: {
                  'Content-type':'application/json'
              },
              body: JSON.stringify({username:this.username})
          }).then(this.props.navigation.navigate('CustomerActions'))
      }

    render() {
        return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
            {this.state.order.length == 0 && <View style = {styles.container}>
                <Text>
                    You do not have any pending orders!
                </Text>
                </View>}
            {this.state.order.length > 0 && <View>
                <Card>
        <Card.Title>Order Receipt</Card.Title>
        <Card.Divider/>
        { 
          this.state.order.map((item) => {
            return (
              <View key= {item.name} style = {{flexDirection:'row', justifyContent:'center'}}>
              <Text>
              {item.name}......${item.cost}
              </Text>
              </View>
            )
          })

        }
        <Card.Divider/>
        {<Text>
            Total Cost: ${this.state.totalCost}     
        </Text>}
        <Card.Divider/>
        {
            <Text>
                Pick up time: {this.state.pickUpTime}
            </Text>
        }
        </Card>
        <TouchableOpacity style = {{backgroundColor:'grey', padding:5, margin:10, borderWidth:3}}
            onPress = {()=>{this.deleteOrder()}}
        >
            <Text>
                Order picked up
            </Text>
        </TouchableOpacity>

                </View>}
            </ScrollView>
        </SafeAreaView>)

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    title:{
        fontSize:40,
        textAlign:"center"
    }
  
  });