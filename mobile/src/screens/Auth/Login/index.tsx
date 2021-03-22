import React, {useRef, useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Platform,
  Alert,
  KeyboardEventName,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Animatable from 'react-native-animatable';
import * as Yup from 'yup';

import Header from '../../../components/Auth/Header';
import {AppRoutesScreens} from '../../../routes/app.routes';
import {useAuth} from '../../../hooks/Auth';

import {
  Container,
  Content,
  WelcomeText,
  WelcomeStyleText,
  InformationText,
  Form,
  ContainerInput,
  Divider,
  Input,
  ContainerError,
  ErrorText,
  ContainerEye,
  ContainerSettingsForm,
  ContentCheckBox,
  CheckBoxData,
  CheckBoxText,
  ButtonForgetPassword,
  ForgetPasswordText,
  ButtonSubmit,
  ButtonSubmitText,
} from './styles';

interface FormProps {
  email: {
    focusable: boolean;
  };
  password: {
    focusable: boolean;
    visible: boolean;
  };
  checkbox: boolean;
}

interface KeyboardListenerProps {
  show: KeyboardEventName;
  hide: KeyboardEventName;
}

interface DataForm {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .required('O campo de e-mail é obrigatório')
    .email('Escreva o e-mail válido'),
  password: Yup.string().required('O campo da password é obrigatório'),
});

