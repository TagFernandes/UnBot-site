// src/components/PixButton.jsx

import React from 'react';
import styles from './PixButton.module.css';

// Ícone do Pix embutido para facilitar
const PixIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22h-1a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H6a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2" />
    <path d="M22 12v-1a2 2 0 0 0-2-2h-1a2 2 0 0 1-2-2V6a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 1 2 2h1a2 2 0 0 0 2 2v1a2 2 0 0 1-2 2h-1" />
    <path d="M12 2v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1a2 2 0 0 1-2-2h-1a2 2 0 0 0-2-2V2" />
    <path d="M2 12h1a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1a2 2 0 0 1-2-2H2" />
  </svg>
);

const PixButton = ({ onClick }) => {
  return (
    <button className={styles.pixButton} onClick={onClick}>
      <PixIcon />
      <span>Pagar com Pix</span>
    </button>
  );
};

export default PixButton;