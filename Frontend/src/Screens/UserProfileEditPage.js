import React from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { COLORS } from "../../assets/Constants.js/Constant";
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";


const UserProfileEditPage = () => {

    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!");
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uploadUri = result.assets[0].uri;
            console.log(uploadUri);
            setImage(uploadUri)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <KeyboardAvoidingView behavior='position' style={styles.propicContainer}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                    <View style={{ alignItems: 'center' }} >
                        <Text style={styles.edit}>Edit Profile</Text>
                    </View>

                    <View style={styles.propicContainer}>
                        <View style={styles.outerCircle}>
                            <View style={styles.innerCircle}>
                                <Image
                                    source={{ uri: image }}
                                    style={{ width: 165, height: 165, borderRadius: 82.5 }}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.profileimage2} onPress={pickImage} >

                            <FontAwesome name="camera" size={25} color="black" />

                        </TouchableOpacity>
                    </View>

                    <View >
                        <Text style={styles.editname}>Enter Name</Text>
                        <View >
                            <TextInput
                                style={{ fontSize: 18, borderWidth: 1, height: 40, width: 300, borderRadius: 7, marginTop: '3%',paddingLeft: '3%' }}
                            />
                        </View>
                    </View>

                    <View >
                        <Text style={styles.editname}>Status</Text>
                        <View >
                            <TextInput
                                style={{ fontSize: 18, borderWidth: 1, height: 40, width: 300, borderRadius: 7, marginTop: '3%', paddingLeft: '3%' }}
                            />
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            <View style={{ alignItems: 'center', width: '100%', height: '20%' }}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    edit: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: '10%',
    },
    propicContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    outerCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#ddccff",
        justifyContent: "center",
        alignItems: "center",
    },
    innerCircle: {
        width: 165,
        height: 165,
        borderRadius: 82.5,
        backgroundColor: "#805AD1",
        justifyContent: "center",
        alignItems: "center",
    },
    profileimage2: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
        position: 'relative',
        top: -50,
        left: 60
    },
    editname: {
        fontWeight: 'bold',
        fontSize: 20,
        opacity: 0.7,
        marginTop: '5%',
    },
    btn: {
        height: '30%',
        backgroundColor: COLORS.primary,
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: '15%'
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.secondry
    },
});

export default UserProfileEditPage;