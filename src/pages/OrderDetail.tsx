import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, User, MapPin, Phone, Mail, Copy, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatDateTime, formatCurrency, getStatusColor, getStatusLabel } from '../utils/formatters';
import { showTelegramBackButton, hideTelegramBackButton, hapticFeedback } from '../utils/telegram';

export const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrder } = useStore();
  
  const order = id ? getOrder(id) : undefined;

  useEffect(() => {
    showTelegramBackButton(() => navigate(-1));
    return () => hideTelegramBackButton();
  }, [navigate]);

  if (!order) {
    return (
      <div className="page">
        <div className="empty-state">
          <Package size={48} />
          <h3>Pedido no encontrado</h3>
          <button onClick={() => navigate('/orders')} className="button">
            Volver a pedidos
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    hapticFeedback('notification', 'success');
    window.Telegram?.WebApp?.showAlert('Copiado al portapapeles');
  };

  return (
    <div className="page">
      <header className="detail-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1>{order.orderCode}</h1>
          <p className="subtitle">Creado el {formatDateTime(order.createdAt)}</p>
        </div>
      </header>

      <div className="detail-section">
        <div className="detail-row">
          <span className="detail-label">Estado</span>
          <span 
            className="order-status"
            style={{ backgroundColor: getStatusColor(order.status) }}
          >
            {getStatusLabel(order.status)}
          </span>
        </div>
        
        {order.trackingNumber && (
          <div className="detail-row">
            <span className="detail-label">Número de tracking</span>
            <button 
              className="copy-button"
              onClick={() => copyToClipboard(order.trackingNumber!)}
            >
              <span>{order.trackingNumber}</span>
              <Copy size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="detail-section">
        <h2 className="section-title">
          <User size={20} />
          Información del Cliente
        </h2>
        
        <div className="info-card">
          <div className="info-row">
            <span className="info-label">Nombre</span>
            <span className="info-value">{order.customer.name}</span>
          </div>
          
          {order.customer.recipient && (
            <div className="info-row">
              <span className="info-label">Recibe</span>
              <span className="info-value">{order.customer.recipient}</span>
            </div>
          )}
          
          <div className="info-row">
            <span className="info-label">Teléfono</span>
            <a href={`tel:${order.customer.phone}`} className="info-link">
              <Phone size={16} />
              {order.customer.phone}
            </a>
          </div>
          
          <div className="info-row">
            <span className="info-label">Email</span>
            <a href={`mailto:${order.customer.email}`} className="info-link">
              <Mail size={16} />
              {order.customer.email}
            </a>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h2 className="section-title">
          <MapPin size={20} />
          Dirección de Envío
        </h2>
        
        <div className="info-card">
          <p className="address-text">
            {order.shippingAddress.street}<br />
            {order.shippingAddress.city}, {order.shippingAddress.province}<br />
            {order.shippingAddress.country}
            {order.shippingAddress.postalCode && ` - ${order.shippingAddress.postalCode}`}
          </p>
        </div>
      </div>

      <div className="detail-section">
        <h2 className="section-title">
          <Package size={20} />
          Productos ({order.items.length})
        </h2>
        
        <div className="products-list">
          {order.items.map(item => (
            <div key={item.id} className="product-item">
              <div className="product-info">
                <h4>{item.productName}</h4>
                <p className="product-sku">SKU: {item.sku}</p>
              </div>
              <div className="product-pricing">
                <span className="product-quantity">x{item.quantity}</span>
                <span className="product-price">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            </div>
          ))}
          
          <div className="order-total">
            <span>Total</span>
            <span className="total-amount">{formatCurrency(totalAmount)}</span>
          </div>
        </div>
      </div>

      {order.incidents.length > 0 && (
        <div className="detail-section">
          <h2 className="section-title alert-title">
            <AlertCircle size={20} />
            Incidencias ({order.incidents.length})
          </h2>
          
          <div className="incidents-list">
            {order.incidents.map(incident => (
              <button 
                key={incident.id}
                className="incident-preview"
                onClick={() => navigate(`/incidents/${incident.id}`)}
              >
                <div className="incident-header">
                  <span className={`incident-status status-${incident.status}`}>
                    {getStatusLabel(incident.status)}
                  </span>
                  <span className={`incident-priority priority-${incident.priority}`}>
                    {incident.priority.toUpperCase()}
                  </span>
                </div>
                <p className="incident-description">{incident.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};