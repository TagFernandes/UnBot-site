// src/components/AlreadyPremiumPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AlreadyPremiumPage.module.css'; // Correto

// Ícone de exemplo
// Como PremiumIcon é definido no mesmo arquivo, ele pode usar o objeto 'styles' diretamente.
const PremiumIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={styles.premiumIcon} // ALTERADO AQUI
    width="80"
    height="80"
  >
    {/* O conteúdo do SVG permanece o mesmo, mas veja a nota sobre estilos de SVG abaixo */}
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm4.293-9.293l-5.586 5.586-2.707-2.707a1 1 0 00-1.414 1.414l3.414 3.414a1 1 0 001.414 0l6.293-6.293a1 1 0 00-1.414-1.414zM12 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
    <path d="M12 7.5a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM12 11c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm0 4c-.551 0-1-.449-1-1s.449-1 1-1 1 .449 1 1-.449 1-1 1z" fill="gold" />
    <path d="M9.5 14c0 .827.673 1.5 1.5 1.5h2c.827 0 1.5-.673 1.5-1.5v-1h-5v1zm.5-3h4a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-4a.5.5 0 00-.5.5v1a.5.5 0 00.5.5zM12 4a2 2 0 100 4 2 2 0 000-4zM8 17a1 1 0 001 1h6a1 1 0 100-2H9a1 1 0 00-1 1z" fill="#ffc107" />
     <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 7h2v2h-2z" fill="rgba(0,0,0,0.1)" />
    <path fillRule="evenodd" d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5zM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12zm12.688 5.312l-5.25-5.25a.75.75 0 011.062-1.062l4.719 4.72 7.938-7.938a.75.75 0 111.062 1.062l-8.5 8.5a.75.75 0 01-1.062 0z" clipRule="evenodd" fill="url(#goldGradient)" />
    <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        {/* Para CSS Modules, style em JSX deve ser um objeto.
            No entanto, <stop> atributos são mais diretos e não precisam de 'style' aqui.
            Usar stopColor e stopOpacity diretamente é mais limpo.
        */}
        <stop offset="0%" stopColor="var(--premium-gold)" />
        <stop offset="100%" stopColor="var(--premium-dark-gold)" />
        </linearGradient>
    </defs>
  </svg>
);

const AlreadyPremiumPage = () => {
  return (
    <div className={styles.premiumContainer}> {/* ALTERADO */}
      <div className={styles.premiumCard}> {/* ALTERADO */}
        <div className={styles.shineOverlay}></div> {/* ALTERADO */}
        <PremiumIcon />
        <h1 className={styles.premiumTitle}>Você já é Premium! ✨</h1> {/* ALTERADO */}
        <p className={styles.premiumSubMessage}> {/* ALTERADO */}
          Continue aproveitando sua experiência elevada!
        </p>
        <Link to="/home" className={styles.premiumButton}> {/* ALTERADO */}
          Voltar ao home
        </Link>
      </div>
      <div className={styles.backgroundShapes}> {/* ALTERADO */}
        {/* Se as classes 'shape', 'shape1', etc. também estiverem no .module.css, altere-as */}
        <div className={`${styles.shape} ${styles.shape1}`}></div> {/* Exemplo de múltiplas classes */}
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
        <div className={`${styles.shape} ${styles.shape4}`}></div>
        {/* Adicione styles.shape5 se existir */}
      </div>
    </div>
  );
};

export default AlreadyPremiumPage;