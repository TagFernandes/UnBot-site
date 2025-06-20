import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/CardPayment.css';
import CreditCardButton from '../components/CreditCardButton';
import BotaoPremium from '../components/BotaoPremium';

function PixPayment() {
  const navigate = useNavigate();

  // --- Estados para o Pagamento ---
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [isCouponValid, setIsCouponValid] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cpf, setCpf] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [isPaymentError, setIsPaymentError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Estados para o Histórico de PIX ---
  const [pixHistory, setPixHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState('');

  //
  const handleCardClick = () => {
    navigate('/payment/credit-card');
  };
  // useEffect para buscar o preço total
  useEffect(() => {
    const fetchTotalPrice = async () => {
      try {
        const response = await api.post('/getPrice', { cupom: appliedCoupon, quantidade: quantity });
        setTotalPrice(response.data.valor);
      } catch (error) {
        console.error('Erro ao calcular o preço total:', error);
        setTotalPrice(0);
      }
    };
    fetchTotalPrice();
  }, [appliedCoupon, quantity]);

  // useEffect para buscar o histórico de PIX
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setHistoryLoading(true);
        const response = await api.post('/GetOpenPix');
        const sortedData = response.data.sort((a, b) => {
          if (a.status === 'pendente' && b.status !== 'pendente') return -1;
          if (a.status !== 'pendente' && b.status === 'pendente') return 1;
          return b.pixID - a.pixID;
        });
        setPixHistory(sortedData);
      } catch (err) {
        setHistoryError('Não foi possível carregar o histórico.');
        console.error('Erro ao buscar histórico de PIX:', err);
      } finally {
        setHistoryLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Lógica para validar o cupom
  const handleApplyCoupon = async () => {
    try {
      const response = await api.post('/verifyCupom', { cupom: coupon });
      if (response.status === 200) {
        setIsCouponValid(true);
        setCouponMessage(`Cupom aplicado: ${response.data.desconto}% OFF`);
        setAppliedCoupon(coupon);
      }
    } catch (error) {
      setIsCouponValid(false);
      setCoupon('');
      setCouponMessage(error.response?.data?.message || 'Cupom esgotado ou inexistente');
      setTimeout(() => setCouponMessage(''), 5000);
    }
  };

  const handleClearCoupon = () => {
    setCoupon('');
    setCouponMessage('');
    setIsCouponValid(null);
    setAppliedCoupon('');
  };

  const handleIncreaseQuantity = () => setQuantity((prev) => (prev < 10 ? prev + 1 : 10));
  const handleDecreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  
  // =================================================================
  // == LÓGICA DE SUBMIT CORRIGIDA E COMPLETA ==
  // =================================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setIsSubmitting(true);
    setPaymentMessage('');
  
    try {
      const response = await api.post('/PixPaymentController', {
        coupon: appliedCoupon,
        quantity: quantity,
        totalPrice: totalPrice,
        cpf: cpf,
      });

      if (response.status === 200) {
        setPaymentMessage(response.data.message || 'Pix gerado com sucesso!');
        setIsPaymentError(false);
        console.log(response.data.id);
        setTimeout(() => {
          navigate('/payment/pix/pixCodePayment/'+ response.data.id);
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        setPaymentMessage(error.response.data.message);
      } else {
        setPaymentMessage("Não foi possível conectar ao servidor");
      }
      setIsPaymentError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePixClick = (pixID) => {
    navigate(`/payment/pix/pixCodePayment/${pixID}`);
  };

  return (
    <div className="Page">
      <button className="btn-home" onClick={() => navigate('/home')}>Home</button>
      <br /><br />
      <CreditCardButton onClick={handleCardClick} />
      <br /><br />
      <h1 className="title">Pagamento PIX</h1>

      <div className="content-container">
        <div className="card-container">
          <div className="card-preview">
            <img src="/pixIcon.svg" className="credit-card-image" alt="PIX Icon" />
          </div>
          <form id="formCard" onSubmit={handleSubmit} className="payment-form">
            <input
              type="text"
              className="form-control"
              name="cpf"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              maxLength="11"
              placeholder="CPF (somente números)"
              required
            />
            
            <button
              type="submit"
              className={isSubmitting ? "btn-pay disabled" : "btn-pay"}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Gerando...' : 'Gerar Pix'}
            </button>
            {paymentMessage && (
              <p className="payment-message" style={{ color: isPaymentError ? 'red' : 'green', marginTop: '10px' }}>
                {paymentMessage}
              </p>
            )}
          </form>
        </div>
        
        <div className="cupom-container">
          <h2>Cupons de desconto</h2>
          <input
            type="text"
            className="form-control"
            name="coupon"
            id="coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Digite seu cupom"
            disabled={isCouponValid === true}
            style={{textAlign: 'center'}}
          />
          {isCouponValid !== true ? (
            <button type="button" className="btn-aplicarCupom" onClick={handleApplyCoupon}>Aplicar</button>
          ) : (
             <button type="button" className="btn-aplicarCupom" onClick={handleClearCoupon} style={{backgroundColor: '#6c757d'}}>Remover Cupom</button>
          )}
          {couponMessage && (
            <p className={isCouponValid ? "coupon-success" : "coupon-error"} style={{ color: isCouponValid ? 'green' : 'red', textAlign: 'center', minHeight: '20px' }}>
              {couponMessage}
            </p>
          )}
          <br />
          <br></br>

          <BotaoPremium></BotaoPremium>

          <br />
          <span className='TotalCash'>Valor total: R$ {totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="history-section">
        <h2 className="history-title">Seu Histórico</h2>
        <div className="pix-list">
          {historyLoading ? (<p>Carregando histórico...</p>) : 
           historyError ? (<p className="history-error">{historyError}</p>) : 
           pixHistory.length > 0 ? (
            pixHistory.map((pix) => (
              <div key={pix.pixID} className={`pix-item status-${pix.status.toLowerCase()}`} onClick={() => handlePixClick(pix.pixID)}>
                <div className="pix-info">
                  <span className="pix-valor">R$ {Number(pix.valor).toFixed(2)}</span>
                  <span className="pix-id">ID: {pix.pixID}</span>
                </div>
                <span className="pix-status-badge">{pix.status}</span>
              </div>
            ))
          ) : (<p>Nenhum PIX encontrado.</p>)}
        </div>
      </div>
    </div>
  );
}

export default PixPayment;