import React from 'react';
import styles from './Button.module.css';

const Button = ({ bgColor, children, type, onClick }) => {
  return (
    <div>
      <button
        style={{ backgroundColor: bgColor }}
        className={`${styles.btn} ${styles[type]}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};
export default Button;
