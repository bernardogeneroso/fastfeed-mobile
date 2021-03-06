import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

interface ContainerInputProps {
  focus: boolean;
}

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 30px;
  background-color: #4c32cc;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

export const HeaderImageLogo = styled.Image`
  width: 40px;
  height: 44px;
`;

export const HeaderImageLogoName = styled.Image``;

export const Content = styled.View``;

export const Form = styled.View``;

export const WelcomeText = styled.Text`
  font-size: 48px;
  font-style: italic;
  color: #fff;
  font-weight: 700;
  width: 340px;
`;

export const WelcomeStyleText = styled.Text`
  font-size: 48px;
  font-style: italic;
  color: #f6c200;
  font-weight: 700;
  margin-top: 60px;
`;

export const InformationText = styled.Text`
  font-size: 15px;
  color: #d5ccff;
  margin-top: 10px;
  width: 160px;
`;

export const ContainerInput = styled.View<ContainerInputProps>`
  background: #fff;
  border-radius: 4px;
  border-width: 2px;
  border-color: ${(props) => (props.focus ? '#FFC042' : 'transparent')};
  height: 56px;
  margin-bottom: 14px;
  flex-direction: row;
  align-items: center;
  padding: 4px 18px;
`;

export const Divider = styled.View`
  height: 24px;
  border-width: 0.4px;
  border-color: #dad7e0;
  margin-left: 12px;
  margin-right: 12px;
`;

export const Input = styled.TextInput`
  flex: 1;
`;

export const ContainerEye = styled.TouchableOpacity``;

export const ButtonSubmit = styled(RectButton)`
  background: #ffc042;
  border-radius: 4px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
`;

export const ButtonSubmitText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #4c4766;
`;
