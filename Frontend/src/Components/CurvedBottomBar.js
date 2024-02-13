import "react-native-gesture-handler";
import React from "react";
import {
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import { FontAwesome } from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";

import HomePage from "../Screens/HomePage";
import SchedulePage from "../Screens/SchedulePage";
import AddTask from "../Screens/AddTask";
import TaskPage from "../Screens/TaskPage";
import UserPage from "../Screens/UserPage";
import { COLORS } from "../../assets/constants/constant";

const _renderIcon = (routeName, selectedTab) => {
  let icon = "";

  switch (routeName) {
    case "title1":
      icon = "home";
      break;
    case "title2":
      icon = "calendar";
      break;
    case "title3":
      icon = "tasks";
      break;
    case "title4":
      icon = "user";
      break;
  }

  return (
    <FontAwesome
      name={icon}
      size={25}
      color={routeName === selectedTab ? COLORS.primary : COLORS.fourth}
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

const CurvedBottomBar = () => {
  return (
    <CurvedBottomBarExpo.Navigator
      screenOptions={{ headerShown: false }}
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={55}
      circleWidth={55}
      bgColor="white"
      initialRouteName="title1"
      borderTopLeftRight={true}
      renderCircle={({ selectedTab, navigate }) => (
        <Shadow
          distance={7}
          disabled={false}
          safeRender={true}
          offset={[0, -30]}
          startColor={COLORS.primary}
          style={styles.btnCircleUp}
        >
          <Animated.View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate("AddTask")}
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
        component={() => <HomePage />}
      />
      <CurvedBottomBarExpo.Screen
        name="title2"
        position="LEFT"
        component={() => <SchedulePage />}
      />

      <CurvedBottomBarExpo.Screen
        name="title3"
        position="RIGHT"
        component={() => <TaskPage />}
      />

      <CurvedBottomBarExpo.Screen
        name="title4"
        component={() => <UserPage />}
        position="RIGHT"
      />

      <CurvedBottomBarExpo.Screen
        name="AddTask"
        component={AddTask} // Render the AddTaskScreen component
      />
    </CurvedBottomBarExpo.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondry,
  },

  navigation: {},

  shawdow: {
    elevation: 30,
  },

  button: {
    flex: 1,
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },

  bottomBar: {
    ...Platform.select({
      ios: {
        paddingBottom: 0, // Adjust as needed
      },
      android: {},
    }),
  },

  btnCircleUp: {
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    bottom: 30,
    backgroundColor: COLORS.primary,
  },

  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CurvedBottomBar;
