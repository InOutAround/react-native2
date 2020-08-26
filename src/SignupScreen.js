import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Toast from "react-native-easy-toast";
import * as RootNavigation from "./RootNavigation.js";
import FooterButton from "./components/FooterButton";
import AntDesign from "react-native-vector-icons/AntDesign";

import * as firebase from "firebase";
import 'firebase/firestore';
export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('user');
    this.state = {
      email: "이메일",
      password: "비밀번호",
      keyboard: false,
      loading: false,
    };
  }

  handleSignUp = () => {
    this.setState({ loading: true });

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => 
        this.setState({ loading: false }),
        this.ref.doc(this.state.email).set({id: this.state.email}),
        RootNavigation.navigate("Main")
      )
      .catch(
        () => 
        this.setState({ loading: false }),
        this.refs.toast.show(
          "이메일 형식을 확인해 주세요. \n비밀번호는 6자 이상이어야 합니다.",
          2000
        )
      );
  };

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

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._onPressEmptySpace}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => RootNavigation.navigate("Home")}
          >
            <AntDesign name="arrowleft" size={30} color="#5B5A5A" />
          </TouchableOpacity>

          <Text style={styles.SwitchText}>SWITCH {"\n"}계정 만들기</Text>
          <Image source={require("./swich_icon.png")} style={styles.icon} />

          <TextInput
            onFocus={this._onFocusTextField}
            style={styles.textInputButton}
            onChangeText={(email) => this.setState({ email })}
            placeholder="이메일"
            autoCorrect={false}
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
          />
          <TextInput
            onFocus={this._onFocusTextField}
            style={styles.textInputButton}
            onChangeText={(password) => this.setState({ password })}
            placeholder="패스워드"
            returnKeyType={"next"}
            ref={(input) => {
              this.secondTextInput = input;
            }}
            autoCorrect={false}
            secureTextEntry={true}
          />

          <Text style={styles.descriptionText}>
            회원가입 시 이용약관에 동의한 것으로 간주합니다.
          </Text>
          {this.state.loading ? (
            <ActivityIndicator size="small" style={styles.signupButton} />
          ) : (
            <FooterButton
              style={styles.signupButton}
              buttonText="회원가입"
              onPress={this.handleSignUp}
              
            />
          )}

          <Toast ref="toast" />
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
  textInputButton: {
    width: 288,
    height: 50,
    borderColor: "gray",
    paddingVertical: 10,
    borderWidth: 0.3,
    paddingHorizontal: 2,
    backgroundColor: "white",
    textAlign: "center",
  },
  SwitchText: {
    fontSize: 16,
    color: "#5B5A5A",
    marginTop: 41,
    textAlign: "center",
    marginBottom: 115,
  },
  descriptionText: {
    marginTop: 20,
    fontSize: 12,
    color: "#5B5A5A",
    fontWeight: "200",
  },
  signupButton: {
    marginTop: 97.5,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 70,
  },
  arrow: {
    position: "absolute",
    left: 20,
    top: 50,
  },
});
