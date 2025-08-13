const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6a11cb" />
        <stop offset="100%" stopColor="#a129c5" />
      </linearGradient>
    </defs>

    {/* Fundo gradiente */}
    <rect width="64" height="64" fill="url(#bgGradient)" rx="10" />

    {/* Seta de download */}
    <path
      d="M32 16 V40 M24 32 L32 40 L40 32"
      fill="none"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Colchete mais largo e mais próximo da seta */}
    <path
      d="M20 44 V48 A4 4 0 0 0 24 52 H40 A4 4 0 0 0 44 48 V44"
      fill="none"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export default DownloadIcon;
