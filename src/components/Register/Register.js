import './Register.css';
import Form from '../Form/Form';

const Register = () => {
  return (
    <Form
      header='Добро пожаловать!'
      button='Зарегистрироваться'
      text='Уже зарегистрированы?'
      route='/signin'
      link='Войти'
      nameIsUsed={true}
    ></Form>
  );
};

export default Register;
