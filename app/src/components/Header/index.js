import React from 'react';
import SubHeader from './SubHeader';
import styles from './style';
import logoURL from './images/react-logo.svg';

const Header = () => {
  return <header className={styles.main}>
    <img className={styles.logo} src={logoURL} height="125"/>

    <div className={styles.wrap}>
      <h1 className={styles.title}>FİKRİMUHAL TEKNOLOJİ</h1>
      <SubHeader>Animated Potato</SubHeader>
    </div>
  </header>;
};


Header.displayName = 'Header';

export default Header;
