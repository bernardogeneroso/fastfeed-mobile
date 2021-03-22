import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import api from '../services/api';
import {useAuth} from './Auth';

export interface Deliveries {
  id: string;
  product: string;
  address: string;
  postal_code: string;
  city: string;
  state: string;
  deliveryman_id: string;
  canceled_at: Date | null;
  start_date: Date | null;
  end_date: Date | null;
  signature_id: string;
  created_at: string;
  updated_at: string;
}

export interface FilterDeliveries {
  id: string;
  address: string;
}

interface DeliveriesContextData {
  deliveries: Deliveries[] | undefined;
  loading: boolean;
  headerFilterDeliveries: FilterDeliveries[] | undefined;
  handleHeaderFilterValue(value: string): void;
}

const DeliveriesContext = createContext<DeliveriesContextData>(
  {} as DeliveriesContextData,
);

const DeliveriesProvider: React.FC = ({children}) => {
  const {user} = useAuth();

  const [deliveries, setDeliveries] = useState<Deliveries[] | undefined>(
    undefined,
  );
  const [headerFilterValue, setHeaderFilterValue] = useState<string>('');
  const [headerFilterDeliveries, setHeaderFilterDeliveries] = useState<
    FilterDeliveries[] | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      api.get(`/delivers/${user.id}`).then(({data}) => {
        setDeliveries(data);
        setLoading(false);
      });
    }
  }, [user]);

  useEffect(() => {
    if (headerFilterValue !== '' && user) {
      api
        .get<Deliveries[]>(`/delivers/${user.id}?search=${headerFilterValue}`)
        .then(({data}) => {
          const filterData = data.map(({id, address}: Deliveries) => {
            return {
              id,
              address,
            };
          });

          setHeaderFilterDeliveries(filterData);
        });

      return;
    }

    setHeaderFilterDeliveries(undefined);
  }, [headerFilterValue, user]);

  const handleHeaderFilterValue = useCallback((value: string) => {
    setHeaderFilterValue(value);
  }, []);

  return (
    <DeliveriesContext.Provider
      value={{
        deliveries,
        loading,
        headerFilterDeliveries,
        handleHeaderFilterValue,
      }}>
      {children}
    </DeliveriesContext.Provider>
  );
};

function useDeliveries(): DeliveriesContextData {
  const context = useContext(DeliveriesContext);

  if (!context) {
    throw new Error('useDeliveries must be used within an DeliveriesProvider');
  }

  return context;
}

export {DeliveriesProvider, useDeliveries};
