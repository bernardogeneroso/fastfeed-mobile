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
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import * as Yup from 'yup';

import Header from '../../../components/Auth/Header';
import {AppRoutesScreens} from '../../../routes/app.routes';
import getValidationErrors from '../../../utils/getValidationErrors';

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
    value: string;
    focusable: boolean;
    error: {
      message: string | undefined;
    };
  };
  password: {
    value: string;
    focusable: boolean;
    visible: boolean;
    error: {
      message: string | undefined;
    };
  };
  checkbox: boolean;
}

interface KeyboardListenerProps {
  show: KeyboardEventName;
  hide: KeyboardEventName;
}

const Login = () => {
  const navigation = useNavigation<AppRoutesScreens>();

  const formRef = useRef(null);

  const [keyboardShow, setKeyboardShow] = useState<boolean>(false);
  const [form, setForm] = useState<FormProps>({
    email: {
      value: '',
      focusable: false,
      error: {
        message: undefined,
      },
    },
    password: {
      value: '',
      focusable: false,
      visible: false,
      error: {
        message: undefined,
      },
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

  const handleSetMesssageErrorForm = useCallback(
    (type: 'email' | 'password', message: string) => {
      setForm((state) => ({
        ...state,
        [type]: {
          ...state[type],
          error: {
            ...state[type].error,
            message,
          },
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

  const handleSubmit = useCallback(async () => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('O campo de e-mail é obrigatório')
          .email('Escreva o e-mail válido'),
        password: Yup.string().required('O campo da password é obrigatório'),
      });

      const data = {
        email: form.email.value,
        password: form.password.value,
      };

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        handleSetMesssageErrorForm('email', errors.email);
        handleSetMesssageErrorForm('password', errors.password);

        return;
      }

      Alert.alert('Error in authentication');
    }
  }, [form.email.value, form.password.value, handleSetMesssageErrorForm]);

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

          <Form ref={formRef}>
            <ContainerInput focus={!!form.email.focusable}>
              <Icon
                name="mail"
                color={form.email.focusable ? '#FFC042' : '#4c32cc'}
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
                onFocus={() => handleToggleChangeFocusable('email')}
                onBlur={() => handleToggleChangeFocusable('email')}
                defaultValue={form.email.value}
              />
            </ContainerInput>
            {form.email.error.message && (
              <ContainerError>
                <ErrorText>{form.email.error.message}</ErrorText>
              </ContainerError>
            )}

            <ContainerInput focus={!!form.password.focusable}>
              <Icon
                name="lock"
                color={form.password.focusable ? '#FFC042' : '#4c32cc'}
                size={20}
              />
              <Divider />
              <Input
                secureTextEntry={!form.password.visible}
                returnKeyType="send"
                placeholder="Password"
                onChangeText={(value) =>
                  handleChangeInputValue('password', value)
                }
                onFocus={() => handleToggleChangeFocusable('password')}
                onBlur={() => handleToggleChangeFocusable('password')}
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
            {form.password.error.message && (
              <ContainerError>
                <ErrorText>{form.password.error.message}</ErrorText>
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

            <ButtonSubmit onPress={handleSubmit}>
              <ButtonSubmitText>Entrar</ButtonSubmitText>
            </ButtonSubmit>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Login;
