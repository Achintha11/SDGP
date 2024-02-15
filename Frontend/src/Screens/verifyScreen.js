import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
const verifyImage = require('../assets/correct.png');
import { COLORS } from '../assets/constant/constants';
import LottieView from 'lottie-react-native';

export default function VerifyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'}/>


      <View style={{ height: '55%', width: '100%', overflow: 'hidden',marginTop : '5%' }} >
        <LottieView style={{ flex: 1, height: '100%', width: '100%' }} source={require('../assets/Animation - 1707893364144.json')} autoPlay loop />
      </View>


      <View style={{ alignItems: 'center' , marginTop : '-1%' }}>
        <Text style={styles.verifyStyle}>Account Verified</Text>
        <Text style={styles.verifyDescription}>Your account has been verified successfully</Text>
        <Text style={styles.verifyDescription}>Now let's get Start</Text>
      </View>


      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Get Start</Text>
      </TouchableOpacity>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center'
  },

  verifyStyle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },

  verifyDescription: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.third
  },

  btn: {
    margin: '45%',
    height: '5%',
    backgroundColor: 'white',
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },

  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary

  },

  imageContainer: {
    paddingTop: 100,
    paddingBottom: 150,
    overflow: 'hidden',
    alignItems: 'center',
    backfaceVisibility: 'black'
  },

  correctImage: {
    height: 200,
    width: 100
  }
});
