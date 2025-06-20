import React, { useState } from "react";
import axios from "axios";
import api from '../api/api';

function Home() {
  const [formData, setFormData] = useState({
    Matricula: "",
    Password: "",
    CPF: "",
    Nascimento: "",
    CodDisciplina: "",
    Horario: "",
    Professor: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Envia a requisição para o servidor com Axios
      const response = await api.post("/click", formData);

      // Verifica se a resposta foi bem-sucedida
      if (response.status === 200) {
        alert(`Resposta do servidor: ${response.data.message}`);
        alert("Mensagem enviada com sucesso!");
      } else {
        alert(`Erro do servidor: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <label>Matricula:</label>
      <input
        type="text"
        name="Matricula"
        value={formData.Matricula}
        onChange={handleChange}
        placeholder="Matricula"
      />
      <br />
      <label>Senha Sigaa:</label>
      <input
        type="password"
        name="Password"
        value={formData.Password}
        onChange={handleChange}
        placeholder="Senha Sigaa"
      />
      <br />
      <label>CPF:</label>
      <input
        type="text"
        name="CPF"
        value={formData.CPF}
        onChange={handleChange}
        placeholder="CPF"
      />
      <br />
      <label>Nascimento:</label>
      <input
        type="text"
        name="Nascimento"
        value={formData.Nascimento}
        onChange={handleChange}
        placeholder="Nascimento"
      />
      <br />
      <label>Código da Matéria:</label>
      <input
        type="text"
        name="CodDisciplina"
        value={formData.CodDisciplina}
        onChange={handleChange}
        placeholder="Código da disciplina"
      />
      <br />
      <label>Horário:</label>
      <input
        type="text"
        name="Horario"
        value={formData.Horario}
        onChange={handleChange}
        placeholder="Horário da disciplina"
      />
      <br />
      <label>Nome do Professor:</label>
      <input
        type="text"
        name="Professor"
        value={formData.Professor}
        onChange={handleChange}
        placeholder="Nome do professor"
      />
      <br />
      <br />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default Home;
