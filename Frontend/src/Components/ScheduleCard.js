import React from "react";
import { TouchableOpacity , Platform , Text ,  } from "react-native";


const ScheduleCard = ({ style, item  })=> {
    return (
      <TouchableOpacity
        style={{
          ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
          backgroundColor: item.color,
          borderRadius: 10,
          padding: "4%",
          width: "75%",
  
          ...(Platform.OS === 'ios'
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 3,
              }
            : {
                elevation: 12, // This is required for shadow on Android
              }),
  
      
          
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
          {item.title}
        </Text>
        
      </TouchableOpacity>
    );
  }



  export default ScheduleCard;