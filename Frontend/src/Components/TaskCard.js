import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { Shadow } from "react-native-shadow-2";
import { COLORS } from "../../assets/constants/constant";
import { FontAwesome } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import moment from 'moment';

const TaskCard = ({ task }) => {

  const [starColor, setStarColor] = useState(COLORS.sixth);
  const progress = 0.9;
  const handleCardPress = () => {
    console.log('Card Pressed');
  };

  const handleStarPress = () => {
    setStarColor(starColor === COLORS.sixth ? COLORS.seventh : COLORS.sixth);
  };

  const startDate = new Date(task.startDate);

  const formattedStartDate = moment(startDate).format('YYYY  MMM  DD')
  console.log(formattedStartDate);




  return (

    <Shadow startColor={COLORS.eighth} style={{ marginBottom: '10%' }}>

      <TouchableOpacity onPress={handleCardPress} style={styles.cardContainer}>
        <Text style={styles.cardText}>{task.Title}</Text>
        <Text style={styles.cardSubText}>{task.taskType}</Text>



        <View style={styles.progressIcon}>
          <AntDesign name="bars" size={25} color="grey" marginTop={10} />
          <Text style={styles.progressText}>progress</Text>
          <Text style={styles.percentageText}>{progress * 100}%</Text>
        </View>




        <View style={{ marginTop: '5%' }}>
          <Progress.Bar progress={progress} width={300} height={12} borderRadius={10} borderColor={COLORS.nineth} unfilledColor={COLORS.nineth} color={COLORS.tenth} />
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{formattedStartDate}</Text>
        </View>

        <TouchableOpacity onPress={handleStarPress}>
          <FontAwesome name={starColor === COLORS.sixth ? 'star-o' : 'star'} size={24} color={starColor} marginLeft={270} marginTop={-23} />
        </TouchableOpacity>


      </TouchableOpacity>
    </Shadow>

  )
}



const styles = StyleSheet.create({

   cardContainer: {
    backgroundColor: COLORS.secondry,
    padding: '4.5%',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom : '1.5%'
  },
  cardSubText: {
    fontSize: 14,
    fontWeight: 'bold',
    color : COLORS.fourth,
  },

  progressIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
  },

  progressText: {
    color: COLORS.fourth,
    marginLeft: '2%',
    fontWeight: 'bold',
  },

  percentageText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.fourth,
    marginLeft: '60%'
  },

 
  labelContainer: {
    backgroundColor: COLORS.eleventh,
    alignItems : 'center',
    justifyContent : 'center',
    marginTop: '6%',
    padding: '2%',
    borderRadius: 5,
    width: '38%',
    height: 25
  },
  labelText: {
    color: COLORS.third,
    fontWeight: 'bold',
  }

})

export default TaskCard;