import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchData from '../../services/actions/fetchData';
import { header, header__currencies } from './styles';
import Loader from '../Loader/Loader';

const Header = () => {
  const dispatch = useDispatch();

  const balance = useSelector((state) => state.api.getBalance);
  const currencies = useSelector((state) => state.api.getPortfolioCurrencies);

  const updateBalance = () => dispatch(fetchData('getBalance'));
  const updateCurrencies = () => dispatch(fetchData('getPortfolioCurrencies'));

  useEffect(() => {
    updateBalance();

    const interval = setInterval(updateBalance, 45000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateCurrencies();

    const interval = setInterval(updateCurrencies, 50000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch({ type: 'PORTFOLIO_CURRENCIES_CHANGED', payload: [...Object.values(currencies.fetchedData)] });
  }, [currencies.fetchedData]);

  return (
    <header className={header}>
      <div>{(balance.isLoading && <Loader size="small" />) || balance.fetchedData}</div>
      <div className={header__currencies}>
        {(currencies.isLoading && <Loader size="small" />) ||
          currencies.fetchedData.map((currency) => {
            return (
              <div key={currency.currency}>
                {(currency.balance - (currency.blocked || 0)).toFixed(2)} {currency.currencySign}{' '}
                {currency.blocked ? `(блок: ${currency.blocked} ${currency.currencySign})` : ''}
              </div>
            );
          })}
      </div>
    </header>
  );
};

export default Header;
