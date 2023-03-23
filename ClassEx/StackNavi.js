import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';


import Danhsach from './../tetder/Danhsach';
import Homeone from './../tetder/Homeone';

const Stack = createStackNavigator();
function MyStack() {
    return (
      <Stack.Navigator initialRouteName="Homeone">
      
        <Stack.Screen options={{headerShown: false}} name="Homeone" component={Homeone} />
        <Stack.Screen options={{headerShown: true}} name="Danhsach" component={Danhsach} />
        
      </Stack.Navigator>
    );
  }


export default class StackNavi extends Component {
  render() {
    return (
      <NavigationContainer>
        <MyStack></MyStack>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({})