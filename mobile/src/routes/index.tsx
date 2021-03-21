import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import {useAuth} from '../hooks/Auth';
import AuthRoutes from './auth.routes';
import AppHomeRoutes from './app.home.routes';

const Routes = () => {
  const {loading, user} = useAuth();

  console.log(user);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return !!user ? <AppHomeRoutes /> : <AuthRoutes />;
};

export default Routes;
