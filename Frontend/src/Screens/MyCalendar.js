import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment"; // Import moment library
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../assets/constants/constant";

import axios from "axios";











const Calendar1 = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [sleepStartTime, setSleepStartTime] = useState(new Date());
  const [sleepEndTime, setSleepEndTime] = useState(new Date());
  const [workStartTime, setWorkStartTime] = useState(new Date());
  const [workEndTime, setWorkEndTime] = useState(new Date());
  const [showWorkStartTimePicker, setShowWorkStartTimePicker] = useState(false);
  const [showWorkEndTimePicker, setShowWorkEndTimePicker] = useState(false);
  const [showSleepStartTimePicker, setShowSleepStartTimePicker] =
    useState(false);
  const [showSleepEndTimePicker, setShowSleepEndTimePicker] = useState(false);

  

  const handleWorkStartTimeChange = (event, selected) => {
    if (selected) {
      setWorkStartTime(selected);
      setShowWorkStartTimePicker(false);
    }
  };

  const handleWorkEndTimeChange = (event, selected) => {
    if (selected) {
      setWorkEndTime(selected);
      setShowWorkEndTimePicker(false);
    }
  };

  const handleSleepStartTimeChange = (event, selected) => {
    if (selected) {
      setSleepStartTime(selected);
      setShowSleepStartTimePicker(false);
    }
  };

  const handleSleepEndTimeChange = (event, selected) => {
    if (selected) {
      setSleepEndTime(selected);
      setShowSleepEndTimePicker(false);
    }
  };

  const toggleWorkStartTimePicker = () => {
    setShowWorkStartTimePicker(true);
  };

  const toggleWorkEndTimePicker = () => {
    setShowWorkEndTimePicker(true);
  };

  const toggleSleepStartTimePicker = () => {
    setShowSleepStartTimePicker(true);
  };

  const toggleSleepEndTimePicker = () => {
    setShowSleepEndTimePicker(true);
  };

  const handleDayPress = (day) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
    } else {
      setSelectedEndDate(day.dateString);
    }
  };

  const handleSave = async ()  => {
    const formattedScheduleData = [];
    const startDate = moment(selectedStartDate);
    const endDate = moment(selectedEndDate || selectedStartDate);

    while (endDate.isSameOrAfter(startDate)) {
      formattedScheduleData.push({
        date: moment(startDate),
        sleepStart: moment(startDate)
          .set("hour", sleepStartTime.getHours())
          .set("minute", sleepStartTime.getMinutes()),
        sleepEnd: moment(startDate)
          .set("hour", sleepEndTime.getHours())
          .set("minute", sleepEndTime.getMinutes()),
        workStart: moment(startDate)
          .set("hour", workStartTime.getHours())
          .set("minute", workStartTime.getMinutes()),
        workEnd: moment(startDate)
          .set("hour", workEndTime.getHours())
          .set("minute", workEndTime.getMinutes()),
      });
      startDate.add(1, "day");
    }


    console.log(formattedScheduleData);
    try {
        const response = await axios.post('http://10.31.1.77:8080/api/v1/scheduleData/', formattedScheduleData);
        console.log('Schedule data sent successfully:', response.data);
      } catch (error) {
        console.error('Error sending schedule data:', error);
      }
  };

  const calendarTheme = {
    textDayFontSize: 19,
    textDayFontWeight: 300,
    textDayHeaderFontSize: 17,
    textDayHeaderFontWeight: 600,
    textSectionTitleColor: COLORS.primary,
  };

  const markedDates = {};

  if (selectedStartDate && selectedEndDate) {
    const startDate = new Date(selectedStartDate);
    const endDate = new Date(selectedEndDate);

    console.log(startDate, endDate);

    const range = {};
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split("T")[0];
      range[dateString] = {
        startingDay: currentDate.getTime() === startDate.getTime(),
        endingDay: currentDate.getTime() === endDate.getTime(),
        color: COLORS.primary,
        textColor: "white",
      };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Add the range to markedDates
    Object.assign(markedDates, range);

    // Change the color of dates between start and end date
    let tempDate = new Date(startDate);
    tempDate.setDate(tempDate.getDate() + 1);
    while (tempDate < endDate) {
      const dateString = tempDate.toISOString().split("T")[0];
      markedDates[dateString] = {
        color: "#b996f2", // Change the color here
        textColor: "white",
      };
      tempDate.setDate(tempDate.getDate() + 1);
    }
  } else if (selectedStartDate) {
    markedDates[selectedStartDate] = {
      selected: true,
      color: COLORS.primary,
      textColor: "white",
    };
  }

  return (
    <SafeAreaView style={styles.background1}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.background2}>
        <Text style={styles.b2Text}>My Calendar</Text>
      </View>
      <SafeAreaView style={styles.background3}>
        <View style={styles.background4}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markingType={"period"}
              theme={calendarTheme}
              markedDates={markedDates}
            />
          </View>

          <View style={styles.labelView}>
            <View style={styles.labelContainer}>

            
              {/*///////////////////////////////////////////////////////////////////////////////////////////// */}

              {/* Sleep Start Time Picker */}

              <View style={{ height: "20%", flexDirection : 'row' , justifyContent : 'space-around' }}>
                <MaterialIcons
                  name="work"
                  size={24}
                  color={"#b996f2"}
                  style={{ marginLeft: "3%" }}
                />

                <Text style={{fontSize : 15 ,fontWeight : 'bold' ,color : 'gray'}}>
                  Sleep Start
                </Text>
                <TouchableOpacity
                  style={styles.labelItem}
                  onPress={toggleSleepStartTimePicker}
                >
                  <Text style={styles.labelText}>
                    {moment(sleepStartTime).format("hh:mm A")}
                  </Text>
                </TouchableOpacity>
                {showSleepStartTimePicker && (
                  <DateTimePicker
                    value={sleepStartTime} // Use null or new Date() as initial value
                    mode="time"
                    onChange={handleSleepStartTimeChange}
                    display="default"
                    is24Hour={true}
                  />
                )}
              </View>

              {/*///////////////////////////////////////////////////////////////////////////////////////////// */}

              
              {/*///////////////////////////////////////////////////////////////////////////////////////////// */}

              {/* Sleep end Time Picker */}

              <View style={{ height: "20%", flexDirection : 'row' , justifyContent : 'space-around' }}>
                <MaterialIcons
                  name="work"
                  size={24}
                  color={"#b996f2"}
                  style={{ marginLeft: "3%" }}
                />

                <Text style={{fontSize : 15 ,fontWeight : 'bold' ,color : 'gray'}}>
                  Sleep End
                </Text>
                <TouchableOpacity
                  style={styles.labelItem}
                  onPress={toggleSleepEndTimePicker}
                >
                  <Text style={styles.labelText}>
                    {moment(sleepEndTime).format("hh:mm A")}
                  </Text>
                </TouchableOpacity>
                {showSleepEndTimePicker && (
                  <DateTimePicker
                    value={sleepEndTime} // Use null or new Date() as initial value
                    mode="time"
                    onChange={handleSleepEndTimeChange}
                    display="default"
                    is24Hour={true}
                  />
                )}
              </View>

              {/*///////////////////////////////////////////////////////////////////////////////////////////// */}



              {/*///////////////////////////////////////////////////////////////////////////////////////////// */}

              {/* Work Start Time Picker */}

              <View style={{ height: "20%", flexDirection : 'row' , justifyContent : 'space-around' }}>
                <MaterialIcons
                  name="work"
                  size={24}
                  color={"#b996f2"}
                  style={{ marginLeft: "3%" }}
                />

                <Text style={{fontSize : 15 ,fontWeight : 'bold' ,color : 'gray'}}>
                  Work Start
                </Text>
                <TouchableOpacity
                  style={styles.labelItem}
                  onPress={toggleWorkStartTimePicker}
                >
                  <Text style={styles.labelText}>
                    {moment(workStartTime).format("hh:mm A")}
                  </Text>
                </TouchableOpacity>
                {showWorkStartTimePicker && (
                  <DateTimePicker
                    value={workStartTime} // Use null or new Date() as initial value
                    mode="time"
                    onChange={handleWorkStartTimeChange}
                    display="default"
                    is24Hour={true}
                  />
                )}
              </View>

              {/*///////////////////////////////////////////////////////////////////////////////////////////// */}

              
              {/*///////////////////////////////////////////////////////////////////////////////////////////// */}

              {/* Work End Time Picker */}

              <View style={{ height: "20%", flexDirection : 'row' , justifyContent : 'space-around' }}>
                <MaterialIcons
                  name="work"
                  size={24}
                  color={"#b996f2"}
                  style={{ marginLeft: "3%" }}
                />

                <Text style={{fontSize : 15 ,fontWeight : 'bold' ,color : 'gray'}}>
                  Work End
                </Text>
                <TouchableOpacity
                  style={styles.labelItem}
                  onPress={toggleWorkEndTimePicker}
                >
                  <Text style={styles.labelText}>
                    {moment(workEndTime).format("hh:mm A")}
                  </Text>
                </TouchableOpacity>
                {showWorkEndTimePicker && (
                  <DateTimePicker
                    value={workEndTime} 
                    mode="time"
                    onChange={handleWorkEndTimeChange}
                    display="default"
                    is24Hour={true}
                  />
                )}
              </View>

              {/*///////////////////////////////////////////////////////////////////////////////////////////// */}

              





              
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background1: {
    flex: 1,
    backgroundColor: COLORS.secondry,
  },
  background2: {
    flex: 0.12,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 100,
    padding: 10,
    alignItems: "center",
  },
  b2Text: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: "6%",
    color: COLORS.third,
  },
  background3: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  background4: {
    flex: 1,
    backgroundColor: COLORS.secondry,
    borderTopRightRadius: 60,
    alignItems: "center",
  },
  calendarContainer: {
    width: "90%",
    marginTop: "4%",
  },
  timesContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  timeText: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: "50%",
  },

  labelView: {
    alignItems: "center",
    width: "100%",
    height: "34%",
    marginTop: "4%",
  },
  labelContainer: {
    backgroundColor: "#f0eded",
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: "100%",
    width: "97%",
    borderRadius: 30,
  },
  labelItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  labelText: {
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 17,
    fontWeight: "700",
    marginLeft: "6%",
    color: "#707070",
  },
  timepickerContainer: {
    flex: 1,
    marginRight: "10%",
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "30%",
    marginBottom: "5%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default Calendar1;