// src/components/ProtectedPaymentRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import api from '../api/api'; // Certifique-se que o caminho para sua API está correto
import AlreadyPremiumPage from './AlreadyPremiumPage'; // Importa a página de usuário já premium

const ProtectedPaymentRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation(); // Para redirecionar de volta após login, se necessário

  useEffect(() => {
    const checkPaymentAccess = async () => {
      try {
        // Você pode precisar enviar dados específicos para este endpoint.
        // Exemplo: ID do pedido, informações do usuário, etc.
        // const payload = { /* seus dados aqui */ };
        // const response = await api.post('/seu-endpoint-verificacao-pagamento', payload);

        // Por enquanto, vamos simular uma chamada genérica
        const response = await api.post('/verifyPremium');

        if (response.status === 200) {
          setIsAuthorized(true);
        } else {
          // Se não for 200, a lógica de redirecionamento será tratada abaixo
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Erro na verificação de acesso ao pagamento:", error);
        setIsAuthorized(false); // Considera não autorizado em caso de erro
      } finally {
        setIsLoading(false);
      }
    };

    checkPaymentAccess();
  }, []); // Executa apenas na montagem do componente

  if (isLoading) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          {/* Exemplo de um spinner simples com CSS inline, substitua pelo seu componente de loading preferido */}
          <div style={{
            border: '4px solid rgba(0, 0, 0, 0.1)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            borderLeftColor: '#09f',
            animation: 'spin 1s ease infinite'
          }}></div>
          <style>
            {`
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}
          </style>
        </div>
      );
  }

  if (!isAuthorized) {
    // Redireciona para '/outraPagina' se não estiver autorizado
    // Passa a localização atual para que a 'OutraPagina' possa, se necessário,
    // redirecionar de volta após alguma ação.
    return <AlreadyPremiumPage />;
  }

  return children; // Renderiza a página de pagamento se autorizado
};

export default ProtectedPaymentRoute;