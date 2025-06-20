import api from '../api/api';

export const verifyLogin = async () => {
    try {
        const response = await api.post('/verifyLogin');
  
        if (response.status === 200) {
            return true; // Token válido
        } else {
            console.log("Usuário não logado")
            console.log(response)
            return false; // Token inválido
        }
    } catch (error) {
      console.error('Erro ao verificar login:', error);
      return false;
    }
  };
  