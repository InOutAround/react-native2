import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import WeatherBox from "./components/WeatherBox";

import * as RootNavigation from "./RootNavigation.js";
import * as firebase from "firebase";
// import "firebase/firestore";

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("user");
    this.state = {
      isSwitchTurnOn: true,
      user: null,
      weaherIcon: "",
      weatherText: "",
      temp: null,
      location: null,
      
    };
  }
  async componentDidMount() {
    const user = await firebase.auth().currentUser;
    if (user) {
      this.setState({ user: user.email });
      // console.log(this.state.user);
    } else {
      console.log("no user");
    }
  }

  handleWeatherBox = () => {
    navigator.geolocation.getCurrentPosition( async (position) => {
      // console.log(position)
      let lat = 37.670473;
      let lng = 126.788876;
      // console.log(lat,lng)
      let key = "24f914005a1cdff206371d7d4b6134e3";
      let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}&units=metric`;

      await fetch(URL)
        .then((res) => res.json())
        .then((data) => this.setState({
            weatherIcon: data.weather[0].icon,
            weatherText: data.weather[0].description,
            temperature: Math.round(data.main.temp)+ '℃',
            location: data.name,
          }),
        )
        .catch((error) => console.log(error));
    });
  };
  
  onTouchSwitch = () => {
    this.setState({ isSwitchTurnOn: !this.state.isSwitchTurnOn });
    
    this.ref.doc(this.state.user).collection("switch-status").add({
      isSwitchTurnOn: this.state.isSwitchTurnOn,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => RootNavigation.navigate("Home")}
        >
          <AntDesign name="arrowleft" size={30} color="#5B5A5A" />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => RootNavigation.navigate("Setting")}>
            <AntDesign name="setting" color="#916FFe" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => RootNavigation.navigate("Setting")}>
            <AntDesign name="bells" color="#916FFe" size={30} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={this.handleWeatherBox}>
          <WeatherBox
            weatherIcon={this.state.weatherIcon}
            temperature={this.state.temperature}
            weather={this.state.weatherText}
            location={this.state.location}
          />
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={this.onTouchSwitch}>
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
  iconContainer: {
    flexDirection: "row",
    position: "absolute",
    right: 20,
    top: 60,
  },
});
