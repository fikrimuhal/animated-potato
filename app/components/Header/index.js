import React from 'react';

import SubHeader from './SubHeader';

/**
 * Import locally scoped styles using css-loader
 * See style.sass in this directory.
 *
 * More info: https://github.com/webpack/css-loader#local-scope
 */
import styles from './style';

/**
 * Reference an image and get back a URL automatically via webpack.
 * webpack takes care of versioning, bundling for production, etc.
 */
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
