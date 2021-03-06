import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import Splash from '../screens/Splash';

import Auth from './auth.routes';

const Stack = createStackNavigator();

type AuthScreens = {
  Login: undefined;
};

type StackNavigatorScreens = {
  Splash: undefined;
  Auth: AuthScreens;
};

export type AppRoutesScreens = StackNavigationProp<StackNavigatorScreens>;

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Auth" component={Auth} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
