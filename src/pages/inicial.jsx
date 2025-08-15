import React from "react";
import "../styles/inicial.css"; // Certifique-se que este é o caminho para o CSS refatorado
import { useNavigate } from 'react-router-dom'; 
import { useState, useEffect, useCallback } from "react";
import SignUpIcon from "../components/SignUp";
import DownloadIcon from "../components/Donwload";
import VideoPlayerIcon from "../components/Video";
import HorizontalCarousel from "../components/HorizontalCarrossel";

function App() {
  const navigate = useNavigate();

  const handleDownload = useCallback(() => {
      navigate('/download');
    }, [navigate]);

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  
  if (!isVisible) {
    return null;
  }

  return (  
    <div className="main">

      {/* Botões fixos do canto superior direito */}
      <div className="botoesloginup-container">
        <button className="login" onClick={() => navigate('/Login')}>Login</button>
        <button className="signup" onClick={() => navigate('/cadastro')}>Cadastre-se</button>
      </div>

      {/* ========================================================= */}
      {/* === INÍCIO DA ESTRUTURA CORRIGIDA === */}
      {/* ========================================================= */}
      <div className="hero-content-container">
        <img className="Background" src="BackGround.png"></img>
        <div className="caixa-texto-chamativa">
          <h1>O software para sua graduação</h1>
        </div>
        <div className="caixa-texto-subchamativa">
          <h1>Otimize seu tempo e suas chances de garantir sua vaga nas <br />matérias desejadas na matrícula extraordinária</h1>
        </div>
        <div className="centralizedDiv">
          <button className="botao-CTA" onClick={() => navigate('/cadastro')}>
            Cadastre-se <span className="arrow">➜</span>
          </button>
          <button className="botao-Login" onClick={() => navigate('/login')}>
            Já tenho uma conta? Fazer login
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* === FIM DA ESTRUTURA CORRIGIDA === */}
      {/* ========================================================= */}

    <div className="Passos-Total">
      <div className="como-funciona">
        <h1>Como Funciona?</h1>
        <h2>Três passos simples para garantir sua vaga.</h2>
      </div>

      <div className="passo-container" id="passoapasso">
      <div className="filhos">

        <div className="borda">
          <div className="Content">
            <div className="alinhartitulo">
              <SignUpIcon />
              <h1>Cadastre-se e faça login</h1>
            </div>
            <h2>Crie sua conta e conecte com segurança. Tudo pronto em menos de 1 minuto</h2>
          </div>
        </div>

        <div className="borda">
          <div className="Content">
            <div className="alinhartitulo">
              <DownloadIcon />
              <h1>Baixe o UnBot</h1>
            </div>
            <h2>Instale o UnBot no seu computador e faça login com a mesma conta.</h2>
          </div>
        </div>


        <div className="borda">
          <div className="Content">
            <div className="alinhartitulo">
              <VideoPlayerIcon />
              <h1>Escolha a matéria e inicie</h1>
            </div>
            <h2>Defina turma e código que o UnBot monitora e confirma sua matrícula automaticamente.</h2>
          </div>
        </div>

      </div>
      </div>
    </div>  

    <div className="review-header">
      <h1>O que nossos usuários dizem</h1>
      <h2>Histórias reais de quem transformou sua matrícula com o UnBot.</h2>
    </div>

     <HorizontalCarousel />

      <div className="container-free">
        <div className="content">
          <h1>
            <span style={{fontSize: '1.2em'}}>Garanta seu bot</span> <span className="highlight" style={{fontSize: '1em'}}>imediatamente</span>!
          </h1>
          <p>
            1 bot gratuito, infinitas possibilidades de matérias. Disponível apenas durante a matrícula extraordinária. Garanta Já!
          </p>
          <button className="btn" onClick={() => navigate('/cadastro')}>Teste Grátis</button>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-logo-info">
            <img src="logo2.svg" alt="Logo da Empresa" className="logoFOO" />
            <h1 className="company-nameFoo">UnBot</h1>
          </div>
          <div className="footer-links">
            <button className="download" onClick={handleDownload}>
              Baixar o Unbot
            </button>
            <a href="/cadastro">Teste Grátis</a>
          </div>
        </div>
        <div className="footer-text">
          &copy;2025 UnBot Technologies.LTDA <br />
          Todos os direitos reservados. As diversas marcas comerciais pertencem aos respectivos proprietários.
        </div>
      </footer>
    </div> 
  );
}

export default App;
