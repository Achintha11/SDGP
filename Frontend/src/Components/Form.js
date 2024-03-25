import React from "react";
import { View, Text, TextInput, picker, Button, LogBox } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

import { COLORS } from "../../assets/constants/constant";
import { useState } from "react";
import { Shadow } from "react-native-shadow-2";

import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";

import DateTimePicker from "@react-native-community/datetimepicker";

import axios from "axios";

import { apiUrl } from "../../assets/constants/constant";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

import ColorPicker, { Swatches } from "reanimated-color-picker";
import { Alert } from "react-native";

const Form = () => {
  const navigation = useNavigation();
  const [Title, setTitle] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [description, setDescription] = useState("");

  const [selectedTaskType, setselectedTaskType] = useState();
  const [selectedPriorityLevel, setSelectedPriorityLevel] = useState();

  const [startDate, setStartDate] = useState(new Date());
  const [startDateshow, setStartDateShow] = useState(false);

  const [dueDate, setDueDate] = useState(new Date());
  const [dueDateshow, setdueDateShow] = useState(false);

  const [errors, setErrors] = useState({});
  const [color, setColor] = useState("");

  const formattedStartDate = startDate.toISOString();
  const formattedDueDate = dueDate.toISOString();

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDateShow(false);

    const newDate = new Date(currentDate);
    newDate.setHours(0, 0, 0, 0);

    setStartDate(newDate);
    console.log(newDate);
  };

  const onChangeDueDate = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate; // If no date is selected, use the current date
    setdueDateShow(false);

    // Reset the time part of the selected date to 00:00
    const newDate = new Date(currentDate);
    newDate.setHours(0, 0, 0, 0);

    setDueDate(newDate); // Set the selected date with time set to 00:00
  };

  const showStartDatepicker = () => {
    setStartDateShow(true);
  };

  const showDueDatepicker = () => {
    setdueDateShow(true);
  };

  const validateForm = () => {
    let errors = {};

    if (!Title) errors.Title = "Title is required";
    if (!workHours) errors.workHours = "Expected hours to work is required";
    if (!selectedTaskType) errors.selectedTaskType = "Task type is required";
    if (!selectedPriorityLevel)
      errors.selectedPriorityLevel = "Priority level is required";
    if (!startDate) errors.startDate = "Start date is required";
    if (!dueDate) errors.dueDate = "Due date is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    const userData = await AsyncStorage.getItem("userData");
    const parsedUserData = JSON.parse(userData);
    const uid = parsedUserData.uid;

    if (validateForm()) {
      let formData = {
        uid: uid,
        Title: Title,
        startDate: startDate,
        dueDate: dueDate,
        workHours: workHours,
        taskType: selectedTaskType,
        priorityLevel: selectedPriorityLevel,
        description: description,
        color: color,
        completed : false,
        progress : 0,
      };
      try {
        const response = await axios.post(apiUrl.get, formData);
        navigation.navigate("TaskAdded");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const onSelectColor = ({ hex }) => {
    // do something with the selected color.
    setColor(hex);
  };

  console.log(color);

  const swatchesColors = [
    "#F58A07",
    "#1d728a",
    "#161d82",
    "#114717",
    "#473411",
    "#c9100a",
    "#20c90a",
    "#b31084",
    "#14c3c9",
    "#7c0bb5",
  ];

  const checkScheduleData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData);
      const uid = parsedUserData.uid;

      const response = await axios.post(
        apiUrl.checkSchedule+ uid,
        {
          startDate: formattedStartDate,
          endDate: formattedDueDate,
        }
      );

      console.log(response.data);

      if (response.data.exists) {
        // If schedule data exists, proceed with adding the task
        handleSubmit();
      } else {
        Alert.alert(
          "Error",
          "No schedule data found. Please set schedule data first.",
          [
            {
              text: "Set Schedule Data",
              onPress: () => navigation.navigate("calendar"),
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error("Error checking schedule data:", error);
      Alert.alert(
        "Error",
        "An error occurred while checking schedule data. Please try again later."
      );
    }
  };

  return (
    <View>
      <View style={styles.form}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.ScrollView}
        >
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.formText}>Title</Text>
            <TextInput
              value={Title}
              onChangeText={setTitle}
              style={styles.textInput}
              placeholder="Enter Task Title"
            />
            {errors.Title ? (
              <Text style={styles.errorText}>{errors.Title}</Text>
            ) : null}
          </View>

          <View style={{ marginBottom: 5 }}>
            <Text style={styles.formText}>Start Date</Text>

            <TouchableOpacity
              onPress={showStartDatepicker}
              style={styles.dateContainer}
            >
              <Text style={styles.dateText}>{startDate.toDateString()}</Text>
              {startDateshow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startDate}
                  mode="date"
                  is24Hour={true}
                  onChange={onChangeStartDate}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 5 }}>
            <Text style={styles.formText}>Due Date</Text>

            <TouchableOpacity
              onPress={showDueDatepicker}
              style={styles.dateContainer}
            >
              <Text style={styles.dateText}>{dueDate.toDateString()}</Text>
              {dueDateshow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dueDate}
                  mode="date"
                  is24Hour={true}
                  onChange={onChangeDueDate}
                />
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              marginTop: 10,
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.formText}>Task Type</Text>

              <RNPickerSelect
                itemStyle={pickerSelectStyles.itemText}
                useNativeAndroidPickerStyle={false}
                fixAndroidTouchableBug={false}
                placeholder={{ label: "Select  Type... ", value: null }}
                style={pickerSelectStyles}
                onValueChange={(value) => setselectedTaskType(value)}
                items={[
                  { label: "📝  Exam", value: "Exam" },
                  { label: "📑  Assignment", value: "Assignment" },
                  { label: "📚 Coursework", value: "CW" },
                  { label: "👨🏼‍💻    Self study", value: "Self study" },
                  { label: "⭐    Other", value: "Other" },
                ]}
              />

              {errors.selectedTaskType ? (
                <Text style={styles.errorText}>{errors.selectedTaskType}</Text>
              ) : null}
            </View>

            <View>
              <Text style={styles.formText}>Priority Level</Text>

              <RNPickerSelect
                itemStyle={pickerSelectStyles.itemText}
                useNativeAndroidPickerStyle={false}
                fixAndroidTouchableBug={false}
                placeholder={{ label: "Select  level.. ", value: null }}
                style={pickerSelectStyles}
                onValueChange={(value) => setSelectedPriorityLevel(value)}
                items={[
                  { label: "🔴   High", value: "High" },
                  { label: "📙    Medium", value: "Medium" },
                  { label: "📗    Low", value: "Low" },
                ]}
              />
              {errors.selectedPriorityLevel ? (
                <Text style={styles.errorText}>
                  {errors.selectedPriorityLevel}
                </Text>
              ) : null}
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.formText}>Expected Hours</Text>
            <TextInput
              value={workHours}
              onChangeText={setWorkHours}
              style={styles.textInput}
              placeholder="Enter Expecting Hours to Work"
            />
            {errors.workHours ? (
              <Text style={styles.errorText}>{errors.workHours}</Text>
            ) : null}
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.formText}>Description</Text>
            <ScrollView>
              <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.textInput}
                placeholder="Enter Additional Notes Here.."
                multiline
                numberOfLines={4}
              />
            </ScrollView>
          </View>

          <View
            style={{
              height: "8%",
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.formText}> Select a Color</Text>
            </View>
            <View style={[styles.colorIndicator, { backgroundColor: color }]} />
          </View>

          <View
            style={{
              flex: 1,
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <ColorPicker
              style={{
                width: "90%",
                alignItems: "center",
                height: "40%",
                marginTop: 10,
              }}
              value="red"
              onComplete={onSelectColor}
            >
              <Swatches
                swatchStyle={{ height: 20, width: 40, borderRadius: 5 }}
                colors={swatchesColors}
              />
            </ColorPicker>
          </View>
        </ScrollView>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={checkScheduleData}>
          <Text style={styles.btnText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  colorIndicator: {
    marginLeft: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: "center",
  },

  form: {
    height: "80%",
    padding: "1%",
  },

  btnContainer: {
    alignItems: "center",
  },

  btn: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    height: "24%",
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },

  btnText: {
    color: COLORS.third,
    fontSize: 17,
    fontWeight: "bold",
  },

  textInput: {
    borderWidth: 0.5,
    borderColor: "gray",
    padding: 8,
    backgroundColor: COLORS.third,
    flex: 1,
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },

  scrollView: {
    height: "100%",
  },

  formText: {
    color: "gray",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
  },

  pickerStyle: {
    height: 50,
    width: 150,
    borderRadius: 10,
    backgroundColor: COLORS.secondry,
  },

  dateContainer: {
    borderWidth: 0.3,
    padding: 12,
    borderRadius: 10,
    borderColor: COLORS.fourth,
  },

  dateText: {
    fontSize: 15,
  },

  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 45,
    width: 150,
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.3,
    borderColor: "gray",
    borderRadius: 10,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    height: 45,
    width: 150,
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.3,
    borderColor: "gray",
    borderRadius: 10,
    color: "black",
    paddingRight: 30,
  },

  itemText: {
    fontSize: 20,
    padding: 50,
  },
});

export default Form;
