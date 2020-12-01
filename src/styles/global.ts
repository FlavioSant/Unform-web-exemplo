import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0
  }

  body {
    background: #f7f7f7;
  }

  body, input, button {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }
`;
