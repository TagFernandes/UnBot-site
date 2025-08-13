const VideoPlayerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6a11cb" />
        <stop offset="100%" stopColor="#a129c5" />
      </linearGradient>
    </defs>

    {/* Fundo gradiente */}
    <rect width="64" height="64" fill="url(#bgGradient)" rx="10" />

    {/* Círculo ao redor do play */}
    <circle cx="32" cy="32" r="14" fill="none" stroke="#ffffff" strokeWidth="4" />

    {/* Triângulo de play centralizado */}
    <polygon points="29,24 29,40 41,32" fill="#ffffff" />
  </svg>
);

export default VideoPlayerIcon;
