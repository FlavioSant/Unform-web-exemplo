import React, { useCallback, useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { Scope, FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Container } from './styles';
import Input from '../../components/Input';

interface FormData {
  name: string;
  email: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    number: string;
  };
}

interface Errors {
  [key: string]: string;
}

const FormExample: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: FormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório!'),
        email: Yup.string()
          .email('Digite um e-mail válido!')
          .required('E-mail obrigatório!'),
        address: Yup.object().shape({
          street: Yup.string().required('Rua obrigatório!'),
          neighborhood: Yup.string()
            .min(3, 'No mínimo 3 caracteres!')
            .required('Bairro obrigatório!'),
          city: Yup.string()
            .min(3, 'No mínimo 3 caracteres!')
            .required('Cidade Obrigatório!'),
          state: Yup.string()
            .min(3, 'No mínimo 3 caracteres!')
            .required('Estado obrigatório!'),
          number: Yup.string().required('Número obrigatório!'),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages: Errors = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current?.setErrors(errorMessages);
      }
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      formRef.current?.setData({
        name: 'Flavio Santos',
        email: 'email@hotmail.com',
        address: {
          street: 'Rua teste',
          neighborhood: 'Bairro teste',
          city: 'Bauru',
          state: 'São Paulo',
          number: '123',
        },
      });
    }, 2000);
  }, []);

  return (
    <Container>
      <h1>Exemplo Unform Web!</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome" />
        <Input type="email" name="email" placeholder="E-mail" />

        <Scope path="address">
          <Input name="street" placeholder="Rua" />
          <Input name="neighborhood" placeholder="Bairro" />
          <Input name="city" placeholder="Cidade" />
          <Input name="state" placeholder="Estado" />
          <Input name="number" placeholder="Número" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
};

export default FormExample;
