import React, {memo} from 'react';
import {format, parseISO} from 'date-fns';
import Icons from 'react-native-vector-icons/FontAwesome';

import {Deliveries} from '../../../../hooks/DeliveriesManager';

import {
  Container,
  Header,
  ContentPackage,
  PackageImage,
  PackageName,
  Date,
  Footer,
  DetailsText,
} from './styles';

import packageImage from '../../../../../assets/images/package/package.png';

interface DeliverieItemProps {
  deliverie: Deliveries;
}

const DeliverieItem: React.FC<DeliverieItemProps> = ({deliverie}) => {
  return (
    <Container style={{marginVertical: 5}}>
      <Header>
        <ContentPackage>
          <PackageImage source={packageImage} />
          <PackageName>{deliverie.product}</PackageName>
        </ContentPackage>

        <Date>{format(parseISO(deliverie.created_at), 'dd/MM/yyyy')}</Date>
      </Header>

      <Footer>
        <DetailsText>Detalhes</DetailsText>

        <Icons name="long-arrow-right" size={16} color="#6F6C80" />
      </Footer>
    </Container>
  );
};

export default memo(DeliverieItem);
