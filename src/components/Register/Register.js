import React from 'react';
import './Register.css';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../utils/Validation';

const Register = (props) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    props.handleRegister({
      name: values.name,
      login: values.login,
      password: values.password,
    });
  };

  React.useEffect(() => {
    resetForm();
    props.setApiError('');
  }, [props, resetForm]);

  return (
    <Form
      header='Добро пожаловать!'
      button='Зарегистрироваться'
      text='Уже зарегистрированы?'
      route='/signin'
      link='Войти'
      nameIsUsed={true}
      isValid={isValid}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errors={errors}
      values={values}
      blockForm={props.blockForm}
      registerError={props.registerError}
    ></Form>
  );
};

export default Register;
