import React, { useState } from 'react';
import { Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../assets/constants/constant';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import auth from '../../firebaseConfig';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, createUserWithEmailAndPassword, getReactNativePersistence, signInWithEmailAndPassword } from "firebase/auth";


const WelcomePage = () => {
  const navigation = useNavigation(); // Initialize navigation object

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState("");

  const storeUserData = async (user) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(user));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const handleForgotPress = () => {
    console.log('Forgot Password pressed!');
  };

  const handleSignUpPress = () => {
    console.log('Sign Up pressed!');
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handleContinuePress = () => {
    validateEmail();

    if (!emailError) {
      navigation.navigate('MainTab')


    }

  }

  const sendToken = async (token, user) => {
    try {
      const response = await axios.get('http://192.168.42.117:8080/protected-resource', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) { // Handle successful response
        console.log('User successfully authenticated!');
        storeUserData(user);

        navigation.navigate('MainTab')
        // Set a flag or store relevant data to indicate successful login
        // (Avoid directly logging the token or user ID)
      } else {
        console.error('Error:', response.data);
      }
    } catch (error) {
      console.error('Error sending token:', error);
    }
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const token = await user.getIdToken();
        console.log(token);
        sendToken(token, user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.third} />
      <View>
        <Text style={styles.welcomeText}> Welcome Back </Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <View style={styles.emailBar}>
          <Feather name="mail" size={20} color={COLORS.fourth} />
          <TextInput
            style={{
              fontSize: 20,
              marginLeft: '3%'
            }}
            placeholder='Email Address'
            placeholderTextColor={COLORS.fourth}
            value={email}
            onChangeText={(text) => setEmail(text)}
            onBlur={validateEmail}
          />
        </View>

        {emailError ? (
          <Text style={{ color: COLORS.eleventh, marginLeft: '-38%' }}>{emailError}</Text>
        ) : null}

        <View style={styles.passwordBar}>

          <Feather name="lock" size={20} color={COLORS.fourth} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={{
              fontSize: 20,
              marginLeft: '3%',
              flex: 1
            }}
            secureTextEntry={passwordVisible}
            placeholder='Password'
            placeholderTextColor={COLORS.fourth}
          />
          <TouchableWithoutFeedback
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Feather
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={COLORS.sixth}
              style={{ marginRight: '3%', marginLeft: '5%' }}
            />
          </TouchableWithoutFeedback>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => login()}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.forgotContainer, styles.centeredText]}
          onPress={handleForgotPress}>

          <Text style={styles.forgotText}>Forgot Password?</Text>

        </TouchableOpacity>

      </View>

      <View style={styles.orView}>
        <Text style={styles.orText}>Or</Text>
      </View>

      <TouchableOpacity style={styles.googleView} onPress={() => console.log('Continue with Google pressed!')}>

        <Text style={styles.googleText}> <FontAwesome name="google" size={20} />  Continue with Google</Text>
      </TouchableOpacity>

      <View style={styles.lastText}>
        <Text style={styles.dontHave}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={handleSignUpPress}>
          <Text style={styles.signUp}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  welcomeText: {
    fontSize: 50,
    fontWeight: '700',
    marginTop: '9%',
    marginLeft: '4%',
  },

  emailBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '3%',
    width: '73%',
    height: '7%',
    marginTop: '20%',
  },

  passwordBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '3%',
    paddingRight: '-1%',
    width: '73%',
    height: '7%',
    marginTop: '5%',
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: '4%',
    borderRadius: 10,
    marginTop: '20%',
    width: '80%',
    height: '11%',
  },

  buttonText: {
    color: COLORS.secondry,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '-1%'
  },

  forgotContainer: {
    marginTop: '15%',
    alignItems: 'center',
  },

  forgotText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '700',
  },

  orView: {
    alignItems: 'center',
    marginTop: '-3%',
  },

  orText: {
    fontSize: 16,
    alignItems: 'center',
    color: COLORS.fourth,
  },

  googleView: {
    alignItems: 'center',
    marginTop: '10%',
  },

  googleText: {
    fontSize: 17,
    fontWeight: '700',
  },

  lastText: {
    flexDirection: 'column',
    marginTop: '15%',
    alignItems: 'center',
  },

  dontHave: {
    fontSize: 16,
    color: COLORS.fourth,
    fontWeight: 'bold',
  },

  signUp: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },

});

export default WelcomePage;
