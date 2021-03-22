import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
`;

export const Header = styled.View`
  padding: 22px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentPackage = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PackageImage = styled.Image`
  margin-right: 8px;
`;

export const PackageName = styled.Text`
  font-family: 'Roboto Condensed';
  font-weight: bold;
  font-size: 22px;
  line-height: 24px;
  color: #4c4766;
`;

export const Date = styled.Text``;

export const Footer = styled.TouchableOpacity`
  padding: 22px;
  flex-direction: row;
  align-items: center;
  height: 48px;
  background: #fff1d6;
  justify-content: space-between;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const DetailsText = styled.Text`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 15px;
  color: #4c4766;
`;
