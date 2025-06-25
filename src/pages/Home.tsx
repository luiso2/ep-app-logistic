import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, AlertCircle, Search, QrCode, Bell, TrendingUp } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatRelativeTime } from '../utils/formatters';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, incidents, orders, notifications } = useStore();
  
  const openIncidents = incidents.filter(i => i.status === 'open').length;
  const processingOrders = orders.filter(o => o.status === 'processing').length;
  const recentNotifications = notifications.slice(0, 3);

  const quickActions = [
    {
      icon: QrCode,
      label: 'Escanear',
      color: '#3B82F6',
      onClick: () => navigate('/scan')
    },
    {
      icon: Package,
      label: 'Pedidos',
      color: '#8B5CF6',
      onClick: () => navigate('/orders'),
      badge: processingOrders
    },
    {
      icon: AlertCircle,
      label: 'Incidencias',
      color: '#EF4444',
      onClick: () => navigate('/incidents'),
      badge: openIncidents
    },
    {
      icon: Search,
      label: 'Inventario',
      color: '#10B981',
      onClick: () => navigate('/inventory')
    }
  ];

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Hola, {currentUser?.name.split(' ')[0]}!</h1>
          <p className="subtitle">Esencial Pack - Gestión de Almacén</p>
        </div>
        <button 
          className="notification-button"
          onClick={() => navigate('/notifications')}
        >
          <Bell size={24} />
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="notification-badge">
              {notifications.filter(n => !n.read).length}
            </span>
          )}
        </button>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#3B82F6' }}>
            <Package size={20} />
          </div>
          <div className="stat-content">
            <h3>{processingOrders}</h3>
            <p>Pedidos en proceso</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#EF4444' }}>
            <AlertCircle size={20} />
          </div>
          <div className="stat-content">
            <h3>{openIncidents}</h3>
            <p>Incidencias abiertas</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#10B981' }}>
            <TrendingUp size={20} />
          </div>
          <div className="stat-content">
            <h3>{orders.filter(o => o.status === 'delivered').length}</h3>
            <p>Entregados hoy</p>
          </div>
        </div>
      </div>

      <section className="section">
        <h2>Acciones Rápidas</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="quick-action-card"
              onClick={action.onClick}
              style={{ '--action-color': action.color } as React.CSSProperties}
            >
              <div className="quick-action-icon">
                <action.icon size={28} />
                {action.badge && action.badge > 0 && (
                  <span className="action-badge">{action.badge}</span>
                )}
              </div>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {recentNotifications.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2>Notificaciones Recientes</h2>
            <button 
              className="link-button"
              onClick={() => navigate('/notifications')}
            >
              Ver todas
            </button>
          </div>
          <div className="notification-list">
            {recentNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
              >
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className="notification-time">
                    {formatRelativeTime(notification.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};