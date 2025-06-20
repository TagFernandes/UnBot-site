import React from 'react';
import styles from './CreditCardButton.module.css';

// Ícone de Cartão de Crédito
const CreditCardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const CreditCardButton = ({ onClick }) => {
  return (
    <button className={styles.cardButton} onClick={onClick}>
      <CreditCardIcon />
      <span>Pagar com Cartão</span>
    </button>
  );
};

export default CreditCardButton;