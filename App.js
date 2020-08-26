import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import LoginScreen from "./src/LoginScreen";
import SignupScreen from "./src/SignupScreen";
import MainScreen from "./src/MainScreen";
import SettingScreen from "./src/settingScreen"

import { navigationRef } from "./src/RootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import firebase from 'firebase';

const Stack = createStackNavigator();

const config = {
  apiKey: "AIzaSyDYpdEhjrk193WVBHd12i7oVpwIwRrg2UE",
  authDomain: "remote-switch-922b7.firebaseapp.com",
  projectId: "remote-switch-922b7",
  appId: "project-495928549947"
}

if(!firebase.apps.length){
firebase.initializeApp(config)
}

const LoginStackScreen = () => {
  return <LoginScreen></LoginScreen>;
};
const SignupStackScreen = () => {
  return <SignupScreen></SignupScreen>;
};

const MainStackScreen = () => {
  return <MainScreen></MainScreen>;
};

const SettingStackScreen = () => {
  return <SettingScreen></SettingScreen>;
};

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={LoginStackScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignupStackScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Main"
          component={MainStackScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
