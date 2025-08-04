import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
        setError("Não foi possível conectar ao servidor. Verifique sua conexão ou tente mais tarde.");
      } else {
        setError("Ocorreu um erro ao tentar fazer login.");
      }
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) {
    return null;
  }

    return (      
      <header className="header">
        <button className="header-buttonP" onClick={() => navigate("/")}> Página Inicial</button>
        <button className="header-button2C" onClick={() => navigate("/Cadastro")}>Cadastre-se</button>

      <div className="containerlogin">
        <img src="blob.svg" className="blob" alt="Background Blob" />
        <div className="orbit"></div>

        <div className="loginpage">
          <img src="logo.png" className="logologin" alt="Logo" />
          <h2>UnBot Login</h2>
          <h3>Garanta sua Matrícula Já!</h3>

          <form className="form" onSubmit={handleLogin}>
            <div className="textbox">
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label>Usuário</label>
            </div>
            <div className="textbox">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Senha</label>
            </div>

            <button
              className={`btn-login ${loading ? "loading" : ""}`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Entrar"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
          <a href="/reset_password" className="login-resetPass">Esqueceu sua senha?</a>
          <p className="footerlogin">
            Não possui uma Conta? <a href="/Cadastro">Registre-se!</a>
          </p>
        </div>
      </div>
      </header>
    );
  }

  export default LoginPage;
