import React, { useState } from 'react';
import {
  button_type_buy,
  input,
  registration,
  registration__form,
  widget_size_m,
  widget__body,
  header,
  heading,
} from './styles';

const storage = window.localStorage;

const Registration = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const inputValue = document.forms['registration']['input'].value;
    storage.setItem('TELEGRAM_BOT_TOKEN', JSON.stringify(inputValue));

    window.location.reload();
  };

  return (
    <div className={registration}>
      <article className={widget_size_m}>
        <header className={header}>
          <h2 className={heading}>Регистрация</h2>
        </header>

        <div className={widget__body}>
          <form className={registration__form} name="registration" onSubmit={handleFormSubmit}>
            <input className={input} type="text" name="input" placeholder="TELEGRAM_BOT_TOKEN" />
            <button className={button_type_buy} type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </article>
    </div>
  );
};

export default Registration;
