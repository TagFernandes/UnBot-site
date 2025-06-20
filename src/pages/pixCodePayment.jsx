import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useNavigate } from 'react-router-dom';

const PixCodePayment = () => {
  const { id } = useParams();
  const [pixData, setPixData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPixData = async () => {
      try {
        const response = await api.post("/PixGetData", { id });
        setPixData(response.data);
      } catch (err) {
        setError("Erro ao carregar dados do Pix.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPixData();
  }, [id]);

  const formatDateBR = (dateStr) => {
    if (!dateStr) return "";
    const [date, time] = dateStr.split(" ");
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year} ${time}`;
  };

  if (loading) return <div style={styles.centered}><p style={styles.loading}>🔄 Carregando...</p></div>;
  if (error) return <div style={styles.centered}><p style={styles.error}>{error}</p></div>;
  if (!pixData) return <div style={styles.centered}><p>Nenhum dado encontrado.</p></div>;

  const isExpired = pixData.status !== 'integrado' ? new Date(pixData.expDate) < new Date() : false;

  return (
    <div style={styles.container}>
        <button 
            className="btn-home" 
            onClick={() => navigate('/home')}
            >
                Home
        </button>
      <h1 style={styles.title}>Pagamento via Pix</h1>

      <div style={styles.qrSection}>
        <img
          src={`data:image/png;base64,${pixData.pixQrCode}`}
          alt="QR Code Pix"
          style={styles.qrImage}
        />
        <div style={styles.amountBox}>
          <span style={styles.amountLabel}>Total a pagar</span>
          <span style={styles.amountValue}>R$ {pixData.total.toFixed(2)}</span>
        </div>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Código Pix (copie e cole):</label>
        <textarea
          readOnly
          value={pixData.pixCode}
          rows={4}
          style={styles.textarea}
          onClick={(e) => e.target.select()}
        />
      </div>

      <div style={styles.details}>
        <p><strong>Status:</strong> <span style={{ color: isExpired ? "#e63946" : "#2a9d8f" }}>{pixData.status === "integrado" ? "pago" : pixData.status}</span></p>
        <p><strong>Data de criação:</strong> {formatDateBR(pixData.creationDate)}</p>
        <p><strong>Validade:</strong> {formatDateBR(pixData.expDate)}</p>
      </div>

      {isExpired && (
        <div style={styles.expiredBox}>
          ⚠️ O código Pix expirou. Gere um novo para continuar.
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "650px",
    margin: "2rem auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fefefe",
    borderRadius: "16px",
    boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease-in-out"
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#333",
    marginBottom: "1.5rem"
  },
  qrSection: {
    textAlign: "center",
    marginBottom: "1.5rem",
    position: "relative"
  },
  qrImage: {
    width: 256,
    height: 256,
    borderRadius: "16px",
    border: "2px solid #eee",
    backgroundColor: "#fafafa"
  },
  amountBox: {
    marginTop: "1rem",
    backgroundColor: "#e0f7ec",
    padding: "0.8rem 1.2rem",
    borderRadius: "10px",
    border: "1px solid #b7e4c7",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",   // Centraliza horizontalmente
    justifyContent: "center", // Centraliza verticalmente
    height: "100px",        // Altura fixa para centralização vertical funcionar
  },
  amountLabel: {
    fontSize: "0.9rem",
    color: "#4caf50"
  },
  amountValue: {
    display: "block",
    fontSize: "1.6rem",
    fontWeight: "bold",
    color: "#1b5e20"
  },
  inputGroup: {
    marginBottom: "1.5rem"
  },
  label: {
    fontWeight: "bold",
    marginBottom: "0.5rem",
    display: "block",
    color: "#444"
  },
  textarea: {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#f8f9fa",
    resize: "none",
    cursor: "pointer"
  },
  details: {
    fontSize: "0.95rem",
    color: "#333",
    lineHeight: 1.6,
    backgroundColor: "#f5f5f5",
    padding: "1rem",
    borderRadius: "10px",
    border: "1px solid #ddd"
  },
  expiredBox: {
    marginTop: "1.2rem",
    padding: "1rem",
    backgroundColor: "#ffeaea",
    color: "#c62828",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "bold"
  },
  centered: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "sans-serif"
  },
  loading: {
    fontSize: "1.2rem",
    color: "#666"
  },
  error: {
    fontSize: "1.2rem",
    color: "#d32f2f"
  }
};

export default PixCodePayment;
