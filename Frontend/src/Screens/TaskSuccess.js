import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View ,StatusBar,Image} from 'react-native';
import { COLORS } from '../../assets/constants/constant';
import LottieView from 'lottie-react-native';

export default function TaskSuccess() {
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={COLORS.primary}/>

      <View style={{height : '50%' , width : '100%' , overflow: 'hidden' }} >
      <LottieView style={{ flex: 1 ,height : '100%' , width : '100%' }} source={require('../../assets/Animation - 1707893364144.json')} autoPlay loop />
      </View>
      

      <View style={{alignItems:'center' , height : '10%'}}>
        <Text style={styles.verifyStyle}>Task Creation</Text>
        <Text style={styles.verifyStyle}>Successful</Text>
      </View>


      <View style={{alignItems:'center'}}>
        <Text style={styles.verifyDescription}>Your task has been added to schedule.</Text>
        
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Go to schedule</Text>
      </TouchableOpacity>

      <Text style={styles.or}>OR</Text>

      <TouchableOpacity>
        <Text style={styles.btnText2}>Create New</Text>
      </TouchableOpacity>

    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary ,
    alignItems : 'center',
  },

  circle2: {
    width: 250,
    height: 250,
    borderRadius: 250/2,
    backgroundColor: '#ccb3ff'
  },

  circle: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
    backgroundColor: '#a64dff',
    justifyContent: 'center'
  },

  verifyStyle : {
    fontSize: 30,
    color : 'white',
    fontWeight : 'bold',
    paddingTop: 7
  },

  verifyDescription : {
    fontSize : 15,
    fontWeight: 'bold',
    marginTop : '7%',
    color : COLORS.third

  },

  btn : {
    marginTop : 130,
    height : '5%',
    backgroundColor : 'white',
    width : '70%',
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 10
  },

  btnText : {
    fontSize : 15,
    fontWeight : 'bold',
    color: COLORS.primary
  },
  
  or: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ccb3ff',
    padding: 19
  },

  btnText2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.secondry
  }
});
