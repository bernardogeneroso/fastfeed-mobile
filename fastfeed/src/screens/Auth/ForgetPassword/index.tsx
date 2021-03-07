import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import IconFeather from 'react-native-vector-icons/Feather';

import Header from '../../../components/Auth/Header';

import {Container} from '../Login/styles';
import {
  Content,
  MessageText,
  MessageStyleText,
  InfoText,
  ContainerAddress,
  AddressTitle,
  AddressText,
  ButtonFooter,
  ButtonFooterText,
} from './styles';

const ForgetPassword = () => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container
      imageStyle={{
        width: 250,
        height: 420,
        resizeMode: 'stretch',
      }}>
      <Header />

      <Content>
        <MessageText>
          <MessageStyleText>Esqueceu{'\n'}</MessageStyleText>a password?
        </MessageText>

        <InfoText>
          Por motivos de segurança, para recuperar a password, precisa de ir a
          central da distribuidora Fastfeet.
        </InfoText>

        <ContainerAddress>
          <AddressTitle>Endereço</AddressTitle>

          <AddressText>Rua da Penha, 320 Jardim da Penha, 1000-852</AddressText>
        </ContainerAddress>
      </Content>

      <ButtonFooter onPress={handleGoBack}>
        <IconFeather name="arrow-left" size={24} color="#FFC042" />
        <ButtonFooterText>Voltar para o login</ButtonFooterText>
      </ButtonFooter>
    </Container>
  );
};

export default ForgetPassword;
