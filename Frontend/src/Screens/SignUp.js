import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { COLORS } from '../../assets/constants/constant'
import { getAuth, createUserWithEmailAndPassword, getReactNativePersistence, sendEmailVerification } from "firebase/auth";
import auth from '../../firebaseConfig';




const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation(); // Initialize navigation object

  const handleForgotPress = () => {
    console.log('Forgot Password pressed!');
  };

  const handleSignUpPress = () => {
    console.log('Sign Up pressed!');
  };

  const handleSignInPress = () => {
    navigation.navigate('SignInScreen');
  };




  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        sendEmailVerification(user);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);

      });
  };
  

 
  
  

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.third}/>

      <Text style={styles.CreateText}>Create an Account</Text>

      <View style={{ alignItems: 'center' }}>

        <View style={styles.userView}>
          <Feather name="user" size={20} color={COLORS.fourth} />
          <TextInput
            style={{ fontSize: 18, marginLeft: '3%' }}
            placeholder='User Name'
            placeholderTextColor={COLORS.fourth}
          />
        </View>

        <View style={styles.emailView}>
          <Feather name="mail" size={20} color={COLORS.fourth} />
          <TextInput
            value={email}
            onChangeText={setEmail}

            style={{ fontSize: 18, marginLeft: '3%' }}
            placeholder='Email Address'
            placeholderTextColor={COLORS.fourth}
          />
        </View>


        <View style={styles.passwordView}>
          <Feather name="lock" size={20} color={COLORS.fourth} />
          <TextInput
            value={password}
            onChangeText={setPassword}

            style={{ fontSize: 18, flex: 1, marginLeft: '3%' }}
            placeholder='Password'
            secureTextEntry={passwordVisible}
            placeholderTextColor={COLORS.fourth}
          />

          <TouchableOpacity onPress={togglePasswordVisibility} style={{ right: '20%' }}>
            <Feather name={passwordVisible ? 'eye' : 'eye-off'} size={20} color={COLORS.fourth} />
          </TouchableOpacity>

        </View>

        <View style={styles.sentenceView}>
          <Text style={styles.byCreateText}>By create an account, you agree to our</Text>
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text style={styles.termsText}> Terms and conditions</Text>
          </TouchableOpacity>
          <Text style={styles.andText}>And</Text>
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text style={styles.privacyText}>privacy policy</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => createUser()}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.orText}>Or</Text>
        </View>

        <TouchableOpacity onPress={() => console.log('Continue with Google pressed!')}>
          <View style={styles.continueGoogleView}>
            <FontAwesome name="google" size={20} style={{ marginRight: '3%' }} />
            <Text style={styles.continueGoogleText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.haveAccountView}>
          <Text style={styles.haveAccountText}>Have an account?</Text>
          <TouchableOpacity onPress={handleSignInPress}>
            <Text style={styles.loginText}> Log in</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  CreateText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: '12%',
    marginLeft: '5%'
  },

  userView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '3%',
    width: '75%',
    height: '5%',
    marginTop: '10%',
  },

  emailView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '3%',
    width: '75%',
    height: '5%',
    marginTop: '7%',
  },

  passwordView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingLeft: '2%',
    width: '75%',
    marginTop: '10%',
    height: '8%',
    borderColor: COLORS.primary,
    borderWidth: 2
  },

  sentenceView: {
    flexDirection: 'column',
    marginTop: '8%',
    alignItems: 'center'
  },

  byCreateText: {
    fontSize: 16,
    color: COLORS.fourth,
    fontWeight: 'bold'
  },

  termsText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16
  },

  andText: {
    fontSize: 16,
    color: COLORS.fourth,
    fontWeight: 'bold'
  },

  privacyText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    marginTop: '9%',
    width: '75%',
    height: '9%',
    alignItems: 'center'
  },

  buttonText: {
    color: COLORS.secondry,
    fontSize: 18,
    fontWeight: '700',
    marginTop: '3%'
  },

  orText: {
    fontSize: 16,
    marginTop: '10%',
    color: COLORS.fourth
  },

  continueGoogleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },

  continueGoogleText: {
    fontSize: 17,
    fontWeight: 'bold'
  },

  haveAccountView: {
    flexDirection: 'row',
    marginTop: '13%',
    alignItems: 'center'
  },

  haveAccountText: {
    fontSize: 16,
    color: COLORS.fourth,
    fontWeight: 'bold'
  },

  loginText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16
  },


});

export default SignUp;
