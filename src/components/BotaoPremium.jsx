import React, { useState } from 'react';
import './BotaoPremium.css'; // Criaremos este arquivo para o estilo

const BotaoPremium = () => {
  const [mostrarTooltip, setMostrarTooltip] = useState(false);

  return (
    <div
      className="premium-container"
      onMouseEnter={() => setMostrarTooltip(true)}
      onMouseLeave={() => setMostrarTooltip(false)}
    >
      <button className="premium-button">
        ⭐ Premium
      </button>
      {mostrarTooltip && (
        <div className="tooltip">
          Torne-se Premium e use bots ilimitados!
        </div>
      )}
    </div>
  );
};

export default BotaoPremium;