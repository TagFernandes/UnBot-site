import axios from 'axios';

// Função para ler cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Criação de uma instância do Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

// Adiciona o token ao Authorization se existir no cookie
const token = getCookie('UserSession');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
