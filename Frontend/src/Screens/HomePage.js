import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, Image, StatusBar, ScrollView, TextInput } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { Feather, FontAwesome } from '@expo/vector-icons';

const HomePage = () => {
    return(
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>
      <View style={styles.upperview}>
        <TouchableOpacity style={styles.notificationContainer1}>
          <Image source={require('../../assets/menuicon.png')} style={styles.Notifications}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer2}>
          <Image source={require('../../assets/notify.png')} style={styles.Notifications}></Image>
        </TouchableOpacity>
      </View>


    <TouchableOpacity style={styles.MainCardContainer}>
      <Shadow distance={10} startColor={'#e6e6e6'} offset={[0, 0]}>
        <View style={styles.MainCard}>
          <ImageBackground source={require('../../assets/HomePage_MainCard_Image.png')} style={styles.backgroundImage}>
            <View style={styles.textContainer}>
                <Text style={styles.mcardtext1}>You got <Text style={styles.mcardtext1m}>5 Tasks</Text> Today!</Text>
                <Text style={styles.mcardtext2}>Hello,</Text>
                <Text style={styles.mcardtext3}>Sanindu!</Text>
                <Text style={styles.mcardtext4}>Have a nice day!</Text>
            </View>
          </ImageBackground>
        </View>
      </Shadow>
    </TouchableOpacity>

    <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput}  placeholder="Search"  placeholderTextColor="#ccc" />
        <Feather name="search" size={24} color="black" style={styles.searchIcon} />
    </View>

    
    </ScrollView>
    </SafeAreaView>

    );
}


  const styles = StyleSheet.create({
  
      container: {
        flex: 1,
      },

      scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 20,
      },

      upperview: {
        height :'12.5%' ,
        justifyContent : 'space-between',
        flexDirection : 'row' 
      },
    
      MainCardContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: "-10%",
      },
      MainCard: {
        borderRadius: 35,
        backgroundColor: 'white',
        width: 360,
        height: 200,
        overflow: 'hidden', 
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'contain',
        height: 225,
        width: 335,
        marginLeft: '13%',
        
      },
      textContainer: {
        marginLeft: '-7.5%',
      },

      mcardtext1: {
        margin: 10,
        fontSize: 15,
        marginLeft: '21.5%',
        fontWeight: '600',
      },
      mcardtext1m: {
        fontWeight: '900',
        color: '#805AD1',
      },
      mcardtext2: {
        fontSize: 35,
        fontWeight: '800',
      },
      mcardtext3: {
        fontSize: 35,
        fontWeight: '800',
        color: '#805AD1',
      },
      mcardtext4: {
        marginTop: '1%',
        fontSize: 20,
        fontWeight: '500',
      },

      notificationContainer1: {
        marginLeft: '5%',
        marginTop: 5,
        height: 40,
        width : "20%",
        alignItems: 'center',

        
      },

      notificationContainer2: {
        marginRight: '5%',
        marginTop: 5,
        height: 40,
        width : "20%",
        alignItems: 'center',

        
      },
      
      Notifications: {
        resizeMode: 'contain',
        width: "40%",
        height: "100%",

      },

      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: '#ccc',
        marginHorizontal: 20,
        marginTop: "7.5%",
        paddingHorizontal: 10,
        height: "4.5%",
      },

      searchIcon: {
        marginRight: 10,
        color: '#805AD1',
        marginHorizontal: '0%', 
      },

      searchInput: {
        flex: 1,
        fontSize: 18,
        color: '#805AD1',
      },

   

});

export default HomePage;