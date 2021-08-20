import React, { useEffect, useState } from 'react';
import InstrumentsTable from '../InstrumentsTable/InstrumentsTable';
import dragElement from '../../utils/dragElement';
import addInstrumentToLocalStorage from './utils/addInstrumentToLocalStorage';
import getInstrumentFromLocalStorage from './utils/getInstrumentFromLocalStorage';
import buildDataForRenderInTable from './utils/buildDataForRenderInTable';
import {
  header,
  header_draggable,
  heading,
  widget_size_m,
  widget__body,
  widget__empty,
  inputForm,
  input,
  button_type_buy,
} from './styles';

const Favorites = () => {
  const [inputValue, setInputValue] = useState('');
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    dragElement(document.querySelector('.favoritesDraggable'), 'favoritesDraggable');
  }, []);

  useEffect(() => {
    setFavorites(getInstrumentFromLocalStorage());
  }, []);

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value.toUpperCase());
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    addInstrumentToLocalStorage(inputValue);

    setFavorites(getInstrumentFromLocalStorage());

    setInputValue('');
  };

  const data = buildDataForRenderInTable(favorites, setFavorites);

  return (
    <article className={`${widget_size_m} favoritesDraggable`}>
      <header className={`${header} ${header_draggable}`}>
        <h2 className={heading}>Избранное</h2>
      </header>

      <div className={widget__body}>
        <form className={inputForm} onSubmit={handleFormSubmit}>
          <input
            value={inputValue}
            type="text"
            className={input}
            onInput={handleInputValueChange}
            name="inputTicker"
            placeholder="Введите тикер"
          />
          <button type="submit" className={button_type_buy}>
            Добавить
          </button>
        </form>
        <div className="instruments">
          {(favorites.instrumentsQuantity && <InstrumentsTable {...data} type="favorites" />) || (
            <div className={widget__empty}>В избранном пусто</div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Favorites;
