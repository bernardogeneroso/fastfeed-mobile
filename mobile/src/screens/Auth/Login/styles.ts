import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import {CheckBox} from 'react-native-elements';

import logoTransparent from '../../../../assets/images/logos/logo_transparent.png';

interface ContainerInputProps {
  focus: boolean;
}

interface CheckBoxTextProps {
  checked: boolean;
}

export const Container = styled.ImageBackground.attrs({
  source: logoTransparent,
})`
  flex: 1;
  padding: 30px;
  background-color: #4c32cc;
`;

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
  margin-bottom: 10px;
  width: 160px;
`;

export const ContainerInput = styled.View<ContainerInputProps>`
  background: #fff;
  border-radius: 4px;
  border-width: 2px;
  border-color: ${(props) => (props.focus ? '#FFC042' : 'transparent')};
  height: 56px;
  flex-direction: row;
  align-items: center;
  padding: 4px 18px;
  margin-bottom: 8px;
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

export const ContainerError = styled.View`
  flex: 1;
  margin-top: -4px;
  margin-bottom: 4px;
  align-items: flex-end;
  padding: 0 2px;
`;

export const ErrorText = styled.Text`
  color: #ffc042;
`;

export const ContainerSettingsForm = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 4px 4px 4px -8px;
`;

export const ContentCheckBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CheckBoxData = styled(CheckBox)`
  margin-right: 8px;
`;

export const CheckBoxText = styled.Text<CheckBoxTextProps>`
  font-size: 13px;
  color: ${(props) => (props.checked ? '#ffc042' : '#d5ccff')};
`;

export const ButtonForgetPassword = styled.TouchableOpacity``;

export const ForgetPasswordText = styled.Text`
  font-size: 13px;
  color: #d5ccff;
`;

export const ButtonSubmit = styled(RectButton)`
  background: #ffc042;
  border-radius: 4px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

export const ButtonSubmitText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #4c4766;
`;
