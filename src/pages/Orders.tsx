import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Package, Calendar, MapPin, ChevronRight, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../utils/formatters';

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { orders } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'processing', label: 'Procesando' },
    { value: 'shipped', label: 'Enviado' },
    { value: 'delivered', label: 'Entregado' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  return (
    <div className="page">
      <header className="page-header">
        <h1>Pedidos</h1>
      </header>

      <div className="search-section">
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por código, cliente o tracking..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-chips">
          {statusOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`filter-chip ${statusFilter === option.value ? 'active' : ''}`}
            >
              {option.label}
              {option.value !== 'all' && (
                <span className="chip-count">
                  {orders.filter(o => o.status === option.value).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="orders-list">
        {filteredOrders.map(order => {
          const totalAmount = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          
          return (
            <div
              key={order.id}
              className="order-card"
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              <div className="order-header">
                <div>
                  <h3>{order.orderCode}</h3>
                  <div className="order-meta">
                    <span className="order-customer">{order.customer.name}</span>
                  </div>
                </div>
                <ChevronRight size={20} className="order-chevron" />
              </div>

              <div className="order-details">
                <div className="order-detail">
                  <Package size={16} />
                  <span>{order.items.length} productos</span>
                </div>
                <div className="order-detail">
                  <Calendar size={16} />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                <div className="order-detail">
                  <MapPin size={16} />
                  <span>{order.shippingAddress.city}</span>
                </div>
              </div>

              <div className="order-footer">
                <span 
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusLabel(order.status)}
                </span>
                <span className="order-amount">{formatCurrency(totalAmount)}</span>
              </div>

              {order.incidents.length > 0 && (
                <div className="order-alert">
                  <AlertCircle size={16} />
                  <span>{order.incidents.length} incidencia(s)</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="empty-state">
          <Package size={48} />
          <h3>No se encontraron pedidos</h3>
          <p>Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
};