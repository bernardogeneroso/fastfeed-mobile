import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const Content = styled.View`
  flex: 1;
  margin-top: 30px;
`;

export const MessageText = styled.Text`
  font-size: 48px;
  font-style: italic;
  font-weight: bold;
  color: #fff;
`;

export const MessageStyleText = styled.Text`
  color: #f6c200;
`;

export const InfoText = styled.Text`
  width: ${width * 0.6};
  font-size: 15px;
  line-height: 25px;
  color: #d5ccff;
  margin-top: 30px;
`;

export const ContainerAddress = styled.View`
  margin-top: 50px;
`;

export const AddressTitle = styled.Text`
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
`;

export const AddressText = styled.Text`
  font-size: 15px;
  line-height: 25px;
  color: #d5ccff;
  width: ${width * 0.5};
  margin-top: 10px;
`;

export const ButtonFooter = styled.TouchableOpacity`
  margin-bottom: 30px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonFooterText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;
