import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import FooterButton from "./components/FooterButton";

import AntDesign from "react-native-vector-icons/AntDesign";

import * as RootNavigation from "./RootNavigation.js";

export default class SettingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => RootNavigation.navigate("Main")}>
          <AntDesign name="arrowleft" size={30} color="#5B5A5A" />
        </TouchableOpacity>
        <Image source={require("./swich_icon.png")} style={styles.icon} />

        <Text style={styles.currentVersionText}>현재버전 1.0.0</Text>
        <Text style={styles.currentVersionText}>지원환경 ios 7.0 이상</Text>
        <FooterButton
          buttonText="로그아웃"
          style={styles.footerButton}
          onPress={() => RootNavigation.navigate("Home")}
        />

        <Text> 😢 원래는 웹을 하려고 했었다.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8D8D8",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 60,
    height: 60,
  },
  currentVersionText: {
    marginVertical: 15,
    fontSize: 12,
    color: "#5B5A5A",
  },
  footerButton: {
    marginTop: 250,
  },
  arrow: {
    position: "absolute",
    left: 20,
    top: 50,
  },
});
