import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cadastro.css';
import api from '../api/api';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    matricula: '',
    senha: '',
    indicacao: '',
  });

  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setMessage('');
    setIsLoading(true); // Inicia o estado de carregamento

    try {
      const response = await api.post('/reset_pass', formData);
      const successMessage = response.data.message || 'Cadastro realizado com sucesso!';
      setMessage(successMessage);
      console.log(response.data);

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message || 'Erro desconhecido.');
      } else {
        setErrorMessage('Erro ao realizar o cadastro. Tente novamente.');
      }
      console.error('Erro ao cadastrar:', error);
    } finally {
      setIsLoading(false); // Finaliza o estado de carregamento
    }
  };

  return (
    <header className="header">
    <button className="header-button" onClick={() => navigate("/login")}> Login</button>

    <div className="containerlogin">
        <img src="blob.svg" className="blob" alt="Background Blob" />
        <div className="orbit"></div>

        <div className="loginpage">
          <img src="exam.png" className="logologin" alt="Logo" />
          <h2>Redefinir Senha</h2>
          <h3>Ps: Use os dados do SIGAA</h3>


      <div className="cadastro-right-login">
      <form className="form" onSubmit={handleSubmit}>
            <div className="textbox">
              <input
                type="text"
                name="matricula"
                value={formData.matricula}
                onChange={handleChange}
                required
              />
              <label>Matrícula</label>
              </div>

              <div className="textbox">
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
              <label>Senha</label>
            </div>
            <button className='button-PageCadastro'type="submit" disabled={isLoading}>
              {isLoading ? 'Carregando...' : 'Redefinir'}
            </button>

            {errorMessage && <div className="cadastro-error-message">{errorMessage}</div>}
            {message && <div className="cadastro-success-message">{message}</div>}
          
          </form>
      </div>
    </div>
    </div>
    </header>
  );
};

export default Cadastro;
