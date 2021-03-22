import React from 'react';

import {AuthProvider} from './Auth';
import {DeliveriesProvider} from './DeliveriesManager';

const AppProvider: React.FC = ({children}) => (
  <AuthProvider>
    <DeliveriesProvider>{children}</DeliveriesProvider>
  </AuthProvider>
);

export default AppProvider;
