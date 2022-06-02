import './Login.css';
import Form from '../Form/Form';

const Login = () => {
  return(
    <Form
    header='Рады видеть!'
    button='Войти'
    text='Ещё не зарегистрированы?'
    route='/signup'
    link='Регистрация'
    nameIsUsed={false}
  ></Form>
  )
};

export default Login;
