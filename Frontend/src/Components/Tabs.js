import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CurvedBottomBar from "./CurvedBottomBar";

const Stack = createStackNavigator();

const Tabs = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTab">
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
