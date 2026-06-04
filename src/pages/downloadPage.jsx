import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaWindows } from "react-icons/fa";
import { FiArrowLeft, FiCheck, FiShield, FiZap } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/inicial.css";
import "../styles/download.css";

const FEATURES = [
  { icon: <FiZap />, label: "Snipe automático de vagas" },
  { icon: <FiShield />, label: "Roda em segundo plano" },
  { icon: <FiCheck />, label: "Grátis na Microsoft Store" },
];

const DownloadPage = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const handleDownload = () => {
    window.open(
      "https://apps.microsoft.com/store/detail/9N0NFT354L9G?cid=DevShareMCLPCS",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const ease = [0.16, 1, 0.3, 1];
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };

  return (
    <div className="ub-landing ub-dl">
      <div className="ub-grain" aria-hidden />

      <header className="ub-nav is-scrolled">
        <a
          className="ub-brand"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src="favicon.svg" alt="UnBot" />
          <span>UnBot</span>
        </a>
        <div className="ub-nav__cta">
          <button className="ub-btn ub-btn--ghost" onClick={() => navigate("/")}>
            <FiArrowLeft /> Página inicial
          </button>
        </div>
      </header>

      <section className="ub-dl__hero">
        <div className="ub-dl__aurora" aria-hidden />
        <div className="ub-dl__grid" aria-hidden />

        <motion.div
          className="ub-dl__inner"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <div className="ub-dl__copy">
            <motion.span className="ub-kicker" variants={item}>
              <FaWindows /> DISPONÍVEL · WINDOWS
            </motion.span>

            <motion.h1 className="ub-dl__title" variants={item}>
              Tudo pronto para
              <br />
              <span className="ub-grad ub-shine">automatizar?</span>
            </motion.h1>

            <motion.p className="ub-dl__sub" variants={item}>
              Baixe o UnBot para Windows e deixe ele garantir suas matrículas no
              instante em que uma vaga abre. Você dorme, ele snipa.
            </motion.p>

            <motion.div className="ub-dl__actions" variants={item}>
              <button
                className="ub-btn ub-btn--solid ub-btn--lg ub-magnetic"
                onClick={handleDownload}
              >
                <FaWindows />
                Baixar da Microsoft Store
              </button>
            </motion.div>

            <motion.ul className="ub-dl__features" variants={item}>
              {FEATURES.map((f) => (
                <li key={f.label}>
                  {f.icon}
                  {f.label}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            className="ub-dl__visual"
            initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            <div className="ub-dl__frame">
              <div className="ub-dl__frameglow" aria-hidden />
              <img
                src="/unbot-showcase.png"
                alt="Apresentação do aplicativo UnBot"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default DownloadPage;
