import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.message}>Oops! A página que você está procurando não existe.</p>
        <Link to="/" style={styles.link}>
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f6f8fa',
    color: '#333',
    fontFamily: "'Poppins', sans-serif",
    textAlign: 'center',
  },
  content: {
    maxWidth: '600px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    animation: 'fadeIn 1s ease',
  },
  title: {
    fontSize: '6rem',
    marginBottom: '20px',
    color: '#ff4757',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#555',
  },
  link: {
    display: 'inline-block',
    padding: '12px 25px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#1e90ff',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
};

export default NotFound;
