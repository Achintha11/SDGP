import React from "react";
import moment from "moment";
import Timetable from "react-native-calendar-timetable";
import { COLORS } from "../../assets/constants/constant";
import { useWindowDimensions } from "react-native";

import { useState, useEffect } from "react";
import ScheduleCard from "./ScheduleCard";

const ScheduleScreen1 = ({ selectedDate }) => {
  const [date] = useState(new Date());

  const [from] = React.useState(moment().subtract(2, "days").toDate());
  const [till] = React.useState(moment().add(2, "days").toISOString());
  const range = { from, till };

  
  const [items, setItems] = useState([
    {
      title: "OOP ",
      subTitle : "Sub Task 1",
      startDate: moment("2024-03-14T06:15:00").toDate(), // Set the start date and time for the new event (8:00 AM)
      endDate: moment("2024-03-14T08:45:00").toDate(), // Set the end date and time (10:30 AM)
      color: "#0A014F",
    },
    {
      title: "Algo", // Change this to your desired event title
      subTitle : "Sub Task 1",
      startDate: moment("2024-03-15T10:15:00").toDate(), // Set the start date and time for the new event (8:00 AM)
      endDate: moment("2024-03-15T11:45:00").toDate(), // Set the end date and time (10:30 AM)
      color: "#DB2B39",
    },

    {
      title: "Server Side", // Change this to your desired event title
      subTitle : "Sub Task 1",
      startDate: moment("2024-03-14T12:00:00").toDate(), // Set the start date and time for the new event (8:00 AM)
      endDate: moment("2024-03-14T13:00:00").toDate(), // Set the end date and time (10:30 AM)
      color: "#F58A07",
    },

    {
      title: "4th Event", // Change this to your desired event title
      subTitle : "Sub Task 1",
      startDate: moment("2024-03-14T14:30:00").toDate(), // Set the start date and time for the new event (8:00 AM)
      endDate: moment("2024-03-14T16:30:00").toDate(), // Set the end date and time (10:30 AM)
      color: "#45503B",
    },
  ]);

  const { width } = useWindowDimensions();

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const filtered = items.filter((item) => {
      const startDateMoment = moment(item.startDate);
      const selectedDateMoment = moment(selectedDate);

      // Enhanced filtering for multi-day events and events ending on selected date
      return startDateMoment.isSame(selectedDateMoment, "day");
    });

    setFilteredItems(filtered);
  }, [selectedDate]);

  return (
    <Timetable
      width={"60%"}
      columnWidth={width}
      // these two are required
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
          backgroundColor : COLORS.third
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

        timeContainer : {
            backgroundColor : COLORS.third
          }
      }}
    />
  );
};

export default ScheduleScreen1;
