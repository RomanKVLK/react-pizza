import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <>
      <h1 className={styles.root}>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.descr}>
        К сожалению данная страница отсутствует в нашем интернет-магазине
      </p>
    </>
  );
};

export default NotFoundBlock;
