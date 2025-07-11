import React from 'react';
// 1. Importe o CSS como um módulo
import styles from '../styles/downloadPage.module.css'; 
import { FaWindows } from 'react-icons/fa';

// Renomeando para DownloadPage para seguir a convenção de nomenclatura de arquivos
const DownloadPage = () => {
  const handleDownload = () => {
    // Redireciona para o link da Microsoft Store
    // Por enquanto, está redirecionando para o Google como solicitado
    window.location.href = 'https://www.google.com';
  };

  return (
    // 2. Aplique as classes usando a sintaxe de módulo (styles.nomeDaClasse)
    <div className={styles.downloadContainer}>
      <div className={styles.backgroundShapes}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
      </div>
      <header className={styles.downloadHeader}>
        <h1 className={styles.logo}>UnBot</h1>
        <nav>
          <a href="/" className={styles.navLink}>Página Inicial</a>
        </nav>
      </header>
      <main className={styles.downloadMain}>
        <div className={styles.content}>
          <h2 className={styles.title}>Tudo pronto para automatizar?</h2>
          <p className={styles.subtitle}>
            Faça o download do UnBot para Windows e comece a otimizar suas tarefas agora mesmo.
            Disponível na Microsoft Store.
          </p>
          <button className={styles.downloadButton} onClick={handleDownload}>
            <FaWindows className={styles.buttonIcon} />
            Baixar da Microsoft Store
          </button>
        </div>
        <div className={styles.imagePlaceholder}>
          <img src="/unbot-showcase.png" alt="Apresentação do aplicativo UnBot" />
          {/* Você pode adicionar uma imagem ou um vídeo do seu app aqui */}
        </div>
      </main>
    </div>
  );
};

export default DownloadPage;