const Login = () => {
  const {signIn} = useAuth();
  const navigation = useNavigation<AppRoutesScreens>();
  const {control, handleSubmit, errors, setValue} = useForm({
    resolver: yupResolver(schema),
  });

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [keyboardShow, setKeyboardShow] = useState<boolean>(false);
  const [form, setForm] = useState<FormProps>({
    email: {
      focusable: false,
    },
    password: {
      focusable: false,
      visible: false,
    },
    checkbox: false,
  });
  const keyboardListener: KeyboardListenerProps =
    Platform.OS === 'ios'
      ? {
          show: 'keyboardWillShow',
          hide: 'keyboardWillHide',
        }
      : {
          show: 'keyboardDidShow',
          hide: 'keyboardDidHide',
        };

  useEffect(() => {
    Keyboard.addListener(keyboardListener.show, () => setKeyboardShow(true));
    Keyboard.addListener(keyboardListener.hide, () => setKeyboardShow(false));

    return () => {
      // @ts-ignore
      Keyboard.removeAllListeners(() => {
        setKeyboardShow(true);

        return keyboardListener.show;
      });
      // @ts-ignore
      Keyboard.removeAllListeners(() => {
        setKeyboardShow(false);

        return keyboardListener.hide;
      });
    };
  }, [keyboardListener.hide, keyboardListener.show]);

  useEffect(() => {
    AsyncStorage.multiGet([
      'FastFeed:user-login',
      'FastFeed:user-remember',
    ]).then((response) => {
      if (!response[0][1] || !response[1][1]) return;

      const {email, password} = JSON.parse(response[0][1]);
      const remember = JSON.parse(response[0][1]);

      setValue('email', email);
      setValue('password', password);

      setForm((value) => ({
        ...value,
        checkbox: remember,
      }));
    });
  }, [setValue]);

  const handleToggleVisiblePassword = useCallback(() => {
    setForm((state) => ({
      ...state,
      password: {
        ...state.password,
        visible: !state.password.visible,
      },
    }));
  }, []);

  const handleToggleChangeFocusable = useCallback(
    (type: 'email' | 'password') => {
      setForm((state) => ({
        ...state,
        [type]: {
          ...state[type],
          focusable: !state[type].focusable,
        },
      }));
    },
    [],
  );

  const handleToggleCheckBoxForm = useCallback(() => {
    setForm((state) => ({
      ...state,
      checkbox: !state.checkbox,
    }));
  }, []);

  const handleRedirectForgetPassword = useCallback(() => {
    // @ts-ignore
    navigation.navigate('ForgetPassword');
  }, [navigation]);

  const handleOnSubmit = useCallback(
    async (data: DataForm) => {
      try {
        const {email, password} = data;
        const checkbox = form.checkbox;

        await signIn({email, password}, checkbox);
      } catch (err) {
        Alert.alert('Erro na autenticação');
      }
    },
    [form.checkbox, signIn],
  );

  return (
    <Container
      imageStyle={{
        width: 250,
        height: 420,
        resizeMode: 'stretch',
      }}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <Header />
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'space-around'}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Content>
            {!keyboardShow && (
              <WelcomeText>
                <WelcomeStyleText>Empregador,</WelcomeStyleText> seja bem vindo
                a aplicação
              </WelcomeText>
            )}

            <Animatable.View></Animatable.View>

            <InformationText>
              Faça o login para gerir as suas entregas.
            </InformationText>
          </Content>

          <Form>
            <ContainerInput focus={!!form.email.focusable}>
              <Icon
                name="mail"
                color={form.email.focusable ? '#FFC042' : '#4c32cc'}
                size={20}
              />
              <Divider />

              <Controller
                control={control}
                onFocus={() => {
                  // @ts-ignore
                  emailInputRef.current && emailInputRef.current.focus();
                }}
                render={(props) => (
                  <Input
                    {...props}
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    placeholder="E-mail"
                    onChangeText={(value) => props.onChange(value)}
                    onFocus={() => handleToggleChangeFocusable('email')}
                    onBlur={() => {
                      handleToggleChangeFocusable('email');
                      props.onBlur();
                    }}
                    ref={emailInputRef}
                  />
                )}
                name="email"
                rules={{required: true}}
              />
            </ContainerInput>
            {errors.email?.message && (
              <ContainerError>
                <ErrorText>{errors.email?.message}</ErrorText>
              </ContainerError>
            )}

            <ContainerInput focus={!!form.password.focusable}>
              <Icon
                name="lock"
                color={form.password.focusable ? '#FFC042' : '#4c32cc'}
                size={20}
              />
              <Divider />
              <Controller
                control={control}
                onFocus={() => {
                  // @ts-ignore
                  passwordInputRef.current && passwordInputRef.current.focus();
                }}
                render={(props) => (
                  <Input
                    {...props}
                    secureTextEntry={!form.password.visible}
                    returnKeyType="send"
                    placeholder="Password"
                    onChangeText={(value) => props.onChange(value)}
                    onFocus={() => handleToggleChangeFocusable('password')}
                    onBlur={() => {
                      handleToggleChangeFocusable('password');
                      props.onBlur();
                    }}
                    ref={passwordInputRef}
                  />
                )}
                name="password"
                rules={{required: true, minLength: 6}}
              />
              <ContainerEye onPress={handleToggleVisiblePassword}>
                {form.password.visible ? (
                  <Icon name="eye" color="#4C33CC" size={24} />
                ) : (
                  <Icon name="eye-off" color="#4C33CC" size={24} />
                )}
              </ContainerEye>
            </ContainerInput>
            {errors.password?.message && (
              <ContainerError>
                <ErrorText>{errors.password?.message}</ErrorText>
              </ContainerError>
            )}

            <ContainerSettingsForm>
              <ContentCheckBox>
                <CheckBoxData
                  checked={form.checkbox}
                  onPress={handleToggleCheckBoxForm}
                  checkedColor="#ffc042"
                  containerStyle={{
                    margin: 0,
                    padding: 0,
                  }}
                />

                <CheckBoxText checked={form.checkbox}>Lembrar-me</CheckBoxText>
              </ContentCheckBox>

              <ButtonForgetPassword>
                <ForgetPasswordText onPress={handleRedirectForgetPassword}>
                  Esqueci-me da minha senha
                </ForgetPasswordText>
              </ButtonForgetPassword>
            </ContainerSettingsForm>

            {/* @ts-ignore  */}
            <ButtonSubmit onPress={handleSubmit(handleOnSubmit)}>
              <ButtonSubmitText>Entrar</ButtonSubmitText>
            </ButtonSubmit>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Login;
