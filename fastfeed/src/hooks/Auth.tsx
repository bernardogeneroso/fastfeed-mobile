import React, {createContext, useContext, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(data: SignInCredentials, remember: boolean): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  const signIn = useCallback(
    async ({email, password}: SignInCredentials, remember: boolean) => {
      const {
        data: {user, token},
      } = await api.post('/user/session', {
        email,
        password,
      });

      AsyncStorage.setItem('FastFeed:token', token);
      AsyncStorage.setItem('FastFeed:user', JSON.stringify(user));

      if (remember) {
        const user = {
          email,
          password,
        };

        AsyncStorage.setItem('FastFeed:user-login', JSON.stringify(user));
        AsyncStorage.setItem(
          'FastFeed:user-remember',
          JSON.stringify(remember),
        );
      } else {
        AsyncStorage.removeItem('FastFeed:user-remember');
      }

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({token, user});
    },
    [],
  );

  const signOut = useCallback(() => {
    api.defaults.headers.authorization = '';

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthProvider, useAuth};
