import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../assets/constants/constant";
const startImg = require("../../assets/start1.png");
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const IntroPage1 = ({ goToNextPage , skiPress }) => {

  const handleGetStart = () => {
    goToNextPage();
  };


  const handleSkipPress = () =>{
    skiPress();
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: COLORS.secondry,
      }}
    >
      <StatusBar />
      <View style={styles.imgContainer}>
        <LottieView
          style={{ flex: 1, height: "100%", width: "100%" }}
          source={require("../../assets/intro1.json")}
          autoPlay
          loop
        />
      </View>
      <View
        style={{
          backgroundColor: COLORS.primary,
          width: "75%",
          borderRadius: 30,
          alignItems: "center",
          height: "45%",
          padding: "10%",
        }}
      >
        <Text style={styles.Description}>Time & Task </Text>
        <Text style={styles.Description}>Management App </Text>
        <Text style={styles.Description}> for Everyone!</Text>

        <TouchableOpacity onPress={handleGetStart} style={styles.btn}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkipPress}>
          <Text
            style={{
              color: COLORS.third,
              fontSize: 16,
              fontWeight: "bold",
              opacity: 0.8,
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    margin: 60,
    height: "15%",
    backgroundColor: "white",
    width: "55%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 60,
    marginBottom: 30,
  },

  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  imgContainer: {
    height: "50%",
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
  },
  img: {
    height: 350,
    resizeMode: "contain",
    width: 300,
  },

  Description: {
    marginTop: 2,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});

export default IntroPage1;
