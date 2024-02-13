import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { Shadow } from 'react-native-shadow-2';
import { COLORS } from "../../assets/constants/constant";


const TaskCard = ({task}) => {
  const progress = 20;
  const [starColor, setStarColor] = useState(COLORS.sixth);
  

  const handleCardPress = () => {
    console.log('Card Pressed');
  };

  const handleStarPress = () => {
    setStarColor(starColor === COLORS.sixth ? COLORS.seventh : COLORS.sixth);
  };



  return (
    <Shadow startColor={COLORS.eighth} disabled={false} distance={11} style={styles.shadowStyle}>
      <TouchableOpacity onPress={handleCardPress} style={styles.cardContainer} >
        <Text style={styles.cardText}>{task.Title}</Text>
        <Text style={styles.cardSubText}>Exam</Text>

        <View style={styles.progressIcon}>
          <AntDesign name="bars" size={25} color={COLORS.fourth} marginTop={'3%'} />
          <Text style={styles.progressText}>progress</Text>
          <Text style={styles.percentageText}>{progress}%</Text>
        </View>

        <View style={{ marginTop: '5%' }}>
          <Progress.Bar progress={0.3} width={300} height={12} borderRadius={10} borderColor={COLORS.nineth} unfilledColor={COLORS.nineth} color={COLORS.tenth} />
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}> 01 January 2024 </Text>
        </View>

        <TouchableOpacity onPress={handleStarPress}>
          <FontAwesome name={starColor === COLORS.sixth ? 'star-o' : 'star'} size={24} color={starColor} marginLeft={270} marginTop={-23} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Shadow>
  );
}

const styles = StyleSheet.create({

shadowStyle:{
  marginBottom:"10%",
  borderRadius:20
  },

  cardContainer: {
    backgroundColor: COLORS.secondry,
    padding: '4%',
    borderRadius: 10,
    width: '100%',
    marginLeft:'3%'
  },
  cardText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.sixth,
  },
  cardSubText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.fourth,
  },
  progressIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4%',
  },
  progressText: {
    color: COLORS.fourth,
    marginLeft: '2%',
    marginTop: '2%',
    fontWeight: 'bold',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.fourth,
    marginLeft: '58%',
    marginTop:'3%'
  },
  labelContainer: {
    backgroundColor: COLORS.eleventh,
    marginTop: '5%',
    padding: '2%',
    borderRadius: 5,
    width: '100%',
    height: 25
  },
  labelText: {
    color: COLORS.secondry,
    fontWeight: 'bold',
    
  }
});

export default TaskCard;
