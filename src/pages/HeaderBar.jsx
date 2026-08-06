import React, { useEffect, useState, useRef, useCallback } from 'react'; // Adicionado useCallback
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/HeaderBar.css';
import { useAuth } from '../contexts/AuthContext';
import api from "../api/api";
import {
  FiDownload,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiEdit3,
  FiLogOut,
} from 'react-icons/fi';

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
        const response = await api.post("/indicacoes");

        if (response.data) {
          const numeroPremioFromAPI = response.data.numero_premio;
          const indicacoesFromAPI = response.data.indicacoes;

          if (numeroPremioFromAPI !== undefined) {
            setGoalIndicacoes(Number(numeroPremioFromAPI) || 0); // Garante que é um número
          }

          if (indicacoesFromAPI !== undefined) {
            setIndicacoes(Number(indicacoesFromAPI) || 0); // Garante que é um número
          }
        }
      } catch (error) {
        console.error("HeaderBar: Erro ao buscar dados de indicações:", error);
      }
    };

    checkIndicacoes();
  }, []); // Array de dependências vazio: executa uma vez após a montagem inicial

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

  const handleResetData = useCallback(() => {
    navigate('/resetData');
    setIsUserDropdownOpen(false); // Fecha o dropdown após clicar
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
    <header className="ub-topbar">
      <div className="ub-topbar__left">
        <button className="ub-topbar__brand" onClick={handleClick}>
          <img src="/favicon.svg" alt="" aria-hidden />
          <span>UnBot</span>
        </button>
      </div>

      <div className="ub-topbar__right">
        <button
          className="ub-topbar__action"
          onClick={handleRedirectDonwload}
          title="Baixar o aplicativo"
        >
          <FiDownload />
          <span>Baixar app</span>
        </button>

        <div className="ub-topbar__menu" ref={dropdownRef}>
          <button
            onClick={toggleUserDropdown}
            className="ub-topbar__user"
            aria-expanded={isUserDropdownOpen}
            aria-label="Abrir menu da conta"
          >
            <span className="ub-topbar__avatar" aria-hidden>
              <FiUser />
            </span>
            <span className="ub-topbar__ident">
              <span className="ub-topbar__ident-label">Minha conta</span>
              <span className="ub-topbar__ident-value">{username}</span>
            </span>
            <FiChevronDown className="ub-topbar__caret" aria-hidden />
          </button>

          {isUserDropdownOpen && (
            <div className="ub-drop">
              {/* STATUS DE INDICAÇÃO */}
              <div className="ub-drop__referral">
                <div className="ub-drop__pill">
                  <span className="ub-drop__pill-text">Indicações</span>
                  <span className="ub-drop__pill-num">{indicacoes}</span>
                </div>
                {goalIndicacoes > 0 && (
                  <>
                    <div className="ub-drop__track">
                      <div
                        className="ub-drop__fill"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="ub-drop__goal">
                      {indicacoes} de {goalIndicacoes} para o prêmio
                    </span>
                  </>
                )}
              </div>

              {/* BOTÃO COMPRAR BOTS */}
              <button className="ub-drop__item" onClick={handleRedirect}>
                <FiShoppingCart />
                <span>Comprar bots</span>
              </button>

              <div className="ub-drop__divider" />

              {/* BOTÃO ATUALIZAR DADOS */}
              <button className="ub-drop__item" onClick={handleResetData}>
                <FiEdit3 />
                <span>Atualizar dados</span>
              </button>

              <div className="ub-drop__divider" />

              {/* BOTÃO SAIR */}
              <button
                className="ub-drop__item ub-drop__item--danger"
                onClick={handleLogout}
              >
                <FiLogOut />
                <span>Sair da conta</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
