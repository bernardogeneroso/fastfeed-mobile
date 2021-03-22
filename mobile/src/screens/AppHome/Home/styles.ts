import styled, {css} from 'styled-components/native';
import {FlatList} from 'react-native-gesture-handler';

interface DeliveriesListHeaderLineProps {
  leftOrRight: 0 | 1;
}

export const Container = styled.View`
  flex: 1;
`;

export const ContainerDeliveries = styled.View``;

export const DeliveriesList = styled(FlatList)`
  padding: 22px;
`;

export const DeliveriesListHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DeliveriesListHeaderLine = styled.View<DeliveriesListHeaderLineProps>`
  flex: 1;
  height: 1px;
  opacity: 0.6;
  background-color: #dad7e0;
  ${(props) =>
    props.leftOrRight === 0
      ? css`
          margin-right: 22px;
        `
      : css`
          margin-left: 22px;
        `}
`;

export const DeliveriesListText = styled.Text`
  font-size: 15px;
  color: #bebccc;
`;
