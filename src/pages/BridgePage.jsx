// BridgePage.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const BridgePage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const matricula = searchParams.get('matricula');
    const auth = searchParams.get('auth');

    login(token, matricula);

    let timer;

    if (auth != "true") {
      timer = setTimeout(() => {
        navigate('/payment/pix');
      }, 500);
    }

    return () => {    if (timer) {
      clearTimeout(timer);
    }}
  }, 
  [location, navigate, login]);

  return (
    <>
      <div className="bridge-page">
        <div className="spinner"></div>
      </div>
      <style>{`
        .bridge-page {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f5f5f5;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 6px solid #ddd;
          border-top: 6px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default BridgePage;
