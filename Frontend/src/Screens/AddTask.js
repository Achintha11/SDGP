import { SafeAreaView, StyleSheet, Text, View,StatusBar, ScrollView, Button } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { TouchableOpacity } from 'react-native';
import Form from '../Components/Form'

import { COLORS } from '../../assets/constants/constant';


const AddTask =() => {

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'}/>
      
            <Text style={styles.header}> New Task</Text>


              <View style = {styles.wrapper}>

                  <Shadow distance={20} stretch={true} offset={[0 ,-60]} style={styles.shadowWrapper}>
                    <Form/>
                  </Shadow>

              </View>



        </SafeAreaView>

    )


}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
      
    },
  
    header :{
      fontSize : 30,
      marginTop : 30,
      fontWeight : '900',
      color : 'white',
      marginLeft : 20
  
    },
  
    wrapper : {
  
      marginTop : '20%',
      flex :1,
      backgroundColor : COLORS.secondry,
      borderTopLeftRadius : 30,
      borderTopRightRadius : 30,
      padding : '5%',
      position : 'fixed',
  
    },
  
  
  
    shadowWrapper : {
      height : '105%',
      width : '100%',
      backgroundColor : COLORS.third,
      position : 'relative',
      top : -60,
      borderRadius : 20,
      padding : '3%',
    
      
    },

    form : {

      height : '82%'

    },

    btnContainer:{

      alignItems : 'center'

    },

    btn :{
      width : '90%',
      alignItems : 'center',
      justifyContent : 'center',
      height : '25%',
      backgroundColor : COLORS.primary,
      borderRadius : 20
    },

    btnText : {
      color : COLORS.third,
      fontSize : 15,
      fontWeight : 'bold'
    }





    
});    

export default AddTask;