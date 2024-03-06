import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";
import { COLORS } from "../../assets/constants/constant";
import { FontAwesome } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import moment from "moment";

const TaskCard = ({ task , onTaskCardPress }) => {
  const [starColor, setStarColor] = useState(COLORS.sixth);
  const progress = 0.9;
  

  const handleStarPress = () => {
    setStarColor(starColor === COLORS.sixth ? COLORS.seventh : COLORS.sixth);
  };

  const startDate = new Date(task.startDate);

  const formattedStartDate = moment(startDate).format("YYYY  MMM  DD");

  return (
    <Shadow
      startColor={COLORS.eighth}
      containerStyle={{marginVertical : '5%' }}
    >
      <TouchableOpacity onPress={()=>onTaskCardPress(task)} style={styles.cardContainer}>
        <View>
          <Text style={styles.cardText}>{task.Title}</Text>
          <Text style={styles.cardSubText}>{task.taskType}</Text>
        </View>

        <View style={styles.progressIcon}>
          <AntDesign name="bars" size={25} color="grey" />
          <Text style={styles.progressText}>progress</Text>
          <Text style={styles.percentageText}>{progress * 100}%</Text>
        </View>

        <View style={{ marginTop: "5%",width : '100%' }}>
          <Progress.Bar
            progress={progress}
            width={280}
            height={12}
            borderRadius={10}
            borderColor={COLORS.nineth}
            unfilledColor={COLORS.nineth}
            color={COLORS.tenth}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "5%",
          }}
        >
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{formattedStartDate}</Text>
          </View>

          <TouchableOpacity onPress={handleStarPress}>
            <FontAwesome
              name={starColor === COLORS.sixth ? "star-o" : "star"}
              size={24}
              color={starColor}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.secondry,
    borderRadius: 10,
    paddingHorizontal : '4%',
    paddingVertical : '4%',
    minWidth : 300
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "1.5%",
  },
  cardSubText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.fourth,
  },

  progressIcon: {
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
  },

  progressText: {
    color: COLORS.fourth,
    fontWeight: "bold",
  },

  percentageText: {
    marginStart: "45%",
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.fourth,
  },

  labelContainer: {
    backgroundColor: COLORS.eleventh,
    alignItems: "center",
    justifyContent: "center",
    padding: "1%",
    borderRadius: 5,
    width: "35%",
    height: 26,
  },
  labelText: {
    color: COLORS.third,
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default TaskCard;