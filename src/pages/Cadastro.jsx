import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiUser,
  FiLock,
  FiGift,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiZap,
  FiActivity,
  FiTarget,
  FiUsers,
  FiBookOpen,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/inicial.css";
import "../styles/Login.css";

/* pills decorativas flutuantes + linha que liga ao card (estilo AbacatePay) */
const PILLS = [
  // esquerda
  { icon: <FiClock />, label: "SIGAA 24/7", side: "l", pos: { top: "14%", left: "7%" }, path: "M40,50 C30,50 25,16 17,15" },
  { icon: <FiActivity />, label: "Snipe <1s", side: "l", pos: { top: "36%", left: "7%" }, path: "M40,50 C30,50 25,37 17,37" },
  { icon: <FiTarget />, label: "Matrícula garantida", side: "l", pos: { top: "58%", left: "7%" }, path: "M40,50 C30,50 25,58 17,59" },
  { icon: <FiBookOpen />, label: "UnB", side: "l", pos: { top: "80%", left: "7%" }, path: "M40,50 C30,50 25,80 17,81" },
  // direita
  { icon: <FiZap />, label: "Vagas em tempo real", side: "r", pos: { top: "14%", right: "7%" }, path: "M60,50 C70,50 75,16 83,15" },
  { icon: <FiActivity />, label: "Monitoramento ativo", side: "r", pos: { top: "36%", right: "7%" }, path: "M60,50 C70,50 75,37 83,37" },
  { icon: <FiTarget />, label: "Você dorme, ele snipa", side: "r", pos: { top: "58%", right: "7%" }, path: "M60,50 C70,50 75,58 83,59" },
  { icon: <FiUsers />, label: "Comunidade", side: "r", pos: { top: "80%", right: "7%" }, path: "M60,50 C70,50 75,80 83,81" },
];

const Cadastro = () => {
  const [formData, setFormData] = useState({
    matricula: "",
    senha: "",
    indicacao: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await api.post("/cadastro", formData);
      const successMessage =
        response.data.message || "Cadastro realizado com sucesso!";
      setMessage(successMessage);
      console.log(response.data);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message || "Erro desconhecido.");
      } else {
        setErrorMessage("Erro ao realizar o cadastro. Tente novamente.");
      }
      console.error("Erro ao cadastrar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const ease = [0.16, 1, 0.3, 1];

  return (
    <div className="ub-landing ub-auth">
      <div className="ub-grain" aria-hidden />
      <div className="ub-auth__aurora" aria-hidden />
      <div className="ub-auth__bggrid" aria-hidden />

      {/* decoração: linhas saindo do card + pills flutuantes */}
      <div className="ub-auth__pills" aria-hidden>
        <svg
          className="ub-auth__lines"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ubLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b388ff" />
              <stop offset="100%" stopColor="#e23bff" />
            </linearGradient>
          </defs>
          {PILLS.map((p) => (
            <path
              key={p.label}
              d={p.path}
              fill="none"
              stroke="url(#ubLineGrad)"
              strokeWidth="1"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="ub-auth__line"
            />
          ))}
        </svg>

        {PILLS.map((p, i) => (
          <motion.span
            key={p.label}
            className={`ub-auth__pill ub-auth__pill--${p.side}`}
            style={p.pos}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.08 }}
          >
            {p.icon}
            {p.label}
          </motion.span>
        ))}
      </div>

      <main className="ub-auth__stage">
        <motion.div
          className="ub-auth__card"
          initial={reduce ? false : { opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="ub-auth__glow" aria-hidden />

          <a className="ub-auth__back" onClick={() => navigate("/")}>
            <FiArrowLeft /> Página inicial
          </a>

          <div className="ub-auth__brand">
            <img src="favicon.svg" alt="UnBot" />
            <span>UnBot</span>
          </div>

          <h1 className="ub-auth__title">
            Crie sua <span className="ub-grad">conta.</span>
          </h1>
          <p className="ub-auth__subtitle">
            Use os mesmos dados do SIGAA para começar.
          </p>

          <form className="ub-auth__form" onSubmit={handleSubmit} noValidate>
            <div className="ub-field">
              <label htmlFor="matricula">Matrícula</label>
              <div className="ub-input">
                <FiUser aria-hidden />
                <input
                  id="matricula"
                  type="text"
                  name="matricula"
                  autoComplete="username"
                  placeholder="sua matrícula"
                  value={formData.matricula}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="ub-field">
              <label htmlFor="senha">Senha</label>
              <div className="ub-input">
                <FiLock aria-hidden />
                <input
                  id="senha"
                  type={showPass ? "text" : "password"}
                  name="senha"
                  autoComplete="new-password"
                  placeholder="sua senha do SIGAA"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="ub-input__toggle"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="ub-field">
              <label htmlFor="indicacao">
                Código de indicação <span className="ub-field__opt">(opcional)</span>
              </label>
              <div className="ub-input">
                <FiGift aria-hidden />
                <input
                  id="indicacao"
                  type="text"
                  name="indicacao"
                  placeholder="quem te indicou?"
                  value={formData.indicacao}
                  onChange={handleChange}
                />
              </div>
            </div>

            {errorMessage && (
              <motion.p
                className="ub-auth__error"
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
                className="ub-auth__success"
                initial={reduce ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
              >
                <FiCheckCircle aria-hidden />
                {message}
              </motion.p>
            )}

            <button
              className={`ub-btn ub-btn--solid ub-btn--lg ub-auth__submit ${
                isLoading ? "is-loading" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="ub-auth__spinner" aria-hidden />
                  Cadastrando...
                </>
              ) : (
                <>
                  Cadastrar
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <p className="ub-auth__footer">
            Já possui uma conta?{" "}
            <a
              className="ub-auth__link"
              onClick={() => navigate("/login")}
            >
              Entrar
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Cadastro;
