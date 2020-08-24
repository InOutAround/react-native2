import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as RootNavigation from './RootNavigation.js';

import FooterButton from "./components/FooterButton";



export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "이름",
      id: "아이디",
      email: "이메일",
      password: "비밀번호",
      keyboard: false,
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
    back = () => { 
    _navigator.dispatch(
        NavigationActions.back()
    );
}
  
  
  render() {
    return (
      <TouchableWithoutFeedback onPress={this._onPressEmptySpace}>
        <View style={styles.container}>
          <Text style={styles.SwitchText}>SWITCH {"\n"}계정 만들기</Text>

          <TextInput
            onFocus={this._onFocusTextField}
            style={styles.textInputButton}
            onChangeText={(name) => this.setState({ name })}
            placeholder={this.state.name}
            autoCorrect={false}
            returnKeyType={"next"}
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
          ></TextInput>
          <TextInput
            onFocus={this._onFocusTextField}
            style={styles.textInputButton}
            onChangeText={(id) => this.setState({ id })}
            placeholder={this.state.id}
            returnKeyType={"next"}
            ref={(input) => {
              this.secondTextInput = input;
            }}
            onSubmitEditing={() => {
                this.thirdTextInput.focus();
              }}
            autoCorrect={false}
          ></TextInput>
          <TextInput
            onFocus={this._onFocusTextField}
            style={styles.textInputButton}
            onChangeText={(email) => this.setState({ email })}
            placeholder={this.state.email}
            returnKeyType={"next"}
            ref={(input) => {
                this.thirdTextInput = input;
              }}
            onSubmitEditing={() => {
            this.forthTextInput.focus();
            }}
            autoCorrect={false}
          ></TextInput>
          <TextInput
            onFocus={this._onFocusTextField}
            style={styles.textInputButton}
            onChangeText={(password) => this.setState({ password })}
            placeholder={this.state.password}
            autoCorrect={false}
            returnKeyType={"next"}
            ref={(input) => {
                this.forthTextInput = input;
              }}
            secureTextEntry={true}
          ></TextInput>
          <Text style={styles.descriptionText}>
            회원가입 시 이용약관에 동의한 것으로 간주합니다.
          </Text>

          <FooterButton 
          style={styles.signupButton} 
          buttonText="회원가입"
          onPress= {() => RootNavigation.navigate('Home')} />
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
});
