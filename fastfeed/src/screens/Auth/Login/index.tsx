import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Platform,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Header,
  HeaderImageLogo,
  HeaderImageLogoName,
  Content,
  WelcomeText,
  WelcomeStyleText,
  InformationText,
  Form,
  ContainerInput,
  Divider,
  Input,
  ContainerEye,
  ButtonSubmit,
  ButtonSubmitText,
} from './styles';

interface FormProps {
  email: {
    value: string;
    focusable: boolean;
  };
  password: {
    value: string;
    focusable: boolean;
    visible: boolean;
  };
}

import logoTransparent from '../../../../assets/images/logos/logo_transparent.png';
import logo from '../../../../assets/images/logos/logo.png';
import logoName from '../../../../assets/images/logos/logo_name.png';

const Login = () => {
  const formRef = useRef(null);
  const opacityWelcomeMessage = new Animated.Value(1);

  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const [form, setForm] = useState<FormProps>({
    email: {
      value: '',
      focusable: false,
    },
    password: {
      value: '',
      focusable: false,
      visible: false,
    },
  });

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardWillShow);
    Keyboard.addListener('keyboardDidHide', keyboardWillHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardWillShow);
      Keyboard.removeListener('keyboardDidHide', keyboardWillHide);
    };
  }, []);

  const keyboardWillShow = (event: any) => {
    console.log('keyboardWillShow');
    Animated.timing(opacityWelcomeMessage, {
      duration: 400,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const keyboardWillHide = (event: any) => {
    console.log('keyboardWillHide');
    Animated.timing(opacityWelcomeMessage, {
      duration: 400,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleToggleVisiblePassword = useCallback(() => {
    setForm((state) => ({
      ...state,
      password: {
        ...state.password,
        visible: !state.password.visible,
      },
    }));
  }, []);

  const handleChangeInputValue = useCallback(
    (type: 'email' | 'password', value: string) => {
      setForm((state) => ({
        ...state,
        [type]: {
          ...state[type],
          value,
        },
      }));
    },
    [],
  );

  const handleToggleChangeFocusable = useCallback(
    (type: 'email' | 'password', focusable: boolean) => {
      setForm((state) => ({
        ...state,
        [type]: {
          ...state[type],
          focusable: !focusable,
        },
      }));
    },
    [],
  );

  const handleSubmit = useCallback(() => {}, []);

  return (
    <Container
      source={logoTransparent}
      imageStyle={{
        width: 250,
        height: 420,
        resizeMode: 'stretch',
      }}>
      <Header>
        <HeaderImageLogo source={logo} />
        <HeaderImageLogoName source={logoName} />
      </Header>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          contentContainerStyle={{flex: 1, justifyContent: 'space-around'}}
          keyboardShouldPersistTaps="handled">
          <Content>
            <Animated.View
              style={{
                opacity: opacityWelcomeMessage,
              }}>
              <WelcomeText>
                <WelcomeStyleText>Empregador,</WelcomeStyleText> seja bem vindo
                a aplicação
              </WelcomeText>
            </Animated.View>

            <InformationText>
              Faça o login para gerir as suas entregas.
            </InformationText>
          </Content>

          <Form ref={formRef}>
            <ContainerInput focus={!form.email.focusable}>
              <Icon
                name="user"
                color={!form.email.focusable ? '#FFC042' : '#4c32cc'}
                size={20}
              />
              <Divider />
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="E-mail"
                onChangeText={(value) => handleChangeInputValue('email', value)}
                onFocus={() => handleToggleChangeFocusable('email', true)}
                onBlur={() => handleToggleChangeFocusable('email', false)}
                defaultValue={form.email.value}
              />
            </ContainerInput>

            <ContainerInput focus={!form.password.focusable}>
              <Icon
                name="lock"
                color={!form.password.focusable ? '#FFC042' : '#4c32cc'}
                size={20}
              />
              <Divider />
              <Input
                secureTextEntry={!form.password.visible}
                returnKeyType="send"
                placeholder="Palavra-passe"
                onChangeText={(value) =>
                  handleChangeInputValue('password', value)
                }
                onFocus={() => handleToggleChangeFocusable('password', true)}
                onBlur={() => handleToggleChangeFocusable('password', false)}
                defaultValue={form.password.value}
              />
              <ContainerEye onPress={handleToggleVisiblePassword}>
                {form.password.visible ? (
                  <Icon name="eye" color="#4C33CC" size={24} />
                ) : (
                  <Icon name="eye-off" color="#4C33CC" size={24} />
                )}
              </ContainerEye>
            </ContainerInput>

            <ButtonSubmit>
              <ButtonSubmitText>Entrar</ButtonSubmitText>
            </ButtonSubmit>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Login;
