import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Feather, FontAwesome } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { useState } from "react";
import * as Progress from "react-native-progress";
import { COLORS } from "../../assets/constants/constant";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";


const progress = 0.4;

const renderItem = ({ item }) => {
  return (
    <View
      style={{
        backgroundColor: "#40237E",
        borderRadius: 60,
        height: 225,
      }}
    >
      <ImageBackground
      
        source={require("../../assets/carouselImg1.png")}
        style={styles.CarouselImg}
      >
        <View>
          <Text style={styles.CarouselTextup}>{item.textup}</Text>
        </View>
        <View>
          <Text style={styles.CarouselTexttitle}>{item.title}</Text>
          <Text style={styles.CarouselText}>{item.text}</Text>
        </View>
        <View>
          <Progress.Bar
            style={styles.CarouselProBar}
            progress={progress}
            width={160}
            height={10}
            borderRadius={8}
            borderColor={COLORS.nineth}
            unfilledColor={COLORS.nineth}
            color={COLORS.tenth}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.CarouselTextdown}>{item.textdown}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);

  const [userData , setUserData] = useState(null)
  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        return JSON.parse(userData);
      } else {
        return null; // Indicate no user data stored
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

     fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.third} barStyle={'dark-content'}/>
      
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.upperview}>
          <TouchableOpacity style={styles.notificationContainer1}>
             <Image
              source={require("../../assets/menuicon.png")}
              style={styles.Notifications}
            ></Image> 

            

          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationContainer2}>
            <Image
              source={require("../../assets/notify.png")}
              style={styles.Notifications}
            ></Image>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.MainCardContainer}>
          <Shadow distance={10} startColor={"#e6e6e6"} offset={[0, 0]}>
            <View style={styles.MainCard}>
            
               <ImageBackground
                source={require("../../assets/HomePage_MainCard_Image.png")}
                style={styles.backgroundImage}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.mcardtext1}>
                    You got <Text style={styles.mcardtext1m}>5 Tasks</Text>{" "}
                    Today!
                  </Text>
                  <Text style={styles.mcardtext2}>Hello,</Text>
                  {userData ? (
                    <Text style={styles.mcardtext3}>{userData.displayName}</Text>
                  ) : (
                    <Text style={styles.mcardtext3}>Guest User</Text>
                  )}                  
                  <Text style={styles.mcardtext4}>Have a nice day!</Text>
                </View>
              </ImageBackground>
            </View>
          </Shadow>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#D6C9FF"
          />
          <Feather
            name="search"
            size={24}
            color="black"
            style={styles.searchIcon}
          />
        </View>

        <View style={styles.middleContainer}>
          <TouchableOpacity style={styles.recentTaskContainer}>
            <Image
              source={require("../../assets/recenttasksicon.png")}
              style={styles.recentTaskicon}
            ></Image>
            <Text style={styles.recentTasktext}>Today Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.seemoreContainer}>
            <Text style={styles.seemoreText}>See More</Text>
            <Image
              source={require("../../assets/Seemoreicon.png")}
              style={styles.Seemoreicon}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.CarouselCardContainer}>
          <Carousel
            layout={"default"}
            ref={(ref) => setCarouselItems(ref)}
            data={[
              {
                textup: " 📝 Exam",
                title: "Algorithms",
                text: "ICT Pt .1",
                textdown: "28 February 2024",
              },
              {
                textup: " 📝 Exam",
                title: "OOP",
                text: "MCQ & Structure",
                textdown: "3 March 2024",
              },
              {
                textup: " 📝 Exam",
                title: "Server Side",
                text: "ICT Pt.1",
                textdown: "15 March 2024",
              },
              {
                textup: " 📚 Coursework",
                title: "Web Dev",
                text: "Course Work",
                textdown: "3 April 2024",
              },
              {
                textup: " 👨🏼‍💻 Self study",
                title: "OOP",
                text: "Self Studies",
                textdown: "13 April 2024",
              },
            ]}
            sliderWidth={375}
            itemWidth={225}
            inactiveSlideScale={0.75}
            renderItem={renderItem}
            loop={true}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
        </View>

        <TouchableOpacity style={styles.BottomCardContainer}>
          <Shadow distance={10} startColor={"#e6e6e6"} offset={[0, 0]}>
            <View style={styles.BottomCard}>
              <View style={styles.BottomtextContainer}>
                <Text style={styles.Bottomcardtext1}>Today Progress...!</Text>
                <View>
                  <Progress.Bar
                    style={styles.BottomProBar}
                    progress={progress}
                    width={300}
                    height={15}
                    borderRadius={8}
                    borderColor={COLORS.nineth}
                    unfilledColor={COLORS.nineth}
                    color={COLORS.tenth}
                  />
                </View>
                <Text style={styles.Bottomcardtext4}>You worked  <Text style={styles.Bottomcardtext4m}>1 hour</Text> on your Tasks Today!</Text>
                <Text style={styles.Bottomcardtext5}>Keep up the Good Work...</Text>
              </View>
            </View>
          </Shadow>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: '35%',
  },

  upperview: {
    height: "12.5%",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  MainCardContainer: {
    alignItems: "center",
    marginTop: "-10%",
  },
  MainCard: {
    borderRadius: 35,
    backgroundColor: "white",
    width: 360,
    height: 200,
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    height: 225,
    width: 335,
    marginLeft: "13%",
  },
  textContainer: {
    marginLeft: "-7.5%",
  },

  mcardtext1: {
    margin: 10,
    fontSize: 15,
    marginLeft: "21.5%",
    fontWeight: "600",
  },
  mcardtext1m: {
    fontWeight: "900",
    color: "#805AD1",
  },
  mcardtext2: {
    fontSize: 35,
    fontWeight: "800",
  },
  mcardtext3: {
    fontSize: 35,
    fontWeight: "800",
    color: "#805AD1",
  },
  mcardtext4: {
    marginTop: "1%",
    fontSize: 20,
    fontWeight: "500",
  },

  notificationContainer1: {
    marginLeft: "1",
    marginTop: 5,
    height: 40,
    width: "20%",
    alignItems: "center",
  },
  notificationContainer2: {
    marginRight: "1%",
    marginTop: 5,
    height: 40,
    width: "20%",
    alignItems: "center",
  },
  Notifications: {
    resizeMode: "contain",
    width: "40%",
    height: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#D6C9FF",
    marginHorizontal: 20,
    marginTop: "7.5%",
    paddingHorizontal: 10,
    height: "4.5%",
  },
  searchIcon: {
    marginRight: 5,
    color: "#D6C9FF",
    marginHorizontal: "0%",
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: "#000000",
  },

  middleContainer: {
    flexDirection: "row",
    marginTop: "5%",
    justifyContent: "space-between",
    paddingHorizontal: "4%",
  },

  recentTaskContainer: {
    flexDirection: "row",
    marginTop: "2.5%",
  },

  recentTasktext: {
    fontSize: 15,
    fontWeight: "800",
    marginLeft: 5,
    color: "black",
  },

  recentTaskicon: {
    resizeMode: "contain",
    marginTop: "1.5%",
    padding: "5%",
    width: 6,
    height: 6,
  },

  seemoreContainer: {
    flexDirection: "row",
    marginTop: "2.5%",
  },

  Seemoreicon: {
    resizeMode: "contain",
    padding: 7.5,
    marginTop: "2.5%",
    width: "2.5%",
    height: "100%",
  },

  seemoreText: {
    fontSize: 15,
    color: "#CCC",
  },

  CarouselCardContainer: {
    alignItems: "center",
    height: "40%",
    width: "100%",
    marginTop: "7.5%",
  },
  CarouselImg: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
  },
  CarouselTexttitle: {
    fontSize: 30,
    color: "#FFFFFF",
    fontWeight: "700",
    marginTop: "-7.5%",
    marginLeft: "15%",
  },
  CarouselText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: "15%",
  },
  CarouselTextup: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: "15%",
    marginVertical: "20%",
  },
  CarouselTextdown: {
    fontSize: 13,
    color: "#FFFFFF",
  },
  CarouselProBar: {
    marginVertical: "6%",
    marginHorizontal: "15%",
  },

  BottomCardContainer: {
    alignItems: "center",
    marginTop: "-10%",
  },
  BottomCard: {
    borderRadius: 35,
    backgroundColor: "#f5f5f5",
    width: 360,
    height: 200,
    overflow: "hidden",
  },
  BottomtextContainer: {
    marginLeft: "-7.5%",
  },
  Bottomcardtext1: {
    margin: 10,
    fontSize: 15,
    color:"gray",
    marginVertical: '7%',
    marginLeft: "15%",
    fontWeight: "600",
  },
  Bottomcardtext4: {
    marginTop: "5%",
    color:"gray",
    width:300,
    fontSize: 16,
    fontWeight: "400",
    marginHorizontal: "15%",
  },
  BottomProBar: {
    marginVertical: "-3%",
    marginHorizontal: "15%",
  },
  Bottomcardtext4m: {
    marginTop: "5%",
    color: '#805AD1',
    width:300,
    fontSize: 16,
    fontWeight: "900",
    marginHorizontal: "15%",
  },
  Bottomcardtext5: {
    marginTop: "1%",
    color: '#805AD1',
    width:300,
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: "15%",
  },


});

export default App;
