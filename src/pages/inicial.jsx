import React from "react";
import "../styles/inicial.css"; // Certifique-se que este é o caminho para o CSS refatorado
import { useNavigate } from 'react-router-dom'; 
import { useState, useEffect, useCallback } from "react";

function App() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

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

  const reviews = [
    {
      text: "Adeus, noites em claro! O UnBot garantiu minha vaga enquanto eu dormia. Simplesmente essencial.",
      name: "Ana",
      role: "Estudante de Engenharia",
      image: "https://randomuser.me/api/portraits/women/31.jpg",
    },
    {
      text: "Tecnologia que funciona de verdade. O UnBot resolve o problema das matrículas de forma brilhante e sem rodeios.",
      name: "Lucas",
      role: "Estudante de ciências da computação",
      image: "https://randomuser.me/api/portraits/men/34.jpg",
    },
    {
      text: "Consegui vaga naquela matéria impossível! O UnBot funcionou perfeitamente quando eu já tinha perdido as esperanças.",
      name: "Mariana",
      role: "Estudante de Comunicação",
      image: "https://randomuser.me/api/portraits/women/11.jpg",
    },
    {
      text: "A maior economia de tempo da faculdade. O UnBot cuida da matrícula para que você possa focar no que realmente importa.",
      name: "Pedro",
      role: "Estudante de Administração",
      image: "https://randomuser.me/api/portraits/men/47.jpg",
    },
    {
      text: "Como aluna nova na universidade, o sistema era confuso. O UnBot tornou tudo mais fácil e me salvou de muita dor de cabeça na primeira matrícula.",
      name: "Júlia",
      role: "Estudante de Relações Internacionais",
      image: "https://randomuser.me/api/portraits/women/15.jpg",
    },
    {
      text: "Eu trabalho e estudo, então não tenho tempo a perder. Programei o robô uma vez e ele fez todo o trabalho por mim. Ferramenta perfeita para quem tem a rotina corrida.",
      name: "Rafael,",
      role: "Estudante de Educação Física",
      image: "https://randomuser.me/api/portraits/men/31.jpg",
    },

  ];
  
  const nextReviews = () => {
    setIndex((prevIndex) => (prevIndex + 2) % reviews.length);
  };

  const prevReviews = () => {
    setIndex((prevIndex) => (prevIndex - 2 + reviews.length) % reviews.length);
  };
  
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

      {/* 1. A animação agora é o primeiro bloco de conteúdo da página */}
      <div className="animation-container">
        <iframe
          src="https://my.spline.design/prismcoin-df48d0ba11b5187e213b2aada3c062da/"
          title="PrismCoin"
        />
      </div>
      <br /><br />
      {/* 2. O conteúdo de texto e botões vem DEPOIS, como um bloco separado */}
      <div className="hero-content-container">
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

      {/* O resto da página continua normalmente a partir daqui */}
      <div className="passo-container" id="passoapasso">
        <h2 className="titulo">Passo a Passo!</h2>
        <div className="passos">
          <div className="passo">
            <img src="Passo1.png" alt="Passo 1" />
            <p><strong>1. Realizar Cadastro e Login no site.</strong></p>
          </div>
          <div className="passo">
            <img src="Passo2.png" alt="Passo 2" />
            <p><strong>2. Fazer o Download do Bot no botão indicado e logar na plataforma.</strong></p>
          </div>
          <div className="passo">
            <img src="Passo3.png" alt="Passo 3" />
            <p><strong>3. Escolher as informações da matéria e clicar no ícone para iniciá-lo.</strong></p>
          </div>
        </div>
      </div>
      
      <br />

      <section className="reviews-section">
        <h2 className="reviews-title">O que as pessoas estão dizendo sobre o UnBot</h2>
        <div className="reviews-container">
          <div className="reviews-wrapper">
            {reviews.slice(index, index + 2).map((review, i) => (
              <div className="review-card" key={i}>
                <p className="review-text">"{review.text}"</p>
                <div className="review-user">
                  <img src={review.image} alt="" className="user-image" />
                  <div>
                    <h4 className="user-name">{review.name}</h4>
                    <p className="user-role">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="buttons">
            <button className="nav-button" onClick={prevReviews}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 5 12 12 19"></polyline>
                </svg>
              </button>
            <button className="nav-button" onClick={nextReviews}>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 19 19 12 12 5"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <div className="container-free">
        <div className="content">
          <h1>
            Garanta seu bot <span className="highlight">imediatamente</span>! 
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
