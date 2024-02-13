import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import TaskCard from '../Components/TaskCard';
import { COLORS } from '../../assets/constants/constant';
import axios from 'axios';

const TaskPage = () => {
  const [searchText, setSearchText] = useState('');
  const [task, setTask] = useState([]);
  const apiUrl = 'http://192.168.1.5:8080/api/v1/tasks';

  useEffect(() => {
    function fetchData() {
      axios.get(apiUrl).then((response) => {
        setTask(response.data.tasks)
        console.log(response.data.tasks);
      })
        .catch((e) => {
          console.log(e);
        });

    };
    fetchData();

  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <View style={[styles.halfContainer, styles.purpleBackground]}>
        <Text style={styles.myTasksText}>My Tasks</Text>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={searchText.length === 0 ? 'Search' : ''}
            placeholderTextColor={COLORS.twelveth}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity style={styles.searchIconContainer}>
            <FontAwesome name="search" size={20} color={COLORS.twelveth} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.halfContainer, styles.whiteBackground]}>
        <View style={styles.innerGreyBackground}>
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <TaskCard
                task={item}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View>
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    height: '110%',
    width: '90%',
    borderRadius: 30,
    marginTop: '-7%',
    alignItems: 'center',
    paddingTop: "5%"


  },

  myTasksText: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.secondry,
    marginTop: '12%',
  },

  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10%',
    position: 'relative',
  },

  searchInput: {
    backgroundColor: COLORS.secondry,
    width: '85%',
    height: '55%',
    borderRadius: 20,
    paddingLeft: '5%',
    fontSize: 18,
  },

  searchIconContainer: {
    position: 'absolute',
    right: 20,
  },

});
export default TaskPage;