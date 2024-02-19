import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity , Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../assets/Constants.js/Constant';
const startImg = require('../../assets/start1.png')



const IntroPage1 = () => {
  

  return (
    <SafeAreaView style={{alignItems : 'center'}}> 
      <View style={styles.imgContainer}>
        <Image source={startImg} style={styles.img}/>
      </View>
      <View style={{ backgroundColor: 'white' ,backgroundColor : COLORS.primary ,width : '80%' ,borderRadius : 30,alignItems:'center',height : 350}}>
        <Text style={{ fontSize: 25, fontWeight: '700', marginTop: 50, marginLeft: 20 ,color : COLORS.third ,}}>Time & Task </Text>

        <Text style={{ fontSize: 25, fontWeight: '700', marginTop: 10, marginLeft: 10 ,color : COLORS.third }}>Management App </Text>
        <Text style={{ fontSize: 25, fontWeight: '700', marginTop : 10, marginLeft: 10 ,color : COLORS.third }}> for Everyone!</Text>
        <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color : COLORS.third,fontSize : 16,fontWeight : 'bold',opacity : 0.8}}>Skip</Text>
        </TouchableOpacity>
      
      </View>


    </SafeAreaView>
    
        
  );
};
const styles = StyleSheet.create({
  btn : {
    margin : 60,
    height : '12%',
    backgroundColor : 'white',
    width : '50%',
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 10,
    marginTop : 60,
    marginBottom : 30,
  },

  btnText : {
    fontSize : 19,
    fontWeight : 'bold',
    color : COLORS.primary

  },
  imgContainer :{
    overflow : 'hidden'

  },
  img : {
    height : 350,
    resizeMode : 'contain',
    width : 300,
  },
});


  


export default IntroPage1;