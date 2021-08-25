import React from 'react';
import { withModal } from './styles';
import { widget_size_m } from '../../blocks/widget/_size/widget_size_m.module.css';
import { header } from '../../blocks/header/header.module.css';
import { heading } from '../../blocks/heading/heading.module.css';
import { widget__body } from '../../blocks/widget/__body/widget__body.module.css';

const dic = {
  error: 'Ошибка',
  auth: 'Авторизация',
};

const WithModal = ({ Component, type }) => {
  return (
    <div className={withModal}>
      <article className={widget_size_m}>
        <header className={header}>
          <h2 className={heading}>{dic[type]}</h2>
        </header>

        <div className={widget__body}>
          <Component />
        </div>
      </article>
    </div>
  );
};

export default WithModal;
