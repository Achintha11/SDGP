import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CurvedBottomBar from "./CurvedBottomBar";
import Swiper from "./Swiper";
import SignUp from "../Screens/SignUp";
import Welcome from "../Screens/WelcomePage";
import StartPage from "../Screens/StartPage";
import TaskSuccess from "../Screens/TaskSuccess";
import ScheduleProgress from "../Screens/ScheduleProgress";
import ProPicUpload from "../Screens/ProPicUpload";
import MyCalendar from "../Screens/MyCalendar";
import Countdown from "../Screens/Countdown";

const Stack = createStackNavigator();

const Tabs = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartPage">
        <Stack.Screen
          name="StartPage"
          component={StartPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="proPicUpload"
          component={ProPicUpload}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="calendar"
          component={MyCalendar}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="countdown"
          component={Countdown}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="swiper"
          component={Swiper}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SubTaskSession"
          component={ScheduleProgress}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignUpScreen"
          component={SignUp}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TaskAdded"
          component={TaskSuccess}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignInScreen"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTab"
          component={CurvedBottomBar}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;
