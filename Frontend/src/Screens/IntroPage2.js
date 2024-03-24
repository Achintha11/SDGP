import {SafeAreaView,StyleSheet,Text,View,TouchableOpacity,Image,} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../assets/constants/constant";
const startImg = require("../../assets/start2.png");
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";

const IntroPage2 = ({ goToNextPage }) => {


  
  const handleNextPress = () => {
    goToNextPage();
  };


  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: COLORS.secondry }}>
      <StatusBar />
      <View style={styles.imgContainer}>
        <LottieView loop={true} autoPlay={true} style={{ flex: 1, height: '90%', width: '90%' }} source={require("../../assets/intro2.json")} />
      </View>

      <View style={{  backgroundColor: COLORS.primary, width: "75%", borderRadius: 30,  height: '45%', padding:'10%',alignItems:'center'}} >
        <Text style={styles.Description}>Schedule Your</Text>
        <Text style={styles.Description}>Tasks & Projects</Text>
        <Text style={styles.Description}>Easily With</Text>
        <Text style={styles.Description}>StudyMate!</Text>


        <TouchableOpacity onPress={handleNextPress} style={styles.btn}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity>
          <Text style={{ color: COLORS.third, fontSize: 16, fontWeight: "bold", opacity: 0.8, }}>Skip</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    margin: 60,
    height: "15%",
    backgroundColor: "white",
    width: "40%",
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
    height: '50%',
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center'
  },

  img: {
    height: 350,
    resizeMode: "contain",
    width: 300,
  },

  Description: {
    marginTop: 2,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
 
    
  },
});

export default IntroPage2;
