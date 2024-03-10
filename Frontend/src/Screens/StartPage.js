import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView, StatusBar } from 'react-native';
import { BallIndicator } from 'react-native-indicators'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CurvedBottomBar from '../Components/CurvedBottomBar';
const logoImg = require('../../assets/StudyMateLogo.png');
import { useNavigation } from '@react-navigation/native';


import { useEffect } from 'react';
import { COLORS } from '../../assets/constants/constant';
const StartPage = () =>   {
    const navigation = useNavigation();

    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.navigate('swiper'); // Assuming 'MainTab' is the name of your main tab screen

    }, 5000);
  
      return () => clearTimeout(timer);
    }, [navigation]);

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLORS.secondry} barStyle='dark-content'/>
        <View style={styles.logoContainer}>
          <Image source={logoImg} style={styles.img} />
          <Text style={styles.logoText}>StudyMate</Text>
        </View>
        <View style={styles.indicatorContainer}>
          <BallIndicator color='#805AD1' /> 
        </View>
      </SafeAreaView>
    );
  
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden'
  },
  logoContainer: {
    marginTop: '50%',
    alignItems: 'center',
    borderColor: 'black',
    
  },
  img: {
    borderColor : 'red',
    height: '55%',
    width: 350,
  },
  logoText: {
    marginTop: "2%",
    fontSize: 30,
    fontWeight: 'bold',
    color: 'gray'
  },
  indicatorContainer: {
    marginTop: "5%"
  }
});

export default StartPage;