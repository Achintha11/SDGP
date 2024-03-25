import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../assets/constants/constant";
import { useEffect } from "react";
import girlImage from '../../assets/Girl.png'
import boyImage from '../../assets/Boy.png'
import { firebase } from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';



const ProPicUpload = () => {
  const girlImg = Image.resolveAssetSource(girlImage).uri  
  const boyImg = Image.resolveAssetSource(boyImage).uri

  const [image, setImage] = useState(null);
  const [isAvatarSelected, setIsAvatarSelected] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const selectAvatar = (avatarUri) => {
    console.log(avatarUri);
    setImage(avatarUri);
    setIsAvatarSelected(true); // Set avatar selection
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uploadUri = result.assets[0].uri;
      console.log(uploadUri);
      setImage(uploadUri)
      setIsAvatarSelected(false); // Reset avatar selection


    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.secondry }}>
      <StatusBar barStyle={"dark-content"} />
      <Text style={styles.heading}>Upload Profile Picture</Text>

      <View style={styles.container}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {image && !isAvatarSelected && (
                <Image
                  source={{uri : image}}
                  style={{ width: 165, height: 165, borderRadius: 82.5 }}
                />
              )}
              {image && isAvatarSelected && (
                <Image
                  source={{uri : image}}
                  style={{ width: 125, height: 125, borderRadius: 62.5 }}
                />
              )}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.containertwo}>
        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => selectAvatar(girlImg)}
          >
            <Image source={girlImage} style={styles.GirlImg} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttons}
            onPress={() => selectAvatar(boyImg)}
          >
            <Image source={boyImage} style={styles.BoyImg} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subheading}>Select an Avatar</Text>
      <Text style={styles.subheading}>OR</Text>

      <TouchableOpacity style={styles.Button} onPress={pickImage}>
        <Text style={styles.textButton}>Upload</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => uploadFile(image, 'profile_picture.jpg')}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: "15%",
    textAlign: "center",
  },
  subheading: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: "5%",
    color: "gray",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  outerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#ddccff",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 165,
    height: 165,
    borderRadius: 82.5,
    backgroundColor: "#805AD1",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  containertwo: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttons: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
    backgroundColor: "#ddccff",
    margin: 25,
  },
  GirlImg: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  BoyImg: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  Button: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    marginTop: "2.5%",
    width: 350,
    height: 50,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#805AD1",
    padding: 10,
    borderRadius: 10,
    marginTop: "5%",
    width: 350,
    height: 50,
    alignSelf: "center",
  },
  textButton: {
    color: "#805AD1",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 5,
  },
});

export default ProPicUpload;
