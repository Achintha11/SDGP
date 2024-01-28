import React from 'react';
import {
  Alert,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  SafeAreaView,
  StatusBar
} from 'react-native';

import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import { FontAwesome } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';



import TaskPage from '../Screens/TaskPage'
import SchedulePage from '../Screens/SchedulePage'
import UserPage from '../Screens/UserPage'
import HomePage from '../Screens/HomePage';

import { COLORS } from '../../assets/constants/constant';


const Tabs =()=>{

    const _renderIcon = (routeName, selectedTab) => {

        let icon = '';
        
        switch (routeName) {
          case 'title1':
            icon = 'home';
            break;
          case 'title2':
            icon = 'calendar';
            break;
          case 'title3':
            icon = 'tasks';
            break;
          case 'title4':
            icon = 'user';
            break;          
        }
    
        return (
          <FontAwesome
            name={icon}
            size={25}
            color={routeName === selectedTab ? COLORS.primary: COLORS.fourth}
          />
        );
      };
    
    
      const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    
        return (
          <TouchableOpacity
            onPress={() => navigate(routeName)}
            style={styles.tabbarItem}
          >
            {_renderIcon(routeName, selectedTab)}
          </TouchableOpacity>
        );
      };

   
    return(
    
        <>

        <SafeAreaView style={styles.container}> 

            <NavigationContainer>
                <CurvedBottomBarExpo.Navigator
                    screenOptions={{headerShown : false}}
                    type="DOWN"
                    style={styles.bottomBar}
                    shadowStyle={styles.shawdow}
                    height={55}
                    circleWidth={55}
                    bgColor="white"
                    initialRouteName="title1"
                    borderTopLeftRight ={true}
                            
                    renderCircle={({ selectedTab, navigate }) => (
                    <Shadow distance={7} disabled={false} safeRender={true} offset={[0,-30]} startColor={COLORS.primary} style={styles.btnCircleUp}>
                        <Animated.View>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={() => Alert.alert('Add task')}
                            >
                            <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </Animated.View>
            

                        
                    </Shadow>
                    )}
                    tabBar={renderTabBar}
                >
                    <CurvedBottomBarExpo.Screen
                    name="title1"
                    position="LEFT"
                    component={() => <HomePage/>}
                    />
                    <CurvedBottomBarExpo.Screen
                    name="title2"
                    position="LEFT"
                    component={() => <SchedulePage />}
                    />

                    <CurvedBottomBarExpo.Screen
                    name="title3"
                    position="RIGHT"
                    component={() => <TaskPage/>}
                    />
          
                    <CurvedBottomBarExpo.Screen
                      name="title4"
                      component={() => <UserPage/>}
                      position="RIGHT"
                    />

                    
                </CurvedBottomBarExpo.Navigator>
            </NavigationContainer>
            </SafeAreaView>


  </>  

    )

}


const styles = StyleSheet.create({

    container : {
      flex : 1,
      backgroundColor :COLORS.secondry,
    },
  
    navigation :{
  
    },
  
  
    shawdow: {
      elevation :30
    },
  
  
    button: {
      flex: 1,
      justifyContent: 'center',
    },
  
  
    buttonText:{
      color : 'white',
      fontSize : 35,
      fontWeight: 'bold'
  
    },
  
  
    bottomBar: {
      ...Platform.select({
        ios: {
          paddingBottom:0 // Adjust as needed
        },
        android: {},
      }),
    },
  
  
    btnCircleUp: {
      width: 55,
      height: 55,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      bottom : 30,
      backgroundColor : COLORS.primary
      
    },
    
    tabbarItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


  export default Tabs;