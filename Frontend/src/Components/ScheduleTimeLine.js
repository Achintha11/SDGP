import React from "react";
import moment from "moment";
import Timetable from "react-native-calendar-timetable";
import { COLORS, apiUrl } from "../../assets/constants/constant";
import { useWindowDimensions } from "react-native";

import { View, Text } from "react-native"; // Import View and Text from react-native


import { useState, useEffect } from "react";
import ScheduleCard from "./ScheduleCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import "moment-timezone";


function YourComponent({item}) {
  return (
      <View style={{
          ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
          backgroundColor: 'red',
          borderRadius: 10,
          elevation: 5,
      }}>
          <Text>{item.name}</Text>
          <Text>2022</Text>
      </View>
  );
}

const ScheduleScreen1 = ({ selectedDate }) => {

  

  const [isDataFetched, setIsDataFetched] = useState(false);



  const [date] = useState(new Date());

  const { width } = useWindowDimensions();
  const [filteredItems, setFilteredItems] = useState([]);


  const [items, setItems] = React.useState([])

  //   {
  //     title: "OOP ",
  //     subTitle : "Sub Task 1",
  //     startDate: moment("2024-03-16T06:15:00").toDate(), // Set the start date and time for the new event (8:00 AM)
  //     endDate: moment("2024-03-16T08:45:00").toDate(), // Set the end date and time (10:30 AM)
  //     color: "#0A014F",
  //   },
  //   {
  //     title: "Algo", // Change this to your desired event title
  //     subTitle : "Sub Task 1",
  //     startDate: moment("2024-03-15T10:15:00").toDate(), // Set the start date and time for the new event (8:00 AM)
  //     endDate: moment("2024-03-15T11:45:00").toDate(), // Set the end date and time (10:30 AM)
  //     color: "#DB2B39",
  //   },

  //   {
  //     title: "Server Side", // Change this to your desired event title
  //     subTitle : "Sub Task 1",
  //     startDate: moment("2024-03-14T12:00:00").toDate(), // Set the start date and time for the new event (8:00 AM)
  //     endDate: moment("2024-03-14T13:00:00").toDate(), // Set the end date and time (10:30 AM)
  //     color: "#F58A07",
  //   },

  //   {
  //     title: "4th Event", // Change this to your desired event title
  //     subTitle : "Sub Task 1",
  //     startDate: moment("2024-03-14T14:30:00").toDate(), // Set the start date and time for the new event (8:00 AM)
  //     endDate: moment("2024-03-14T16:30:00").toDate(), // Set the end date and time (10:30 AM)
  //     color: "#45503B",
  //   },
  // ]);

  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(apiUrl.getSubTasks);
        const fetchedItems = response.data.subTasks.map(item => ({
          ...item,
          startDate: moment(item.startTime).toDate(), // Parse startTime using Moment.js
          endDate: moment(item.endTime).toDate() // Parse endTime using Moment.js, assuming you have an endTime property
        }));
        setItems(fetchedItems);
        setIsDataFetched(true);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, [selectedDate]);


  
  useEffect(() => {
    const filtered = items.filter((item) => {
      
      const startDateMoment = moment(item.startTime)
      const selectedDateMoment = moment(selectedDate)
      console.log("====================================================");

      console.log("startDateMoment " ,startDateMoment);
      console.log("selected " , selectedDateMoment);
      console.log(startDateMoment.isSame(selectedDateMoment, "day")
      );
      console.log("==============================================================");
     return startDateMoment.isSame(selectedDateMoment, "day"); 

    });


    setFilteredItems(filtered);
    
  }, [selectedDate]);


  console.log(filteredItems);


    return (
      isDataFetched && (
        <Timetable
          width={"60%"}
          columnWidth={width}
          items={filteredItems}
          renderItem={(props) => <ScheduleCard {...props} />}
          date={selectedDate}
          scrollViewProps={{
            horizontal: false,
            showsVerticalScrollIndicator: false,
          }}
          style={{
            container: {
              borderRadius: 5,
              backgroundColor: COLORS.third,
            },
            lines: {
              opacity: 0.3,
            },
            nowLine: {
              dot: {
                backgroundColor: COLORS.primary,
                width: 10,
                height: 10,
              },
              line: {
                backgroundColor: COLORS.primary,
                height: 2,
              },
            },
            time: {
              color: "gray",
              fontWeight: "bold",
            },
            timeContainer: {
              backgroundColor: COLORS.third,
            },
          }}
        />
      )
    );
  };

export default ScheduleScreen1;
      
      
      
