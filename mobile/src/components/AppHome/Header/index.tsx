import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import IconsFeather from 'react-native-vector-icons/Feather';
import IconsIonicons from 'react-native-vector-icons/Ionicons';

import {useAuth} from '../../../hooks/Auth';

import {
  Container,
  ContainerHeader,
  WelcomeText,
  ButtonLogOut,
  ContainerPlace,
  InfoText,
  ContentPlace,
  PlaceText,
  ContainerSearch,
  ContentSearch,
  Input,
  ContainerModal,
  ContentDeliverie,
  StreetText,
} from './styles';

const Header = () => {
  const {user, signOut} = useAuth();
  const [modalSearch, setModalSearch] = useState<boolean>(true);

  return (
    <Container>
      <ContainerHeader>
        <WelcomeText>
          Bem vindo, {'\n'}
          {user.name}
        </WelcomeText>

        <ButtonLogOut onPress={signOut}>
          <IconsFeather name="log-out" color="#FFC042" size={22} />
        </ButtonLogOut>
      </ContainerHeader>

      <ContainerPlace>
        <InfoText>Entregas</InfoText>

        <ContentPlace>
          <IconsIonicons name="md-location-sharp" color="#FFC042" size={22} />
          <PlaceText>Faro</PlaceText>
        </ContentPlace>
      </ContainerPlace>

      <ContainerSearch style={style.viewShadow}>
        <ContentSearch modalSearch={modalSearch}>
          <Input
            autoCapitalize="none"
            keyboardType="web-search"
            returnKeyType="search"
            placeholder="Filtrar por rua"
          />
          <IconsIonicons name="search" size={22} color="#BEBCCC" />
        </ContentSearch>

        {modalSearch && (
          <ContainerModal>
            <ContentDeliverie>
              <StreetText>Jardim América</StreetText>
            </ContentDeliverie>
            <ContentDeliverie>
              <StreetText>Jardim América</StreetText>
            </ContentDeliverie>
            <ContentDeliverie>
              <StreetText>Jardim América</StreetText>
            </ContentDeliverie>
          </ContainerModal>
        )}
      </ContainerSearch>
    </Container>
  );
};

const style = StyleSheet.create({
  viewShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Header;
