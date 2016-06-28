import React from 'react';

import styles from './style';

const SubHeader = ({children}) => {
  return <h2 className={styles.tagline}>
    {children.split(' ').map((word,idx) => {
      const arr = word.split('');
      return (<span key={idx}><strong>{arr.shift()}</strong>{arr.join('')} </span>);
    })}
  </h2>;
};

SubHeader.displayName = 'SubHeader';

export default SubHeader;
