import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  input {
    padding: 0.6rem;
    border-radius: 5px;
    border: 1px solid #bbb;
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);

    &::placeholder {
      color: #bbb;
    }
  }

  strong {
    margin-top: 0.3rem;
    font-size: 0.7rem;
  }
`;
