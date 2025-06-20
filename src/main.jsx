import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PixPayment from './pages/pixPayment';
import CardPayment from './pages/cardPayment';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Cadastro from './pages/Cadastro';
import ResetPassord from './pages/ResetPass';
import Inicial from './pages/inicial';
import PixCode from './pages/pixCodePayment';
import BridgePage from './pages/BridgePage';
import PaginaDownload from './pages/downloadPage'
import ProtectedPaymentRoute from './components/ProtectedPaymentRoute';
import NotFound from './pages/NotFound'; // Importando a página de "Not Found"
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicial />} />
          <Route path="/bridge" element={<BridgePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/reset_password" element={<ResetPassord />} />
          <Route path="/download" element={<PaginaDownload/>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/payment/pix/pixCodePayment/:id" element={<ProtectedRoute><ProtectedPaymentRoute><PixCode /></ProtectedPaymentRoute></ProtectedRoute>} />
          <Route path="/payment/credit-card" element={<ProtectedRoute><ProtectedPaymentRoute><CardPayment /></ProtectedPaymentRoute></ProtectedRoute>} />
          <Route path="/payment/pix" element={<ProtectedRoute><ProtectedPaymentRoute><PixPayment /></ProtectedPaymentRoute></ProtectedRoute>} />
          
          {/* Rota para páginas inexistentes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
