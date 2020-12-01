import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1.5rem;

  form {
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 600px;
    margin-top: 1rem;

    div + div {
      margin-top: 0.5rem;
    }

    button {
      padding: 0.8rem;
      margin-top: 1rem;
      border: 0;
      border-radius: 5px;
      font-weight: bold;
      color: #fff;
      background: #5c3cb5;
      transition: background 0.2s;

      &:hover {
        background: #5438a1;
      }
    }
  }
`;
