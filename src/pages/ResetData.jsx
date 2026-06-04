import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/resetData.css';
import api from '../api/api';
import Cookies from 'js-cookie';

const ResetData = () => {
  const [username, setUsername] = useState('');
  const [formData, setFormData] = useState({
    senha: '',
    cpf: '',
    nascimento: '',
  });


  useEffect(() => {
    const userFromCookie = Cookies.get('MatriculaSigaaBot');
    setUsername(userFromCookie || 'Usuário');

    const fetchUserData = async () => {
      try {
        const response = await api.post("/userData");
        // Verificamos se data existe para evitar erro de 'undefined'
        if (response.data) {
          const { cpf, nascimento } = response.data;

          setFormData(prev => ({
            ...prev,
            // Só sobrescreve se o valor retornado não for nulo/vazio
            cpf: cpf || prev.cpf,
            nascimento: nascimento || prev.nascimento
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  

  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Função para aplicar máscara de CPF (000.000.000-00)
  const maskCPF = (value) => {
    return value
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após os 3 primeiros dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após os 6 primeiros dígitos
      .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca hífen após os 9 primeiros dígitos
      .replace(/(-\d{2})\d+?$/, '$1'); // Impede mais de 11 dígitos
  };

  // Função para aplicar máscara de Data (00/00/0000)
  const maskDate = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})\d+?$/, '$1'); // Impede mais de 8 dígitos
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cpf' || name === 'nascimento') {
      // Guardamos APENAS os números no estado para o backend
      const onlyNums = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: onlyNums });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    const { cpf, nascimento } = formData;
    if ((cpf && !nascimento) || (!cpf && nascimento)) {
      setErrorMessage('Preencha CPF e Data de Nascimento juntos ou deixe ambos vazios.');
      return;
    }

    setIsLoading(true);
    try {
      // O envio continua enviando as strings puras (ex: 00000000000)
      const response = await api.post('/Update_userData', formData);
      setMessage(response.data.message || 'Dados atualizados!');
      setTimeout(() => navigate('/home'), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Erro ao atualizar dados.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="header">
      <button className="header-buttonP-1" onClick={() => navigate("/home")}>Home</button>
      <div className="containerlogin">
        <div className="loginPageResetData">
          <img src="exam.png" className="logologin" alt="Logo" />
          <h2>{username}</h2>
          <h3>Atualizar dados Cadastrais do UnBot</h3>

          <div className="cadastro-right-login">
            <form className="form" onSubmit={handleSubmit}>

              <div className="textbox">
                <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />
                <label>Senha</label>
              </div>

              {/* Divisor com Botão de Aviso */}
              <div className="warning-divider-container" onClick={openModal}>
                <div className="divider-line"></div>
                <div className="warning-pulse-button"><span>!</span></div>
                <div className="divider-line"></div>
              </div>

              {/* Input de CPF com Máscara Visual */}
              <div className="textbox">
                <input
                  type="text"
                  name="cpf"
                  value={maskCPF(formData.cpf)} // Aplica a máscara apenas na exibição
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                />
                <label>CPF (Opcional)</label>
              </div>

              {/* Input de Nascimento com Máscara Visual */}
              <div className="textbox">
                <input
                  type="text"
                  name="nascimento"
                  value={maskDate(formData.nascimento)} // Aplica a máscara apenas na exibição
                  onChange={handleChange}
                  placeholder="DD/MM/AAAA"
                />
                <label>Nascimento (Opcional)</label>
              </div>

              <button className='button-PageCadastro' type="submit" disabled={isLoading}>
                {isLoading ? 'Carregando...' : 'Atualizar Dados'}
              </button>

              {errorMessage && <div className="cadastro-error-message">{errorMessage}</div>}
              {message && <div className="cadastro-success-message">{message}</div>}
            </form>
          </div>
        </div>
      </div>

      {/* Modal Estilizada */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon-container"><span>🚀</span></div>
              <h3>Otimize seu Bot</h3>
            </div>
            <div className="modal-body">
              <p>Inserir o <strong>CPF</strong> e a <strong>Data de Nascimento</strong> é totalmente <strong>OPCIONAL</strong>.</p>
              <p className="highlight-text">
                No entanto, esses dados permitem que o UnBot identifique sua conta e consiga 
                <strong> pegar suas matérias muito mais rápido</strong>.
              </p>
              <div className="warning-box">
                <p>⚠️ <strong>Atenção:</strong> Inserir dados errados poderá impedir o funcionamento correto do bot.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-close-button-new" onClick={closeModal}>Entendi, vamos lá!</button>
            </div>
          </div>
        </div>
      )}
    </header>
    </>
  );
};

export default ResetData;