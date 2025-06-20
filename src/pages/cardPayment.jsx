import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/CardPayment.css';
import PixButton from '../components/PixButton';
import BotaoPremium from '../components/BotaoPremium';

function App() {
  const navigate = useNavigate();
  const [publicKey, setPublicKey] = useState('');
  const [coupon, setCoupon] = useState(''); // Estado para o campo de cupom
  const [appliedCoupon, setAppliedCoupon] = useState(''); // Cupom aplicado
  const [couponMessage, setCouponMessage] = useState(''); // Estado para a mensagem retornada pelo servidor
  const [isCouponValid, setIsCouponValid] = useState(null); // Estado para a validade do cupom
  const [quantity, setQuantity] = useState(1); // Estado para a quantidade de itens
  const [totalPrice, setTotalPrice] = useState(0); // Estado para o valor total
  const [cpf, setCpf] = useState(''); // Estado para o campo de CPF
  const [cardHolder, setCardHolder] = useState(''); // Estado para o nome do titular do cartão
  const [paymentMessage, setPaymentMessage] = useState('');
  const [isPaymentError, setIsPaymentError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePixClick = () => {
    navigate('/payment/pix');
  };


  // Adicionar o script do PagSeguro dinamicamente
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Limpa o script quando o componente for desmontado
    };
  }, []);

  // Requisição para obter a publicKey
  useEffect(() => {
    async function fetchPublicKey() {
      try {
        const response = await api.post('/getPublicKey');
        setPublicKey(response.data); // Supondo que a chave está diretamente no corpo da resposta
      } catch (error) {
        console.error('Erro ao buscar a chave pública:', error);
      }
    }

    fetchPublicKey();
  }, []);

  // Atualizar o preço total
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

    if (appliedCoupon || quantity) {
      fetchTotalPrice();
    }
  }, [appliedCoupon, quantity]);

  // Lógica para validar o cupom
  const handleApplyCoupon = async () => {
    try {
      const response = await api.post('/verifyCupom', { cupom: coupon });
      console.log('Resposta do servidor:', response.data);
      if (response.status === 200) {
        setIsCouponValid(true);
        setCouponMessage(`Cupom aplicado: ${response.data.desconto}% OFF`);
        setAppliedCoupon(coupon); // Define o cupom aplicado
      }
    } catch (error) {
      console.error('Erro ao validar o cupom:', error);
      setIsCouponValid(false);
      setCoupon(''); // Limpar o campo de cupom
      if (error.response) {
        if (error.response.status === 404){
          setCouponMessage('Cupom esgotado ou inexistente');
        }
      }
      else {
        setCouponMessage('Não foi possível conectar com o servior');
      }
      setTimeout(() => setCouponMessage(''), 10000); // Remove a mensagem após 5 segundos
    }
  };

  // Lógica para limpar o cupom
  const handleClearCoupon = () => {
    setCoupon('');
    setCouponMessage('');
    setIsCouponValid(null);
    setAppliedCoupon('');
  };

  // Lógica para aumentar ou diminuir a quantidade
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => (prev < 10 ? prev + 1 : 10));
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Adicionar a lógica de criptografia ao submit do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!window.PagSeguro) {
      console.error("SDK do PagSeguro ainda não carregada.");
      return;
    }
  
    setIsSubmitting(true);
    setPaymentMessage('');
  
    try {
      let cardMonth = document.querySelector('#cardMonth').value;
      let cardYear = document.querySelector('#cardYear').value;
  
      // Normaliza o mês para dois dígitos
      if (cardMonth.length === 1) {
        cardMonth = `0${cardMonth}`;
      }
  
      // Normaliza o ano para quatro dígitos (se estiver no formato de dois)
      const fullCardYear = cardYear.length === 2 ? `20${cardYear}` : cardYear;
  
      const card = PagSeguro.encryptCard({
        publicKey: publicKey,
        holder: cardHolder,
        number: document.querySelector('#cardNumber').value,
        expMonth: cardMonth,
        expYear: fullCardYear,
        securityCode: document.querySelector('#cardCvv').value,
      });
  
      const encryptedCard = card.encryptedCard;
  
      const response = await api.post('/CardPaymentController', {
        encryptedCard: encryptedCard,
        coupon: appliedCoupon,
        quantity: quantity,
        totalPrice: totalPrice,
        cpf: cpf,
        cardHolder: cardHolder,
      });
  
      if (response.status === 200) {
        setPaymentMessage(response.data.message || 'Pagamento realizado com sucesso!');
        setIsPaymentError(false);
        setTimeout(() => {
          navigate('/home');
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
  
  
  
  


  return (
    <div className="Page">
      <button 
        className="btn-home" 
        onClick={() => navigate('/home')}
      >
        Home
      </button>
      <br></br>
      <PixButton onClick={handlePixClick} />
      <br/><br/>
      <h1 className="title">Pagamento com cartão de crédito</h1>
      <br></br>
      <div className="content-container">
        <div className="card-container">
          <div className="card-preview">
          <img src="/credit-card-svgrepo-com.svg" className="credit-card-image" alt="Credit-card" />
          </div>
          <form id="formCard" onSubmit={handleSubmit} className="payment-form">
          <input
            type="text"
            className="form-control"
            name="cardHolder"
            id="cardHolder"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="Nome do Titular do Cartão"
          />
          <input
            type="text"
            className="form-control"
            name="cardNumber"
            id="cardNumber"
            maxLength="16"
            placeholder="Número do Cartão"
          />
          <div className="form-group">
            <input
              type="text"
              className="form-control small-input"
              name="cardMonth"
              id="cardMonth"
              maxLength="2"
              placeholder="MM"
            />
            <input
              type="text"
              className="form-control small-input"
              name="cardYear"
              id="cardYear"
              maxLength="2"
              placeholder="AA"
            />
            <input
              type="text"
              className="form-control small-input"
              name="cardCvv"
              id="cardCvv"
              maxLength="4"
              placeholder="CVV"
            />
          </div>
          <input
            type="text"
            className="form-control"
            name="cpf"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            maxLength="11"
            placeholder="CPF do titular (somente números)"
          />
            <button
              type="submit"
              className={isSubmitting ? "btn-pay disabled" : "btn-pay"}
              disabled={isSubmitting} // Continua desabilitando funcionalmente
            >
              {isSubmitting ? 'Processando...' : 'Pagar'}
            </button>


        </form>
        {paymentMessage && (
          <p
            className="payment-message"
            style={{
              marginTop: '10px',
              color: isPaymentError ? 'red' : 'green',
            }}
          >
            {paymentMessage}
          </p>
          )}


        </div>
        <div className="cupom-container">
          <h2>Cupons de desconto</h2>
          <div className="coupon-input-wrapper" style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-control"
              name="coupon"
              id="coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Cupom de Desconto"
              disabled={isCouponValid === true}
              style={{ paddingRight: '30px' }}
            />
            {coupon && (
              <button
                className="btn-clear-input"
                onClick={handleClearCoupon}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: 'black',
                }}
              >
                ×
              </button>
            )}
          </div>
          {isCouponValid !== true && (
            <button className="btn-aplicarCupom" onClick={handleApplyCoupon}>Aplicar</button>
          )}
          {couponMessage && (
            <p
              className={isCouponValid ? "coupon-success" : "coupon-error"}
              style={{ color: isCouponValid ? 'green' : 'red' }}
            >
              {couponMessage}
            </p>
          )}
          <br /><br /><br />
          
          <BotaoPremium />
          {/*
          <div className="quantity-input" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label htmlFor="quantity" style={{ margin: 0 }}>Quantidade:</label>
            <button
              type="button"
              className="btn-quantity"
              onClick={handleDecreaseQuantity}
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              className="btn-quantity"
              onClick={handleIncreaseQuantity}
            >
              +
            </button>
          </div>
          */}
          <br />
          <span className='TotalCash'>Valor total: R$ {totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
