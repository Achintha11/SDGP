import React from "react";
import { TouchableOpacity, Platform, Text } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook
import { duration } from "moment";

const ScheduleCard = ({ style, item }) => {

  console.log(item);
  const navigation = useNavigation(); // Initialize the navigation hook

  const handleScheduleCardPress = () => {
    console.log(item);

    const isoStartDate = item.startDate.toISOString();
    const isoEndDate = item.endDate.toISOString();
    navigation.navigate("SubTaskSession", {
      startDate: isoStartDate,
      endDate: isoEndDate,
      title : item.title,
      color : item.color,
      _id : item._id,
      duration : item.duration
    });
  };
  return (

    
    <TouchableOpacity
      onPress={handleScheduleCardPress}
      style={{
        ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
        backgroundColor: item.color,
        borderRadius: 10,
        padding: "4%",
        width: "75%",

        ...(Platform.OS === "ios"
          ? {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
            }
          : {
              elevation: 12, // This is required for shadow on Android
            }),
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 , marginBottom : 5 }}>
        {item.name}
      </Text>

      <Text style={{ color: "white", fontSize: 12 }}>
      </Text>
    </TouchableOpacity>
  );
};

export default ScheduleCard;
