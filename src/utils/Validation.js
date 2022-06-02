import React, { useCallback } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
const validator = require('validator');

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });

    if (name === 'login') {
      if (!validator.isEmail(value)) {
        setIsValid(false);
        setErrors({ ...errors, [name]: 'E-mail неверный' });
      } else if (value === currentUser.email) {
        setIsValid(false);
        setErrors({ ...errors, [name]: '' });
      } else {
        setIsValid(target.closest('form').checkValidity());
        setErrors({ ...errors, [name]: '' });
      }
    } else if (name === 'name') {
      const regex = /^[a-zA-Zа-яА-Я -]{2,30}$/;
      if (!regex.test(value)) {
        setIsValid(false);
        setErrors({
          ...errors,
          [name]:
            'Поле name должно содержать только латиницу, кириллицу, пробел или дефис',
        });
      } else if (value === currentUser.name) {
        setIsValid(false);
        setErrors({ ...errors, [name]: '' });
      } else {
        setIsValid(target.closest('form').checkValidity());
        setErrors({ ...errors, [name]: '' });
      }
    } else {
      setIsValid(target.closest('form').checkValidity());
      setErrors({ ...errors, [name]: target.validationMessage });
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
