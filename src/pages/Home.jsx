import React, { useEffect, useState } from "react";
import api from "../api/api"; // Caminho correto para o arquivo onde sua instância do axios está
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom'; // Para navegação no React Router
import { AiOutlineDownload } from "react-icons/ai"; 
import HeaderBar from './HeaderBar'; // Importando o componente de cabeçalho
import Premium from '../components/premiumIcon'
import Line from '../components/linhaDivisoria'


function App() {
  const [botsDisponiveis, setBotsDisponiveis] = useState(0);
  const [botDetails, setBotDetails] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null); // Armazena o bot selecionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla a exibição da modal
  const [modalType, setModalType] = useState(""); // Controla o tipo do botão clicado
  const [isLoading, setIsLoading] = useState(true); // Indica se está carregando
  const [isVisible, setIsVisible] = useState(false); // Controla visibilidade da página
  const navigate = useNavigate();
  const [nenhumBot, setNenhumBot] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 700);
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true); // Inicia o carregamento
        try {
          const response = await api.post("/mainView");
          console.log("Resposta do servidor:", response.data);

        
        setNenhumBot(true);
        for (const key in response.data) {
          if (key.startsWith("bot") == true && key.endsWith("Disponiveis") === false) {
            setNenhumBot(false);
            console.log("Bots encontrados");
            break;
          }
        }
      
          if (typeof response.data.botsDisponiveis === "number") {
            setBotsDisponiveis(response.data.botsDisponiveis);
          }
      
          const botData = Object.keys(response.data)
            .filter(
              (key) =>
                key.startsWith("bot") && typeof response.data[key] === "object"
            )
            .map((key) => ({ ...response.data[key], botName: key }));
      
          setBotDetails(botData);
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
          window.location.reload();
        } finally {
          setIsLoading(false); // Finaliza o carregamento
        }
      };
      

    fetchData();
  }, []);

  // Função para abrir a modal com o bot selecionado e o tipo do botão
  const openModal = (bot, type) => {
    if (type === "BotLivre") {
      setSelectedBot(null); // Ou use um objeto vazio, se precisar de um estado inicial
    } else {
      setSelectedBot(bot);
    }
    setModalType(type); // Define o tipo de modal
    setIsModalOpen(true); // Abre a modal
  };
  

  // Função para fechar a modal
  const closeModal = () => {
    setSelectedBot(null);
    setModalType("");
    setIsModalOpen(false);
  };


  if (!isVisible) {
    return null;
  }

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

  return (
    <>
            <HeaderBar/> {/* Incluindo a barra de cabeçalho */}
    <div className="AppHome">
      <h1>Painel de Visualização</h1>
      {/* Exibição do spinner enquanto os dados estão sendo carregados */}
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div> {/* Spinner visual */}
          <p>Carregando...</p> {/* Texto de carregamento */}
        </div>
      ) : (
        <>
          {/* Exibição de bots que tiveram problema */}
          <div className="bot-section">
                {botsDisponiveis > 100 ? <Premium /> : <h2>Bots Disponíveis: {botsDisponiveis}</h2>}
          </div>
          <br></br><br></br>
          <Line></Line>
          {nenhumBot === true ? <span className="nenhumBotsSpan">Nenhum bot cadastrado</span> : null}
          <div className="bot-section">
            {botDetails.some((bot) => bot.complete === 2 || bot.complete === 3) && (
              <h2 style={{ color: "red" }}>Bots Com problema</h2>
            )}
            <div className="grid-container">
              {botDetails
                .filter((bot) => bot.complete === 2 || bot.complete === 3)
                .map((bot, index) => (
                  <button
                    className="ButtonBot BotsProblem"
                    key={index}
                    onClick={() => openModal(bot, "problem")}
                  >
                    <span>{bot.NomeDisciplina}</span>
                    <br />
                    <span style={{ color: "gray", fontSize: "16px" }}>
                      {bot.codDisciplina}
                    </span>
                  </button>
                ))}
            </div>
          </div>
  
          {/* Exibição de bots que acharam vaga */}
          <div className="bot-section">
            {botDetails.some((bot) => bot.complete === 1) && (
              <h2>Bots Concluídos</h2>
            )}
            <div className="grid-container">
              {botDetails
                .filter((bot) => bot.complete === 1)
                .map((bot, index) => (
                  <button
                    className="ButtonBot BotsFinish"
                    key={index}
                    onClick={() => openModal(bot, "finish")}
                  >
                    <span>{bot.NomeDisciplina}</span>
                    <br />
                    <span style={{ color: "gray", fontSize: "16px" }}>
                      {bot.codDisciplina}
                    </span>
                  </button>
                ))}
            </div>
          </div>
  
          {/* Exibição de bots já em uso */}
          <div className="bot-section">
          {botDetails.some((bot) => bot.complete === 0) && (
              <h2>Bots</h2>
            )}
            <div className="grid-container">
              {botDetails
                .filter((bot) => bot.complete === 0)
                .map((bot, index) => (
                  <button
                    className="ButtonBot BotsUso"
                    key={index}
                    onClick={() => openModal(bot, "inUse")}
                  >
                    <span>{bot.NomeDisciplina}</span>
                    <br />
                    <span style={{ color: "gray", fontSize: "16px" }}>
                      {bot.codDisciplina}
                    </span>
                  </button>
                ))}
            </div>
          </div>

        {/* Imagem decorativa
          <div className="imageCyborg">
          <img src="/cyborg-animate.svg" className="cyborgImage" alt="Controle de painel" />
          </div>
        */}
  
          {/* Modal para exibir informações do bot */}
          {isModalOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                {/* Renderiza informações com base no tipo do botão clicado */}
                {modalType === "problem" && selectedBot && (
                    <>
                    <h2>{selectedBot.NomeDisciplina}</h2>
                    <p>
                        <strong>Disciplina:</strong> {selectedBot.codDisciplina}
                    </p>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                        <strong>Status:</strong> Credenciais inválidas, verifique sua senha do SIGAA e reinicie o bot
                    </p>
                    </>
                )}

                {modalType === "finish" && selectedBot && (
                    <>
                    <h2>{selectedBot.NomeDisciplina}</h2>
                    <p>
                        <strong>Disciplina:</strong> {selectedBot.codDisciplina}
                    </p>
                    <p>
                        <strong>Professor:</strong> {selectedBot.professor}
                    </p>
                    <p>
                        <strong>Horário:</strong> {selectedBot.horario}
                    </p>
                    <p
                        style={{
                        color: "green",
                        fontWeight: "bold",
                        fontSize: "16px",
                        }}
                    >
                        <strong>Status:</strong> Matricula efetuada com sucesso
                    </p>
                    </>
                )}

                {modalType === "inUse" && selectedBot && (
                    <>
                    <h2>{selectedBot.NomeDisciplina}</h2>
                    <p>
                        <strong>Disciplina:</strong> {selectedBot.codDisciplina}
                    </p>
                    <p>
                        <strong>Professor:</strong> {selectedBot.professor}
                    </p>
                    <p>
                        <strong>Horário:</strong> {selectedBot.horario}
                    </p>
                    <p style={{ color: "purple", fontWeight: "bold" }}>
                        <strong>Status:</strong> Running
                    </p>
                    </>
                )}

                <button className="close-modal" onClick={closeModal}>
                    Fechar
                </button>
                </div>
            </div>
            )}

                    </>
                )}
      </div>
      <style>{`
        body  {
          background-color:rgb(226, 226, 226);
        }
      `}</style>
      </>
      );
  
}

export default App;
