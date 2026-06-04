import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
} from "react-icons/fi";
import api from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/inicial.css";
import "../styles/Login.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", { username, password });

      if (response.data && response.data.user) {
        login(response.data.user, response.data.matricula);
        setTimeout(() => {
          navigate("/home");
        }, 1);
      } else {
        console.log("Username não encontrado na resposta.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          const { code, msg } = error.response.data;
          console.log("Código retornado pelo servidor:", code);
          console.log("Mensagem retornada pelo servidor:", msg);
          setError(msg);
        } else {
          console.log(`Erro no servidor: ${error.response.status}`);
          setError(`Requisição Inesperada`);
        }
      } else if (error.request) {
        setError(
          "Não foi possível conectar ao servidor. Verifique sua conexão ou tente mais tarde."
        );
      } else {
        setError("Ocorreu um erro ao tentar fazer login.");
      }
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
  };

  const ease = [0.16, 1, 0.3, 1];

  return (
    <div className="ub-landing ub-auth">
      <div className="ub-grain" aria-hidden />
      <div className="ub-auth__aurora" aria-hidden />
      <div className="ub-auth__bggrid" aria-hidden />

      <main className="ub-auth__stage">
        <div className="ub-auth__pulse" aria-hidden>
          <span className="ub-auth__ring" />
          <span className="ub-auth__ring" />
          <span className="ub-auth__ring" />
        </div>

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
            Bem-vindo de <span className="ub-grad">volta.</span>
          </h1>
          <p className="ub-auth__subtitle">
            Entre e garanta sua matrícula enquanto você dorme.
          </p>

          <form className="ub-auth__form" onSubmit={handleLogin} noValidate>
            <div className="ub-field">
              <label htmlFor="username">Usuário</label>
              <div className="ub-input">
                <FiUser aria-hidden />
                <input
                  id="username"
                  type="text"
                  name="username"
                  autoComplete="username"
                  placeholder="seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="ub-field">
              <label htmlFor="password">Senha</label>
              <div className="ub-input">
                <FiLock aria-hidden />
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <a href="/reset_password" className="ub-auth__forgot">
                Esqueceu sua senha?
              </a>
            </div>

            {error && (
              <motion.p
                className="ub-auth__error"
                initial={reduce ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
              >
                <FiAlertCircle aria-hidden />
                {error}
              </motion.p>
            )}

            <button
              className={`ub-btn ub-btn--solid ub-btn--lg ub-auth__submit ${
                loading ? "is-loading" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="ub-auth__spinner" aria-hidden />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <p className="ub-auth__footer">
            Não possui uma conta?{" "}
            <a href="/Cadastro" className="ub-auth__link">
              Registre-se!
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  );
}

export default LoginPage;
