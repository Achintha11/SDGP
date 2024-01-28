import React from "react";
import { View , Text ,StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";



const UserPage =() =>{
    return(

        <View style={styles.container}>
            <Shadow style={styles.textWrapepr}>
                <Text style={styles.Text}>User</Text>
            </Shadow>
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
        borderRadius : 10,
        
      },
      Text :{
        fontSize : 30,
        fontWeight : 'bold',
        color : 'gray',
      }

})

export default UserPage;