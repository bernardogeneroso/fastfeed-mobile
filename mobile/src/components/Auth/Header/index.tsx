import React from 'react';

import {Container, HeaderImageLeft, HeaderImageRight} from './styles';

import logo from '../../../../assets/images/logos/logo.png';
import logoName from '../../../../assets/images/logos/logo_name.png';

const Header = () => {
  return (
    <Container>
      <HeaderImageLeft source={logo} />
      <HeaderImageRight source={logoName} />
    </Container>
  );
};

export default Header;
