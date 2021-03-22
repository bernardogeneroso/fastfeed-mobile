import React, {useMemo} from 'react';

import {useDeliveries} from '../../../hooks/DeliveriesManager';
import Header from '../../../components/AppHome/Header';
import DeliverieItem from '../../../components/AppHome/DeliveriesList/DeliverieItem';

import {
  Container,
  ContainerDeliveries,
  DeliveriesList,
  DeliveriesListHeader,
  DeliveriesListHeaderLine,
  DeliveriesListText,
} from './styles';

const Home = () => {
  const {deliveries} = useDeliveries();

  const deliveriesQuantatyHeader = useMemo(() => {
    if (!deliveries) return;

    switch (deliveries.length) {
      case 0:
        return 'Sem entregas';
      case 1:
        return '1 entrega';
      case 2:
        return `${deliveries.length} entregas`;
      default:
        return `${deliveries.length} entregas`;
    }
  }, [deliveries]);

  return (
    <Container>
      <Header />

      <ContainerDeliveries>
        <DeliveriesList
          data={deliveries}
          keyExtractor={(deliverie) => deliverie.id}
          renderItem={({item: deliverie}) => <DeliverieItem {...{deliverie}} />}
          ListHeaderComponent={
            <DeliveriesListHeader>
              <DeliveriesListHeaderLine leftOrRight={0} />
              <DeliveriesListText>
                {deliveriesQuantatyHeader}
              </DeliveriesListText>
              <DeliveriesListHeaderLine leftOrRight={1} />
            </DeliveriesListHeader>
          }
          ListHeaderComponentStyle={{
            marginTop: 20,
            marginBottom: 2,
          }}
        />
      </ContainerDeliveries>
    </Container>
  );
};

export default Home;
