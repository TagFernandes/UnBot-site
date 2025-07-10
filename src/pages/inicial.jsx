import React from "react";
import "../styles/inicial.css";
import { useNavigate } from 'react-router-dom'; 
import { useState, useEffect, useCallback } from "react";
import api from "../api/api";

function App() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [contentType, setContentType] = useState(null);
  const [index, setIndex] = useState(0);


  const handleDownload = useCallback(() => {
      navigate('/download');
    }, [navigate]);

  /*const handleDownload = async () => {
    try {
      const response = await api.get("/download", { responseType: "blob" });
      // Cria um URL para o blob recebido
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // Cria um elemento de link para disparar o download
      const link = document.createElement("a");
      link.href = url;
      // Define o nome do arquivo para o download
      link.setAttribute("download", "UnBot.exe");
      // Adiciona o link à página, dispara o clique e remove o link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Revoga o URL criado para liberar memória
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao realizar o download:", error);
    }
  };*/

  const [isVisible, setIsVisible] = useState(false); // Controla visibilidade da página
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  
  if (!isVisible) {
    return null;
  }

  
  const openMenu = (type) => {
    setContentType(type);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setTimeout(() => setContentType(null), 300); // Limpa o estado após a animação
  };

  const reviews = [
    {
      text: "Pulsetic is an amazing monitoring tool! It has saved our company countless times from unexpected downtime.",
      name: "Leo Bassam",
      role: "Founder, CEO at Plutio",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      text: "The UI is clean and easy to use. I love the alert system that notifies me instantly if something goes wrong.",
      name: "Chris Kalmar",
      role: "Founder at nineLemon",
      image: "https://randomuser.me/api/portraits/men/34.jpg",
    },
    {
      text: "We've tried many monitoring tools, but Pulsetic stands out with its simplicity and efficiency.",
      name: "Akis Laopodis",
      role: "Founder of HelpfulDocs",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      text: "Pulsetic provides reliable notifications across multiple channels like Slack and SMS. A must-have tool!",
      name: "Andrei Negrau",
      role: "CEO at Cartloop.io",
      image: "https://randomuser.me/api/portraits/men/47.jpg",
    },
    {
      text: "Amazing support and features. We've optimized our uptime monitoring like never before!",
      name: "Sophie Turner",
      role: "CTO at CloudSoft",
      image: "https://randomuser.me/api/portraits/women/42.jpg",
    },
    {
      text: "Pulsetic is now part of our daily operations. It ensures that our infrastructure stays online 24/7.",
      name: "John Doe",
      role: "Tech Lead at WebStack",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
    },
  ];
  
  const nextReviews = () => {
    setIndex((prevIndex) => (prevIndex + 2) % reviews.length);
  };

  const prevReviews = () => {
    setIndex((prevIndex) => (prevIndex - 2 + reviews.length) % reviews.length);
  };

  return (  
  <div className="main">

      <div className="iframe1">
      <iframe
       src="https://my.spline.design/prismcoin-df48d0ba11b5187e213b2aada3c062da/"
        title="PrismCoin"
      />
    </div>

    <img src="fht1.jpg" alt="Passo 1" className="backgroundphoto"/>

    <div className="caixa-texto-chamativa">
      <h1>O software para sua graduação </h1>
    </div>

    <div className="caixa-texto-subchamativa">
      <h1> Otimize seu tempo e suas chances de garantir sua vaga nas <br />matérias desejadas na matrícula extraordinária </h1>
    </div>

    <button className="botao-CTA" 
        onClick={() => navigate('/cadastro')}>
        Cadastre-se <span className="arrow">➜</span>
    </button>

    <button className="botao-Login"
      onClick={() => navigate('/login')}>Já tenho uma conta? Fazer login</button>

    <div className="botoesloginup-container">

      <button className="login" 
      onClick={() => navigate('/Login')}>Login</button>

      <button className="signup"
      onClick={() => navigate('/cadastro')}>Cadastre-se</button>
    </div>

    <div className="passo-container" id="passoapasso">
      <h2 className="titulo">Passo a Passo!</h2>
      <div className="passos">
        <div className="passo">
          <img src="Passo1.png" alt="Passo 1" />
          <p><strong>1. Realizar Cadastro e Login no site.</strong></p>
        </div>
        <div className="passo">
          <img src="Passo2.png" alt="Passo 2" />
          <p><strong>2. Fazer o Download do Bot no botão indicado e logar na plataforma. <br /> PS: Caso acione o antívirus, clique em mais informações e executar</strong></p>
        </div>
        <div className="passo">
          <img src="Passo3.png" alt="Passo 3" />
          <p><strong>3. Escolher as informações da matéria e clicar no ícone para iniciá-lo.</strong></p>
        </div>
      </div>
    </div>
    
    <button className="botao-teste" onClick={() => navigate('/cadastro')}
      >TESTE GRÁTIS AGORA!</button>

  <section className="reviews-section">
      <h2 className="reviews-title">O que as pessoas estão dizendo sobre o UnBot</h2>
      
      {/* Aba de avaliações de usuários */}
      <div className="reviews-tab-container">
        <span className="reviews-tab active">AVALIAÇÕES DE USUÁRIOS</span>
      </div>
      
      {/* Linha separadora */}
      <div className="reviews-divider"></div>
    </section>


  <div className="reviews-container">
        <div className="reviews-wrapper">
          {reviews.slice(index, index + 2).map((review, i) => (
            <div className="review-card" key={i}>
              <p className="review-text">"{review.text}"</p>
              <div className="review-user">
                <img src={review.image} alt={review.name} className="user-image" />
                <div>
                  <h4 className="user-name">{review.name}</h4>
                  <p className="user-role">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="buttons">
          <button className="nav-button" onClick={prevReviews}>&#129128;</button>
          <button className="nav-button" onClick={nextReviews}>&#129130;</button>
        </div>
  </div>

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
        <img src="logo2.svg" alt="Logo da Empresa" className="logoFOO "/>
        <h1 className="company-nameFoo">UnBot</h1>

        
        <div className="footer-links">
          
          <button className="download" 
          onClick={handleDownload}>
            Baixar o Unbot <span className="icon">&#129131;</span>
          </button>

          <a href="#">Privacidade</a>
          <a href="#">Termos de serviço</a>
          <a href="#">Preferências de cookies</a>
          <a href="/cadastro">Teste Grátis</a>
        </div>

      <div className="footer-text">
        &copy;2025 UnBot Technologies.LTDA <br />
        Todos os direitos reservados. As diversas marcas comerciais pertencem aos respectivos proprietários.
      </div>

      <div className="status-container">
          <span className="status-label">STATUS</span>
        <div className="status-box">
          <span className="status-indicator"></span>
          <span className="status-text">All Systems Operational</span>
        </div>
      </div>

    </footer>

  </div> 
  );
}
export default App;