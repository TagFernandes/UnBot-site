// src/components/GradientDivider.jsx
import React from 'react';

const GradientDivider = ({ margin = '30px auto', height = '2px' }) => {
  const dividerStyle = {
    height: height,
    width: '90%',
    backgroundImage: `linear-gradient(to right, 
      rgba(100, 149, 237, 0),  /* Azul cornflower transparente */
      rgba(123, 104, 238, 0.75), /* Roxo ardósia médio com opacidade */
      rgba(173, 216, 230, 0)   /* Azul claro transparente */
    )`,
    // Outra opção de gradiente (Roxo -> Azul -> Roxo):
    // backgroundImage: `linear-gradient(to right,
    //   rgba(148, 0, 211, 0),      /* Violeta escuro transparente */
    //   rgba(75, 0, 130, 0.75),   /* Índigo com opacidade */
    //   rgba(0, 0, 255, 0)         /* Azul puro transparente */
    // )`,
    // Outra opção (Azul -> Roxo -> Azul):
    // backgroundImage: `linear-gradient(to right,
    //   rgba(65, 105, 225, 0),    /* Azul royal transparente */
    //   rgba(147, 112, 219, 0.8), /* Roxo médio com opacidade */
    //   rgba(65, 105, 225, 0)     /* Azul royal transparente */
    // )`,
    border: '0',
    margin: margin,
  };

  return <div style={dividerStyle}></div>;
};

export default GradientDivider;