import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiCreditCard,
  FiEye,
  FiEyeOff,
  FiInfo,
  FiLock,
  FiSave,
  FiUser,
  FiX,
  FiZap,
} from 'react-icons/fi';
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
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const reduce = useReducedMotion();

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

  const ease = [0.16, 1, 0.3, 1];

  return (
    <div className="ubr">
      <main className="ubr__stage">
        <motion.div
          className="ubr__card"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <a className="ubr__back" onClick={() => navigate("/home")}>
            <FiArrowLeft /> Voltar ao painel
          </a>

          <div className="ubr__brand">
            <img src="/favicon.svg" alt="UnBot" />
            <span>UnBot</span>
          </div>

          <h1 className="ubr__title">
            Atualizar <em>dados</em>.
          </h1>
          <p className="ubr__subtitle">
            Mantenha o UnBot em dia com o que o SIGAA espera.
          </p>

          <span className="ubr__account">
            <FiUser aria-hidden />
            {username}
          </span>

          <form className="ubr__form" onSubmit={handleSubmit} noValidate>

            <div className="ubr__field">
              <label htmlFor="senha">Senha</label>
              <div className="ubr__input">
                <FiLock aria-hidden />
                <input
                  id="senha"
                  type={showPass ? "text" : "password"}
                  name="senha"
                  autoComplete="current-password"
                  placeholder="sua senha do SIGAA"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="ubr__toggle"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Divisor com Botão de Aviso */}
            <button
              type="button"
              className="ubr__optsplit"
              onClick={openModal}
            >
              <span className="ubr__optline" />
              <span className="ubr__opthint">
                <FiInfo />
                Dados opcionais (acelera o bot)
              </span>
              <span className="ubr__optline" />
            </button>

            {/* Input de CPF com Máscara Visual */}
            <div className="ubr__field">
              <label htmlFor="cpf">
                CPF <span className="ubr__opt">(opcional)</span>
              </label>
              <div className="ubr__input">
                <FiCreditCard aria-hidden />
                <input
                  id="cpf"
                  type="text"
                  name="cpf"
                  inputMode="numeric"
                  value={maskCPF(formData.cpf)} // Aplica a máscara apenas na exibição
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                />
              </div>
            </div>

            {/* Input de Nascimento com Máscara Visual */}
            <div className="ubr__field">
              <label htmlFor="nascimento">
                Nascimento <span className="ubr__opt">(opcional)</span>
              </label>
              <div className="ubr__input">
                <FiCalendar aria-hidden />
                <input
                  id="nascimento"
                  type="text"
                  name="nascimento"
                  inputMode="numeric"
                  value={maskDate(formData.nascimento)} // Aplica a máscara apenas na exibição
                  onChange={handleChange}
                  placeholder="DD/MM/AAAA"
                />
              </div>
            </div>

            {errorMessage && (
              <motion.p
                className="ubr__error"
                initial={reduce ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
              >
                <FiAlertCircle aria-hidden />
                {errorMessage}
              </motion.p>
            )}
            {message && (
              <motion.p
                className="ubr__success"
                initial={reduce ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
              >
                <FiCheckCircle aria-hidden />
                {message}
              </motion.p>
            )}

            <button
              className="ubr-btn ubr__submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="ubr__spinner" aria-hidden />
                  Carregando...
                </>
              ) : (
                <>
                  Atualizar dados
                  <FiSave />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>

      {/* Modal Estilizada */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="ubr-modal__overlay"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="ubr-modal"
              onClick={(e) => e.stopPropagation()}
              initial={reduce ? false : { opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease }}
            >
              <button
                className="ubr-modal__x"
                onClick={closeModal}
                aria-label="Fechar"
              >
                <FiX />
              </button>

              <div className="ubr-modal__head">
                <span className="ubr-modal__icon">
                  <FiZap />
                </span>
                <h3>Otimize seu bot</h3>
              </div>

              <div className="ubr-modal__body">
                <p>
                  Inserir o <strong>CPF</strong> e a{" "}
                  <strong>Data de Nascimento</strong> é totalmente{" "}
                  <strong>opcional</strong>.
                </p>
                <p>
                  Mas esses dados permitem que o UnBot identifique sua conta e
                  consiga <strong>pegar suas matérias muito mais rápido</strong>.
                </p>
                <div className="ubr-modal__warn">
                  <FiAlertTriangle aria-hidden />
                  <span>
                    <strong>Atenção:</strong> dados errados podem impedir o
                    funcionamento correto do bot.
                  </span>
                </div>
              </div>

              <button className="ubr-btn ubr-modal__cta" onClick={closeModal}>
                Entendi, vamos lá!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`body { background: #f5f5f7; }`}</style>
    </div>
  );
};

export default ResetData;
