import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Image,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FooterButton from "./components/FooterButton";
import * as RootNavigation from "./RootNavigation.js";
import Toast from "react-native-easy-toast";

import * as firebase from "firebase";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pw: "",
      keyboard: false,
      loading: false,
    };
  }

  getComment = () => {
    return this.state.keyboard
      ? "Keyboard is showing!"
      : "Keyboard is dismissed!";
  };

  _onPressEmptySpace = () => {
    Keyboard.dismiss();
    this.setState({
      keyboard: false,
    });
  };
  _onPressSubmit = () => {
    Keyboard.dismiss();
    this.setState({
      keyboard: false,
    });
  };
  _onFocusTextField = () => {
    this.setState({
      keyboard: true,
    });
  };
  handleLogin = () => {
    const { id, pw } = this.state;
    this.setState({loading:true})
    // id = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(id, pw)
      .then(() => 
        this.setState({loading: false}),
        RootNavigation.navigate("Main"))
      .catch(() =>
        this.setState({loading: false}),
        this.refs.toast.show(
          "잘못된 로그인 정보입니다. 다시 로그인해 주세요",
          1500
        )
      );
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._onPressEmptySpace}>
        <View style={styles.container}>
          <Image source={require("./swich_icon.png")} style={styles.icon} />

          <Text style={styles.welcomeText}>환영합니다</Text>
          <TextInput
            onFocus={this._onFocusTextField}
            style={styles.textInputBotton}
            onChangeText={(id) => this.setState({ id })}
            placeholder="아이디"
            autoCorrect={false}
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
          />
          <TextInput
            onFocus={this._onFocusTextField}
            style={styles.textInputBotton}
            onChangeText={(pw) => this.setState({ pw })}
            placeholder="비밀번호"
            returnKeyType={"next"}
            ref={(input) => {
                this.secondTextInput = input;
            }}
            autoCorrect={false}
            secureTextEntry={true}
            />
            {
                this.state.loading
                ? <ActivityIndicator style={styles.loginButton} size='small' />
                : <FooterButton
                buttonText="로그인"
                style={styles.loginButton}
                onPress={this.handleLogin}
              />
            }

          <Text style={styles.noAccountText}>계정이 없으신가요?</Text>

          <TouchableOpacity onPress={() => RootNavigation.navigate("SignUp")}>
            <Text style={styles.makeAccountText}>계정 만들기</Text>
          </TouchableOpacity>
          
          <Toast ref="toast"></Toast>
        </View>
      </TouchableWithoutFeedback>
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
    width: 60,
    height: 60,
    marginBottom: 70,
  },
  welcomeText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 23,
  },
  textInputBotton: {
    width: 288,
    borderColor: "gray",
    paddingVertical: 10,
    borderWidth: 0.3,
    paddingHorizontal: 5,
    borderRadius: 2,
    backgroundColor: "white",
    height: 50,
  },
  loginButton: {
    width: 315,
    height: 50,
    marginTop: 30,
  },
  noAccountText: {
    marginTop: 30,
    fontSize: 12,
    color: "#5B5A5A",
  },
  makeAccountText: {
    fontSize: 12,
    color: "#9013FE",
  },
});
