import styled, {css} from 'styled-components/native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ContentSearchProps {
  modalSearch: boolean;
}

export const Container = styled.View`
  height: 180px;
  background-color: #4c32cc;
  padding: 22px;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const WelcomeText = styled.Text`
  font-size: 15px;
  line-height: 20px;
  color: #d5ccff;
`;

export const ButtonLogOut = styled.TouchableOpacity``;

export const ContainerPlace = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const InfoText = styled.Text`
  font-size: 32px;
  color: #ffffff;
  font-weight: bold;
`;

export const ContentPlace = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PlaceText = styled.Text`
  margin-left: 8px;
  font-size: 15px;
  color: #d5ccff;
`;

export const ContainerSearch = styled.View`
  margin-top: 18px;
`;

export const ContentSearch = styled.View<ContentSearchProps>`
  flex-direction: row;
  align-items: center;
  background: #fff;
  margin-top: 8px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 18px;
  padding-left: 18px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  ${(props) =>
    !props.modalSearch &&
    css`
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    `}
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#BEBCCC',
})`
  flex-grow: 1;
  margin-right: 6px;
  font-size: 15px;
  color: #6f6c80;
`;

export const ContainerModal = styled.View`
  background: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const ContentDeliverie = styled.TouchableOpacity`
  height: 56px;
  justify-content: center;
  border-top-width: 1px;
  border-top-color: #dad7e0;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 18px;
  padding-left: 18px;
`;

export const StreetText = styled.Text`
  font-size: 15px;
  color: #6f6c80;
`;
