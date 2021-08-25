import React from 'react';
import { button_type_buy, input, registration__form } from './styles';

const storage = window.localStorage;

const Auth = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const inputValue = document.forms['registration']['input'].value;
    storage.setItem('TELEGRAM_BOT_TOKEN', JSON.stringify(inputValue));

    window.location.reload();
  };

  return (
    <form className={registration__form} name="registration" onSubmit={handleFormSubmit}>
      <input className={input} type="text" name="input" placeholder="TELEGRAM_BOT_TOKEN" />
      <button className={button_type_buy} type="submit">
        Сохранить
      </button>
    </form>
  );
};

export default Auth;
