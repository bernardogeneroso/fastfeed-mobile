import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Auth/Login';

const StackAuth = createStackNavigator();

const Auth = () => {
  return (
    <StackAuth.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <StackAuth.Screen name="Login" component={Login} />
    </StackAuth.Navigator>
  );
};

export default Auth;
