import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, StatusBar, SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import TaskCard from "../Components/TaskCard";
import TaskModel from "../Components/TaskModal";
import axios from "axios";
import { COLORS } from "../../assets/constants/constant";
import { apiUrl } from "../../assets/constants/constant";
const TaskPage = () => {
  const [searchText, setSearchText] = useState("");

  const [tasks, setTask] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  const openModal = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  useEffect(() => {
    function fetchData() {
      axios
        .get(apiUrl.get)
        .then((response) => {
          setTask(response.data.tasks);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#805AD1" barStyle={"light-content"} />
      <View style={[styles.halfContainer, styles.purpleBackground]}>
        <Text style={styles.myTasksText}>My Tasks</Text>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={searchText.length === 0 ? "Search" : ""}
            placeholderTextColor="#D6C9FF"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />

          <TouchableOpacity style={styles.searchIconContainer}>
            <FontAwesome
              name="search"
              size={20}
              color="#D6C9FF"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.halfContainer, styles.whiteBackground]}>
        <View style={styles.innerGreyBackground}>
          <FlatList
            style={{ width: '95%', height: '110%' }}

            contentContainerStyle={{ alignItems: 'center' }}
            showsVerticalScrollIndicator={false}
            data={tasks}
            renderItem={({ item }) => <TaskCard task={item} onTaskCardPress={openModal} />}
            keyExtractor={(item) => item._id}
          />

          <TaskModel
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            task={selectedTask}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.primary,
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  purpleBackground: {
    backgroundColor: COLORS.primary,
    flex: 0.35,
  },
  whiteBackground: {
    backgroundColor: COLORS.secondry,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center'
  },
  innerGreyBackground: {
    backgroundColor: COLORS.third,
    height: "110%",
    width: "90%",
    borderRadius: 30,
    marginTop: -40,
    alignItems: "center",
    paddingBottom: "10%",
    paddingTop: "3%",
  },

  myTasksText: {
    fontSize: 30,
    fontWeight: "700",
    color: "white",
    marginTop: '5%'
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: '10%',
    position: "relative",
  },
  searchInput: {
    backgroundColor: "white",
    width: '85%',
    height: '40%',
    borderRadius: 20,
    paddingLeft: '5%',
    fontSize: 18,
  },

  searchIconContainer: {
    position: "absolute",
    right: '5%',
  },
  searchIcon: {},

});

export default TaskPage;