import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { COLORS } from '../../assets/constants/constant';
const useredit = require("../../assets/useredit.png")
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const UserProfilePage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar/>

            <View style={styles.header}>
                <View style={{ marginRight: '25%', marginLeft: '39%' }} >
                    <Text style={styles.profile}>Profile</Text>
                </View>

                <TouchableOpacity>
                    <FontAwesome5 name="user-edit" size={24} color={COLORS.primary} />
                </TouchableOpacity>


            </View>

            <View style={styles.propicContainer}>
                <View style={styles.roundView}>
                    <View style={styles.roundview2}>

                    </View>
                </View>

                <View style={styles.nameContainer}>
                    <Text style={styles.profile}>Sanindu Binaragama</Text>
                    <Text style={styles.profiletext}>Undergradute Student</Text>
                </View>

            </View>

            <View styles={styles.settings}>
                <Text style={styles.settings1}>Account</Text>
            </View>

            <View>
                <TouchableOpacity style={styles.buttons}>
                    <FontAwesome6 name="user-shield" size={24} color="black" />
                    <Text style={styles.subsettings}>Privacy</Text>
                </TouchableOpacity>
            </View>



            <View styles={styles.settings}>
                <Text style={styles.settings1}>General Settings</Text>
            </View>

            <View>
                <TouchableOpacity style={styles.buttons}>
                    <MaterialCommunityIcons name="bell-ring" size={24} color={COLORS.primary} />
                    <Text style={styles.subsettings}>Sounds and Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttons}>
                    <Entypo name="help-with-circle" size={24} color="orange" />
                    <Text style={styles.subsettings}>Help & Support</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttons}>
                    <MaterialIcons name="logout" size={24} color="red" />
                    <Text style={styles.subsettings}>logout</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    roundView: {
        width: '56%',
        height: '70%',
        borderRadius: 150,
        backgroundColor: COLORS.piccontainer,
        alignItems: 'center',
        justifyContent: 'center'
    },

    container: {
        flex: 1,
        backgroundColor: COLORS.third,
        alignItems: 'centers'
    },

    header: {
        backgroundColor: COLORS.third,
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '5%'
    },

    propicContainer: {
        height: '40%',
        width: '100%',
        backgroundColor: COLORS.third,
        alignItems: 'center',
        justifyContent: 'center'
    },

    roundview2: {
        width: '80%',
        height: '80%',
        borderRadius: 150,
        backgroundColor: COLORS.primary,
    },

    profile: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '2%'
    },

    profiletext: {
        fontSize: 15,
        color: COLORS.fourth,
        fontWeight: 'bold'
    },

    settings1: {
        fontWeight: 'bold',
        fontSize: 20,
        opacity: 0.7,
        marginTop: '9%',
        marginLeft: '6%'
    },

    subsettings: {
        fontWeight: 'bold',
        marginLeft: '6%'
    },

    buttons: {
        marginTop: '5%',
        flexDirection: 'row',
        marginLeft: '10%',
        alignItems: 'center',
    },
    nameContainer: {
        alignItems: 'center',
        marginTop: '5%'
    },

});

export default UserProfilePage;