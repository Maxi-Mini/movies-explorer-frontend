import React from 'react';
import './Login.css';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../utils/Validation';
import { useEffect } from 'react';

const Login = (props) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    props.handleLogin({
      login: values.login,
      password: values.password,
    });
  }

  useEffect(() => {
    resetForm();
    props.setApiError('');
  }, [props, resetForm]);

  return (
    <Form
      header='Рады видеть!'
      button='Войти'
      text='Ещё не зарегистрированы?'
      route='/signup'
      link='Регистрация'
      nameIsUsed={false}
      values={values}
      errors={errors}
      isValid={isValid}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      registerError={props.registerError}
      blockForm={props.blockForm}
    ></Form>
  );
};

export default Login;
