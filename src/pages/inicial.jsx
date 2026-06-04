import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  FiArrowRight,
  FiUserPlus,
  FiDownloadCloud,
  FiTarget,
  FiCheck,
  FiTerminal,
  FiZap,
} from "react-icons/fi";
import "../styles/inicial.css";

/* ============================================================= */
/* DADOS                                                          */
/* ============================================================= */

const STEPS = [
  {
    icon: <FiUserPlus />,
    kicker: "01",
    title: "Cadastre-se e faça login",
    desc: "Crie sua conta e conecte com segurança. Tudo pronto em menos de 1 minuto.",
  },
  {
    icon: <FiDownloadCloud />,
    kicker: "02",
    title: "Baixe o UnBot",
    desc: "Instale o UnBot no seu computador e faça login com a mesma conta.",
  },
  {
    icon: <FiTarget />,
    kicker: "03",
    title: "Escolha a matéria e inicie",
    desc: "Defina turma e código — o UnBot monitora e confirma sua matrícula automaticamente.",
  },
];

const STATS = [
  { value: "24/7", label: "monitorando vagas" },
  { value: "<1s", label: "tempo de reação" },
  { value: "100%", label: "automático" },
];

const REVIEWS = [
  {
    text: "Adeus, noites em claro! O UnBot garantiu minha vaga enquanto eu dormia. Simplesmente essencial.",
    name: "Ana",
    role: "Engenharia",
    image: "https://randomuser.me/api/portraits/women/31.jpg",
  },
  {
    text: "Tecnologia que funciona de verdade. Resolve o problema das matrículas de forma brilhante e sem rodeios.",
    name: "Lucas",
    role: "Ciência da Computação",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    text: "Consegui vaga naquela matéria impossível! Funcionou perfeitamente quando eu já tinha perdido as esperanças.",
    name: "Mariana",
    role: "Comunicação",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    text: "A maior economia de tempo da faculdade. Cuida da matrícula pra você focar no que realmente importa.",
    name: "Pedro",
    role: "Administração",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    text: "Como aluna nova, o sistema era confuso. O UnBot tornou tudo mais fácil e me salvou de dor de cabeça.",
    name: "Júlia",
    role: "Relações Internacionais",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    text: "Trabalho e estudo, não tenho tempo a perder. Programei o robô uma vez e ele fez todo o trabalho.",
    name: "Rafael",
    role: "Educação Física",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
  },
];

/* Linhas do console animado — fluxo do bot snipando a vaga */
const CONSOLE_STEPS = [
  { t: "› conectando ao SIGAA...", tone: "dim" },
  { t: "› autenticado como aluno@unb.br", tone: "ok" },
  { t: "› monitorando MAT0025 · Cálculo 1 [T07]", tone: "dim" },
  { t: "› turma lotada — aguardando abertura ⟳", tone: "warn" },
  { t: "› VAGA DETECTADA", tone: "hot" },
  { t: "› enviando matrícula...", tone: "dim" },
  { t: "› matrícula confirmada ✓", tone: "ok" },
];

/* ============================================================= */
/* CONSOLE AO VIVO (elemento-assinatura)                          */
/* ============================================================= */

