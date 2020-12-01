import React from 'react';
import { hot } from 'react-hot-loader/root';

import GlobalStyle from './styles/global';
import FormExample from './pages/FormExample';

const App: React.FC = () => {
  return (
    <>
      <FormExample />
      <GlobalStyle />
    </>
  );
};

export default hot(App);
