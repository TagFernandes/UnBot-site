// src/components/HorizontalCarousel/HorizontalCarousel.jsx

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import '../styles/HorizontalCarousel.css'; // Importando o CSS local

// Seus dados de reviews
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
      text: "Como aluna nova, o sistema era confuso. O UnBot tornou tudo mais fácil e me salvou de muita dor de cabeça na primeira matrícula.",
      name: "Júlia",
      role: "Estudante de Relações Internacionais",
      image: "https://randomuser.me/api/portraits/women/15.jpg",
    },
    {
      text: "Eu trabalho e estudo, então não tenho tempo a perder. Programei o robô uma vez e ele fez todo o trabalho por mim. Ferramenta perfeita para quem tem a rotina corrida.",
      name: "Rafael",
      role: "Estudante de Educação Física",
      image: "https://randomuser.me/api/portraits/men/31.jpg",
    },
];

const HorizontalCarousel = () => {
  return <CarouselCore />;
};

const CarouselCore = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Ajuste este valor final se tiver mais ou menos cards
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);

  return (
    <section ref={targetRef} className="carousel-section">
      <div className="carousel-sticky-container">
        <motion.div style={{ x }} className="card-list">
          {reviews.map((review, index) => {
            return <Card review={review} key={index} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ review }) => {
  return (
    <div className="card">
      <div
        style={{ backgroundImage: `url(${review.image})` }}
        className="card-background"
      ></div>
      <div className="card-content-overlay">
        <p className="review-text">"{review.text}"</p>
        <div className="review-author">
          <img src={review.image} alt={review.name} className="review-author-image" />
          <div className="review-author-details">
            <span className="review-author-name">{review.name}</span>
            <span className="review-author-role">{review.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCarousel;