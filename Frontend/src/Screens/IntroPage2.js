import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../assets/constants/constant';
const startImg = require('../../assets/start2.png')
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';

const IntroPage2 = () => {

    return (
        <SafeAreaView style={{ alignItems: 'center' }}>
            <StatusBar/>
            <View style={styles.imgContainer}>
            <LottieView style={{flex : 1 , height : '100%' , width : '92%'}} source={require('../../assets/intro2.json')} autoPlay loop />
            </View>
            <View style={{ backgroundColor: 'white', backgroundColor: COLORS.primary, width: '80%', borderRadius: 30, alignItems: 'center', height: 350 }}>
                <Text style={{ fontSize: 25, fontWeight: '700', marginTop: 50, marginLeft: 10, color: COLORS.third, }}>Schedule Your</Text>

                <Text style={{ fontSize: 25, fontWeight: '700', marginTop: 10, marginLeft: 10, color: COLORS.third }}>Tasks & Projects Easily</Text>
                <Text style={{ fontSize: 25, fontWeight: '700', marginTop: 10, marginLeft: 10, color: COLORS.third }}> With StudyMate! </Text>

                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ color: COLORS.third, fontSize: 16, fontWeight: 'bold', opacity: 0.8 }}>Skip</Text>
                </TouchableOpacity>

            </View>


        </SafeAreaView>

    );


};

const styles = StyleSheet.create({

    btn: {
        margin: 60,
        height: '12%',
        backgroundColor: 'white',
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 60,
        marginBottom: 30,

    },

    btnText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: COLORS.primary

    },

    imgContainer: {
        overflow: 'hidden'

    },

    img: {
        height: 350,
        resizeMode: 'contain',
        width: 300,
    },

});


export default IntroPage2;