import React, { useEffect, useState } from "react";
import api from "../api/api"; // Caminho correto para o arquivo onde sua instância do axios está
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FiActivity,
  FiAlertTriangle,
  FiArrowRight,
  FiCheckCircle,
  FiDownload,
  FiInbox,
  FiShoppingCart,
  FiX,
} from "react-icons/fi";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom"; // Para navegação no React Router
import HeaderBar from "./HeaderBar"; // Importando o componente de cabeçalho
import Premium from "../components/premiumIcon";

/* Aparência de cada estado do bot. A chave é o `modalType` usado na modal. */
const STATUS = {
  problem: {
    color: "var(--st-problem)",
    label: "Requer atenção",
    icon: <FiAlertTriangle />,
    group: "Bots com problema",
  },
  finish: {
    color: "var(--st-finish)",
    label: "Matrícula feita",
    icon: <FiCheckCircle />,
    group: "Bots concluídos",
  },
  inUse: {
    color: "var(--st-running)",
    label: "Em execução",
    icon: <FiActivity />,
    group: "Bots em execução",
  },
};

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
  const reduce = useReducedMotion();

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

  const ease = [0.16, 1, 0.3, 1];
  const isPremium = botsDisponiveis > 100;
  const showSkeleton = !isVisible || isLoading;

  const groups = [
    { type: "problem", bots: botDetails.filter((b) => b.complete === 2 || b.complete === 3) },
    { type: "finish", bots: botDetails.filter((b) => b.complete === 1) },
    { type: "inUse", bots: botDetails.filter((b) => b.complete === 0) },
  ];

  const shell = (children) => (
    <div className="ub-app">
      <HeaderBar /> {/* Incluindo a barra de cabeçalho */}
      <main className="ub-panel">{children}</main>
      <style>{`body { background: #f5f5f7; }`}</style>
    </div>
  );

  /* ---------- carregando: esqueleto com a forma do painel ---------- */
  if (showSkeleton) {
    return shell(
      <>
        <p className="ub-loading__sr" role="status">
          Carregando seus bots
        </p>
        <div className="ub-panel__intro" aria-hidden>
          <span className="ub-skel ub-skel--title" />
          <span className="ub-skel ub-skel--sub" />
        </div>
        <div className="ub-balance" aria-hidden>
          <span className="ub-skel ub-skel--balance" />
        </div>
        <section className="ub-group" aria-hidden>
          <div className="ub-group__head">
            <span className="ub-skel ub-skel--grouptitle" />
          </div>
          <div className="ub-group__grid">
            {[0, 1, 2].map((i) => (
              <div className="ub-skelcard" key={i}>
                <span className="ub-skel" />
                <span className="ub-skel" />
                <span className="ub-skel" />
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  return shell(
    <>
      <div className="ub-panel__intro">
        <h1 className="ub-panel__title">
          Seu <em>painel</em>.
        </h1>
        <p className="ub-panel__sub">
          Acompanhe cada bot em tempo real. Toque em um cartão para ver
          disciplina, professor e horário.
        </p>
      </div>

      <div className="ub-balance">
        {isPremium ? (
          <span className="ub-balance__premium">
            <Premium />
            <span className="ub-balance__label">
              Bots ilimitados nesta conta
            </span>
          </span>
        ) : (
          <>
            <span className="ub-balance__stat">
              <span className="ub-balance__num">{botsDisponiveis}</span>
              <span className="ub-balance__label">
                {botsDisponiveis === 1 ? "bot disponível" : "bots disponíveis"}
              </span>
            </span>
            <button
              className="ubl-btn ubl-btn--solid ubl-btn--lg"
              onClick={() => navigate("/payment/credit-card")}
            >
              <FiShoppingCart />
              Comprar bots
            </button>
          </>
        )}
      </div>

      {nenhumBot === true ? (
        <section className="ub-empty">
          <span className="ub-empty__icon">
            <FiInbox />
          </span>
          <h2>Nenhum bot cadastrado ainda</h2>
          <p>
            Cadastre suas disciplinas pelo aplicativo do UnBot e elas aparecem
            aqui assim que começarem a rodar.
          </p>
          <button
            className="ubl-btn ubl-btn--ghost ubl-btn--lg"
            onClick={() => navigate("/download")}
          >
            <FiDownload />
            Baixar o UnBot
          </button>
        </section>
      ) : null}

      {groups.map(({ type, bots }) =>
        bots.length === 0 ? null : (
          <section
            className="ub-group"
            key={type}
            style={{ "--c": STATUS[type].color }}
          >
            <div className="ub-group__head">
              <span className="ub-group__dot" aria-hidden />
              <h2 className="ub-group__title">{STATUS[type].group}</h2>
              <span className="ub-group__count">{bots.length}</span>
            </div>

            <div className="ub-group__grid">
              {bots.map((bot, index) => (
                <motion.button
                  className="ub-bot"
                  key={index}
                  style={{ "--c": STATUS[type].color }}
                  onClick={() => openModal(bot, type)}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease, delay: index * 0.05 }}
                >
                  <span className="ub-bot__status">
                    {STATUS[type].icon}
                    {STATUS[type].label}
                  </span>
                  <span className="ub-bot__name">{bot.NomeDisciplina}</span>
                  <span className="ub-bot__foot">
                    <span className="ub-bot__code">{bot.codDisciplina}</span>
                    <FiArrowRight className="ub-bot__go" aria-hidden />
                  </span>
                </motion.button>
              ))}
            </div>
          </section>
        )
      )}

      {/* Modal para exibir informações do bot */}
      <AnimatePresence>
        {isModalOpen && selectedBot && (
          <motion.div
            className="ub-sheet__overlay"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="ub-sheet"
              style={{ "--c": STATUS[modalType]?.color }}
              onClick={(e) => e.stopPropagation()}
              initial={reduce ? false : { opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease }}
            >
              <button
                className="ub-sheet__x"
                onClick={closeModal}
                aria-label="Fechar"
              >
                <FiX />
              </button>

              <span className="ub-sheet__status">
                {STATUS[modalType]?.icon}
                {STATUS[modalType]?.label}
              </span>

              <h2 className="ub-sheet__title">{selectedBot.NomeDisciplina}</h2>

              <dl className="ub-sheet__rows">
                <div className="ub-sheet__row">
                  <dt>Disciplina</dt>
                  <dd>{selectedBot.codDisciplina}</dd>
                </div>

                {modalType !== "problem" && (
                  <>
                    <div className="ub-sheet__row">
                      <dt>Professor</dt>
                      <dd>
                        {selectedBot.professor != ""
                          ? selectedBot.professor
                          : "Qualquer"}
                      </dd>
                    </div>
                    <div className="ub-sheet__row">
                      <dt>Horário</dt>
                      <dd>
                        {selectedBot.horario != ""
                          ? selectedBot.horario
                          : "Qualquer"}
                      </dd>
                    </div>
                  </>
                )}
              </dl>

              {modalType === "problem" && (
                <p className="ub-sheet__note">
                  <FiAlertTriangle aria-hidden />
                  <span>
                    Verifique o funcionamento do bot e reinicie pelo
                    aplicativo.
                  </span>
                </p>
              )}
              {modalType === "finish" && (
                <p className="ub-sheet__note">
                  <FiCheckCircle aria-hidden />
                  <span>Matrícula efetuada com sucesso.</span>
                </p>
              )}

              <button
                className="ubl-btn ubl-btn--solid ub-sheet__cta"
                onClick={closeModal}
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
