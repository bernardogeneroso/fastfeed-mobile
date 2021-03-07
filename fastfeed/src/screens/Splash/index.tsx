import React, {useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Animated, View, StyleSheet} from 'react-native';

import {AppRoutesScreens} from '../../routes/app.routes';

import Logo from '../../../assets/images/logos/logo.png';

const Splash = () => {
  const navigation = useNavigation<AppRoutesScreens>();
  const scale = new Animated.Value(1);

  const handleMultiScale = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ).start(() => {
      handleMultiScale();
    });
  }, [scale]);

  useEffect(() => {
    handleMultiScale();

    setTimeout(function () {
      // @ts-ignore
      navigation.navigate('Auth');
    }, 4000);
  }, [navigation, handleMultiScale]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={Logo}
        style={{
          transform: [
            {
              scale,
            },
          ],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4C32CC',
  },
});

export default Splash;
