import React from 'react';
import { loader, loader_size_big, loader_size_small } from './Loader.module.css';
import LoaderImage from './loader.svg';

const Loader = React.memo(function ({ size }) {
  return (
    <img
      src={LoaderImage}
      alt="Лоадер"
      className={`${loader} ${size === 'big' ? loader_size_big : loader_size_small}`}
    />
  );
});

export default Loader;
