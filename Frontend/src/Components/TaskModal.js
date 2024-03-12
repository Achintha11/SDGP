import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { PieChart } from "react-native-gifted-charts";
import { COLORS, apiUrl } from "../../assets/constants/constant";
import { Octicons } from "@expo/vector-icons";
import { useState } from "react";
import LottieView from "lottie-react-native";
import Modal from "react-native-modal";
import { Shadow } from "react-native-shadow-2";


const TaskModel = ({ modalVisible, setModalVisible, task, handleDeleteConfirmation, isDeleteModalVisible, setIsDeleteModalVisible }) => {

    const afterDel = () => {
        setIsDeleteModalVisible(false);
        setModalVisible(false);
    };
    if (!task) {
        // If there's no selected task, return null or handle accordingly
        return null;
    }

    const { Title, _id } = task;

    const completed = 80;
    const toComplete = 100 - completed;

    const pieData = [
        {
            value: completed,
            color: "green",
            gradientCenterColor: "green",
            focused: true,
        },
        { value: toComplete, color: "orange", gradientCenterColor: "orange" },
    ];

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            isVisible={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity
                        style={styles.closebtn}
                        onPress={() => setModalVisible(false)}
                    >
                        <Entypo name="chevron-down" size={30} color="black" />
                    </TouchableOpacity>

                    <View style={styles.box1}>
                        <Text style={styles.title}>{Title}</Text>
                        <Text style={styles.h2}>Assignment</Text>
                    </View>

                    <View style={styles.box2}>
                        <View style={{ height: "20%", alignContent: "center" }}>
                            <Text style={styles.start}>Start : 16 Feb 2024 | 4.00pm</Text>
                            <Text style={styles.due}>Due : 16 Feb 2024 | 4.00pm</Text>
                        </View>
                        <View>
                            <Text style={styles.lable3}>Priority Level : High</Text>
                        </View>
                        <View>
                            <Text style={styles.label4}>Description : </Text>
                        </View>
                    </View>

                    <Shadow distance={12}>
                    <View style={styles.box3}>
                        <View>
                            <Text style={styles.label5}>Task Progress</Text>
                        </View>

                        <View>
                            <View
                                style={{
                                    height: '75%',
                                    width: '100%',
                                    borderRadius: 20
                                }}>

                                <View style={{ padding: 10, alignItems: 'center' }}>
                                    <PieChart
                                        data={pieData}
                                        donut
                                        showGradient
                                        sectionAutoFocus
                                        radius={90}
                                        innerRadius={60}
                                        innerCircleColor={'white'}
                                        centerLabelComponent={() => {
                                            return (
                                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text
                                                        style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>
                                                        {pieData[0].value}%
                                                    </Text>

                                                </View>
                                            );
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Octicons name="dot-fill" size={20} color="#ffaa00" />
                                <Text >  To-Do</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Octicons name="dot-fill" size={20} color="green" />
                                <Text >  Completed</Text>
                            </View>
                        </View>


                    </View>
                    </Shadow>

                    <View style={styles.box4}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => handleDeleteConfirmation({ url: apiUrl.get, id: task._id })}
                        >
                            <AntDesign name="delete" size={24} color="white" />
                            <Text style={styles.btnText}>Delete Task</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        coverScreen={true}
                        animationIn={"fadeIn"}
                        animationInTiming={1000}
                        hasBackdrop={false}
                        alignItems={"center"}
                        isVisible={isDeleteModalVisible}
                    >
                        <Shadow distance={100}>
                            <View style={styles.deleteModalView}>
                                <Text style={styles.deleteModalText}>
                                    Task deleted successfully!
                                </Text>
                                <LottieView resizeMode="cover" style={{ flex: 1, height: 300, width: 300,  marginTop : '30%'}} source={require('../../assets/DeleteFinal2.json')} autoPlay loop />
                                    <TouchableOpacity onPress={afterDel} style={styles.OkButton}>
                                        <Text style={styles.OkButtonText}>OK</Text>
                                    </TouchableOpacity>

                            </View>
                        </Shadow>
                    </Modal>
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        zIndex: 0,
        opacity: 1,
        backgroundColor: "transparent",


    },

    imgContainer: {
        height: '90%',
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center'

    },

    imgContainer2: {
        height: '55%',
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center'

    },
    modalView: {
        marginTop: 50,
        borderRadius: 25,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        height: "100%",
        width: "105%",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: COLORS.third,
    },

    closebtn: {
        alignItems: "center",
        position: "relative",
        top: -15,
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },

    title: {
        fontSize: 30,
        color: "black",
        fontWeight: "bold",
    },

    box1: {
        alignItems: "center",
        height: "9%",
        width: "100%",
        justifyContent: "center",
        marginBottom: "4%",
    },

    h2: {
        fontSize: 17,
        color: "gray",
        fontWeight: "bold",
        marginTop: "3%",
    },

    box2: {
        height: "33%",
        width: "100%",
        alignItems: 'center'
    },

    start: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold",
        marginTop: "4%"
    },

    due: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold",
        marginTop: "3%"
    },

    lable3: {
        fontSize: 16,
        color: "gray",
        fontWeight: "bold",
        padding: 5,
        marginTop: "10%",
    },

    label4: {
        fontSize: 16,
        color: "gray",
        fontWeight: "bold",
        padding: 5
    },

    box3: {
        height: 300,
        width: 340,
        borderRadius : 25
    },

    label5: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
        padding: "2%",
        marginLeft: "5%",
        marginTop : '2%'
    },

    box4: {
        height: "10%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    btn: {
        height: "52%",
        backgroundColor: "#cc0000",
        width: "42%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    btnText: {
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: "5%",
        color: COLORS.secondry,
    },

    deleteModalView: {
        height: 300,
        width: 250,
        borderRadius: 20,
        backgroundColor: "white",
        alignItems: "center",
    },

    deleteModalText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "gray",
        marginTop: "7%",
    },

    OkButton: {
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        height: "10%",
        width: "30%",
        marginTop : '30%',
        marginBottom  : '10%',
        borderRadius: 8,
    },

    OkButtonText: {
        fontSize: 15,
        fontWeight: "bold",
        color: COLORS.secondry,
    },
});

export default TaskModel;
