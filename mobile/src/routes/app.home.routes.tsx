import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/AppHome/Home';

const BottomAppHome = createBottomTabNavigator();

export type AppHomeScreen = {
  Home: undefined;
};

const AppHome = () => {
  return (
    <BottomAppHome.Navigator initialRouteName="Home">
      <BottomAppHome.Screen name="Home" component={Home} />
    </BottomAppHome.Navigator>
  );
};

export default AppHome;
