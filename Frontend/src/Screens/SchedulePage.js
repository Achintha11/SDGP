import React from "react";
import { View , Text ,StyleSheet } from "react-native";



const SchedulePage =() =>{
    return(

        <View style={styles.container}>
            <View style={styles.textWrapepr}>
                <Text style={styles.Text}>Schedule</Text>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        paddingTop : '70%',
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems : 'center',
      },
      textWrapepr :{
        height : 60,
        width : 200,
        backgroundColor : 'white',
        alignItems : 'center',
        justifyContent : 'center',
        elevation : 10,
        borderRadius : 10
        
      },
      Text :{
        fontSize : 30,
        fontWeight : 'bold',
        color : 'gray'
      }
})

export default SchedulePage;