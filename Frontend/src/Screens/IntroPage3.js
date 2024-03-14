import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from 'react-native';
const StudyMateImage = require('../../assets/StudyMateLogo.png');
import { COLORS } from '../../assets/constants/constant';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function IntroPage3() {

  const navigation = useNavigation(); // Initialize navigation object

  const handleSignUpPress = () => {
    // Navigate to SignUpScreen when Sign Up button is pressed
    navigation.navigate('SignUpScreen');
  };

  const handleSigninPress = () => {
    navigation.navigate('SignInScreen')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.secondry} />
      <View style={styles.box1} >
        <Image source={StudyMateImage} style={styles.StudyMateLogo} />
        <Text style={styles.studymate}>StudyMate</Text>
        <Text style={styles.timetask}>TIME & TASK MANAGEMENT APP</Text>
      </View>

      <View style={styles.box2}>
        <Text style={styles.Description}>Schedule Your</Text>
        <Text style={styles.Description}>Task  &  Projects</Text>
        <Text style={styles.Description}>Easily!</Text>

        <TouchableOpacity onPress={handleSignUpPress} style={styles.btn1}>
          <Text style={styles.btnText1}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSigninPress} style={styles.btn2}>
          <Text style={styles.btnText2}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondry,
    alignItems: 'center'
  },

  StudyMateLogo: {
    height: '75%',
    width: '100%',
    alignItems: 'center',
    resizeMode: 'contain',
  },

  box1: {
    height: '50%',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: 15
  },

  studymate: {
    fontSize: 35,
    color: 'gray',
    fontWeight: 'bold',
    marginTop: -60
  },

  timetask: {
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 10
  },

  box2: {
    height: '45%',
    width: '75%',
    borderRadius: 30,
    padding: '10%',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginTop: '-7%'
  },

  Description: {
    marginTop: 2,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },

  btn1: {
    height: '13%',
    backgroundColor: 'white',
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 15,
    marginTop: 60
  },

  btn2: {
    height: '13%',
    backgroundColor: '#ccb3ff',
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

  },

  btnText1: {
    fontSize: 15,
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.primary
  },

  btnText2: {
    fontSize: 15,
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.secondry
  },

});
