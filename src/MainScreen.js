import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import * as RootNavigation from './RootNavigation.js';

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSwitchTurnOn: true,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.descriptionText}>REMOTE{"\n"}SWITCH</Text>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => RootNavigation.navigate("Home")}>
          <AntDesign name="arrowleft" size={30} color="#5B5A5A" />
        </TouchableOpacity>
        <TouchableOpacity
        onPress= {() => RootNavigation.navigate('Setting')}>

          <AntDesign name="setting" color="#5B5A5A" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.setState({ isSwitchTurnOn: !this.state.isSwitchTurnOn })
          }
        >
          <Image
            source={
              this.state.isSwitchTurnOn
                ? require("./on.png")
                : require("./off.png")
            }
            style={styles.icon}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D8D8D8",
  },
  icon: {
    width: 185,
    height: 300,
    marginTop: 30,
  },
  descriptionText: {
    fontSize: 16,
    color: "#5B5A5A",
    textAlign: "center",
    marginBottom: 40,
  },
  arrow: {
    position: "absolute",
    left: 20,
    top: 50,
  },
});