const LiveConsole = () => {
  const [visible, setVisible] = useState(0);
  const secured = visible >= CONSOLE_STEPS.length;

  useEffect(() => {
    let timeout;
    if (visible < CONSOLE_STEPS.length) {
      timeout = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 500 : 850);
    } else {
      // pausa no estado "garantido", depois reinicia
      timeout = setTimeout(() => setVisible(0), 3200);
    }
    return () => clearTimeout(timeout);
  }, [visible]);

  return (
    <motion.div
      className="ub-console"
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="ub-console__glow" aria-hidden />

      <div className="ub-console__bar">
        <span className="ub-console__dots">
          <i /><i /><i />
        </span>
        <span className="ub-console__title">
          <FiTerminal /> unbot — monitor
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={secured ? "ok" : "live"}
            className={`ub-pill ${secured ? "ub-pill--ok" : "ub-pill--live"}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {secured ? "VAGA GARANTIDA" : "MONITORANDO"}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="ub-console__body">
        {CONSOLE_STEPS.slice(0, visible).map((line, i) => (
          <motion.p
            key={i}
            className={`ub-line ub-line--${line.tone}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          >
            {line.t}
          </motion.p>
        ))}
        {!secured && (
          <span className="ub-cursor" aria-hidden>
            ▋
          </span>
        )}
      </div>

      <AnimatePresence>
        {secured && (
          <motion.div
            className="ub-console__badge"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <FiCheck />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ============================================================= */
/* SEÇÃO REVEAL ao rolar                                          */
/* ============================================================= */

const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ============================================================= */
/* LAUNCH GATE — cadeado abre → passos → parceria UnB × UnBot     */
/* Máquina de fases: locked → unlocking → building → settling →   */
/* paired (loop). Inspirado no lockup da Cumbuca.                  */
/* ============================================================= */

const GateLock = () => (
  <svg className="ub-lock__svg" viewBox="0 0 200 260" aria-hidden>
    <g className="ub-lock__shackle-wrap">
      <path
        className="ub-lock__shackle"
        d="M58 116 V74 a42 42 0 0 1 84 0 V116"
      />
    </g>
    <rect className="ub-lock__body" x="42" y="114" width="116" height="122" rx="22" />
    <circle className="ub-lock__hole" cx="100" cy="164" r="13" />
    <rect className="ub-lock__stem" x="93" y="166" width="14" height="38" rx="7" />
  </svg>
);

const LaunchGate = () => {
  const ref = useRef(null);
  const [phase, setPhase] = useState("locked");
  const inView = useInView(ref, { margin: "-120px" });

  useEffect(() => {
    if (!inView) return;
    let timers = [];
    const push = (fn, ms) => timers.push(setTimeout(fn, ms));
    const run = () => {
      timers.forEach(clearTimeout);
      timers = [];
      setPhase("locked");
      push(() => setPhase("unlocking"), 800);
      push(() => setPhase("building"), 1500);
      push(() => setPhase("settling"), 2500);
      push(() => setPhase("paired"), 3000);
      push(run, 7200);
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section className="ub-gate" id="como-funciona" ref={ref} data-phase={phase}>
      <Reveal className="ub-section__head">
        <span className="ub-kicker ub-kicker--center">COMO FUNCIONA</span>
        <h2 className="ub-section__title">
          Destrave sua vaga. <span className="ub-grad">Em três passos.</span>
        </h2>
        <p className="ub-section__lead">
          Configure uma vez e deixe o robô assumir a corrida pelas vagas.
        </p>
      </Reveal>

      <div className="ub-gate__stage">
        <span className="ub-gate__halo" aria-hidden />
        <span className="ub-gate__ring" aria-hidden />
        <span className="ub-gate__ring ub-gate__ring--2" aria-hidden />

        <div className="ub-gate__lock">
          <GateLock />
        </div>

        <div className="ub-gate__pair" aria-label="Parceria UnB e UnBot">
          <span className="ub-pair__unb">
            <img src="unb-logo.svg" alt="" />
            UnB
          </span>
          <span className="ub-pair__x">×</span>
          <span className="ub-pair__unbot">
            <img src="favicon.svg" alt="" />
            UnBot
          </span>
        </div>
      </div>

      <div className="ub-gate__steps">
        {STEPS.map((step) => (
          <div className="ub-gate__step" key={step.kicker}>
            <span className="ub-gate__step-icon">{step.icon}</span>
            <span className="ub-gate__step-num">PASSO · {step.kicker}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ============================================================= */
/* PÁGINA                                                         */
/* ============================================================= */

function App() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goSignup = useCallback(() => navigate("/cadastro"), [navigate]);
  const goLogin = useCallback(() => navigate("/login"), [navigate]);
  const goDownload = useCallback(() => navigate("/download"), [navigate]);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="ub-landing">
      <div className="ub-grain" aria-hidden />

      {/* ===================== NAV ===================== */}
      <header className={`ub-nav ${scrolled ? "is-scrolled" : ""}`}>
        <a className="ub-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="favicon.svg" alt="UnBot" />
          <span>UnBot</span>
        </a>
        <nav className="ub-nav__links">
          <a href="#como-funciona">Como funciona</a>
          <a href="#depoimentos">Depoimentos</a>
        </nav>
        <div className="ub-nav__cta">
          <button className="ub-btn ub-btn--ghost" onClick={goLogin}>
            Login
          </button>
          <button className="ub-btn ub-btn--solid" onClick={goSignup}>
            Cadastre-se
          </button>
        </div>
      </header>

      {/* ===================== HERO ===================== */}
      <section className="ub-hero" ref={heroRef}>
        <div className="ub-hero__aurora" aria-hidden />
        <div className="ub-hero__grid" aria-hidden />

        <motion.div className="ub-hero__inner" style={{ y: heroY, opacity: heroFade }}>
          <motion.div
            className="ub-hero__copy"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.h1 className="ub-hero__title" variants={item}>
              A vaga é sua
              <br />
              <span className="ub-grad ub-shine">antes de você acordar.</span>
            </motion.h1>

            <motion.p className="ub-hero__sub" variants={item}>
              O UnBot monitora o SIGAA em tempo real e garante sua matrícula nas
              matérias desejadas no instante em que uma vaga abre. Você dorme, ele
              snipa.
            </motion.p>

            <motion.div className="ub-hero__actions" variants={item}>
              <button className="ub-btn ub-btn--solid ub-btn--lg ub-magnetic" onClick={goSignup}>
                Garantir minha vaga
                <FiArrowRight />
              </button>
              <button className="ub-btn ub-btn--link" onClick={goLogin}>
                Possuo uma conta? Fazer login
              </button>
            </motion.div>

            <motion.div className="ub-hero__stats" variants={item}>
              {STATS.map((s) => (
                <div className="ub-stat" key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="ub-hero__visual">
            <LiveConsole />
          </div>
        </motion.div>
      </section>

      {/* ===================== COMO FUNCIONA (LAUNCH GATE) ======= */}
      <LaunchGate />

      {/* ===================== DEPOIMENTOS ===================== */}
      <section className="ub-section ub-section--reviews" id="depoimentos">
        <Reveal className="ub-section__head">
          <span className="ub-kicker ub-kicker--center">DEPOIMENTOS</span>
          <h2 className="ub-section__title">
            Histórias de quem <span className="ub-grad">não perdeu a vaga.</span>
          </h2>
        </Reveal>

        <div className="ub-marquee">
          <div className="ub-marquee__track">
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <figure className="ub-review" key={i}>
                <blockquote>"{r.text}"</blockquote>
                <figcaption>
                  <img src={r.image} alt={r.name} />
                  <span>
                    <strong>{r.name}</strong>
                    {r.role}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA FINAL ===================== */}
      <section className="ub-cta">
        <div className="ub-cta__glow" aria-hidden />
        <Reveal className="ub-cta__inner">
          <span className="ub-kicker ub-kicker--center">DISPONÍVEL AGORA</span>
          <h2>
            Garanta seu bot <span className="ub-grad-lime">imediatamente</span>.
          </h2>
          <p>
            1 bot gratuito, infinitas possibilidades de matérias. Disponível apenas
            durante a matrícula extraordinária.
          </p>
          <button className="ub-btn ub-btn--solid ub-btn--lg ub-magnetic" onClick={goSignup}>
            Testar grátis
            <FiArrowRight />
          </button>
        </Reveal>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="ub-footer">
        <div className="ub-footer__top">
          <div className="ub-brand ub-brand--foot">
            <img src="favicon.svg" alt="UnBot" />
            <span>UnBot</span>
          </div>
          <div className="ub-footer__links">
            <button className="ub-footer__dl" onClick={goDownload}>
              Baixar o UnBot
            </button>
            <a href="/cadastro">Teste grátis</a>
          </div>
        </div>
        <div className="ub-footer__legal">
          © 2025 UnBot Technologies LTDA. Todos os direitos reservados. As diversas
          marcas comerciais pertencem aos respectivos proprietários.
        </div>
      </footer>
    </div>
  );
}

export default App;
