import React, { useEffect, useState, useRef, useCallback } from 'react'; // Adicionado useCallback
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa'; // FaBell removido se não usado
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/HeaderBar.css';
import { useAuth } from '../contexts/AuthContext';
import api from "../api/api";
import { AiOutlineDownload } from "react-icons/ai"; 

// import { AiOutlineDownload } from "react-icons/ai"; // Removido se não usado

const HeaderBar = () => {
  const [username, setUsername] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dropdownRef = useRef(null);

  const [indicacoes, setIndicacoes] = useState(0); // Inicializado com 0 para evitar NaN em cálculos
  const [goalIndicacoes, setGoalIndicacoes] = useState(0); // Inicializado com 0

  // Busca o nome do usuário do cookie ao montar o componente
  useEffect(() => {
    const userFromCookie = Cookies.get('MatriculaSigaaBot');
    setUsername(userFromCookie || 'Usuário');
  }, []);

  // useEffect para buscar dados de indicações
  useEffect(() => {
    const checkIndicacoes = async () => {
      try {
        // console.log("HeaderBar: Fazendo requisição para /indicacoes...");
        const response = await api.post("/indicacoes");
        // console.log("HeaderBar: Resposta de /indicacoes (response.data):", response.data);

        if (response.data) {
          const numeroPremioFromAPI = response.data.numero_premio;
          const indicacoesFromAPI = response.data.indicacoes;

          // console.log("HeaderBar: Valor recebido para numero_premio:", numeroPremioFromAPI);
          // console.log("HeaderBar: Valor recebido para indicacoes:", indicacoesFromAPI);

          if (numeroPremioFromAPI !== undefined) {
            setGoalIndicacoes(Number(numeroPremioFromAPI) || 0); // Garante que é um número
          } else {
            // console.warn("HeaderBar: response.data.numero_premio é undefined. Estado goalIndicacoes não será alterado.");
          }

          if (indicacoesFromAPI !== undefined) {
            setIndicacoes(Number(indicacoesFromAPI) || 0); // Garante que é um número
          } else {
            // console.warn("HeaderBar: response.data.indicacoes é undefined. Estado indicacoes não será alterado.");
          }
        } else {
          // console.warn("HeaderBar: response.data é undefined ou null. Nenhum estado será alterado.");
        }
      } catch (error) {
        console.error("HeaderBar: Erro ao buscar dados de indicações:", error);
      }
    };

    checkIndicacoes();
  }, []); // Array de dependências vazio: executa uma vez após a montagem inicial

  // Debug logs (opcional, remover em produção)
  // useEffect(() => {
  //   console.log("HeaderBar: Estado goalIndicacoes ATUALIZADO:", goalIndicacoes);
  // }, [goalIndicacoes]);

  // useEffect(() => {
  //   console.log("HeaderBar: Estado indicacoes ATUALIZADO:", indicacoes);
  // }, [indicacoes]);

  // Otimização: Adiciona/remove o listener apenas quando o dropdown está aberto
  useEffect(() => {
    if (!isUserDropdownOpen) {
      return; // Não faz nada se o dropdown estiver fechado
    }

    const handleClickOutside = (event) => {
      // Verifica se dropdownRef.current existe e se o clique foi fora dele
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    // Adiciona o listener
    document.addEventListener('mousedown', handleClickOutside);

    // Função de limpeza: remove o listener quando o componente desmontar ou antes de re-executar o efeito
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserDropdownOpen]); // Dependência: re-executa se isUserDropdownOpen mudar

  const handleClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleRedirect = useCallback(() => {
    navigate('/payment/credit-card');
  }, [navigate]);

  const handleRedirectDonwload = useCallback(() => {
    navigate('/download');
  }, [navigate]);

  const toggleUserDropdown = useCallback(() => {
    setIsUserDropdownOpen(prevIsOpen => !prevIsOpen);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setIsUserDropdownOpen(false); // Fecha o dropdown ao deslogar
  }, [logout]);

  // Calcula a porcentagem para a barra de progresso
  // Evita divisão por zero e garante que a porcentagem não exceda 100%
  const progressPercentage = goalIndicacoes > 0
    ? Math.min((indicacoes / goalIndicacoes) * 100, 100)
    : 0;

  return (
    <div className="header-bar">
      <div className="header-left">
        <button className='homeTextButton' onClick={handleClick}><h1>UnBot</h1></button>
        <button className="ButtonShop" onClick={handleRedirect}>
          <FaShoppingCart className="CartIcon"/>
        </button>
      </div>
      <div className="header-right">
      <button className='ButtonShop' onClick={handleRedirectDonwload}>
          <AiOutlineDownload className="DownloadIcon"/>
        </button>
        <div className="user-menu-container" ref={dropdownRef}>
          <button onClick={toggleUserDropdown} className="user-icon-button" aria-expanded={isUserDropdownOpen} aria-label="User menu">
            <FaUserCircle className="icon" />
          </button>
          {isUserDropdownOpen && (
            <div className="user-dropdown">
              <div className="dropdown-item username-display">
                <span>{username}</span>
                <div className="referral-status-container">
                  <div className="referral-info">
                  <p class="info-indicacoes">Suas Indicações: <span class="referral-count">{indicacoes}</span></p>
                  </div>
                  {goalIndicacoes > 0 && ( // Mostra barra apenas se houver meta
                    <div className="referral-progress-wrapper">
                      <div
                        className="referral-progress-bar"
                        style={{ width: `${progressPercentage}%` }}
                        title={`${Math.round(progressPercentage)}% completo`}
                      >
                        {/* Opcional: mostrar porcentagem dentro da barra */}
                        {/* {Math.round(progressPercentage)}% */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button className="dropdown-item logout-button-dropdown" onClick={handleLogout}>
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;