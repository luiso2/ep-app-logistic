import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Filter, Clock, ChevronRight, Plus, TrendingUp, Package, AlertTriangle, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getCategoryLabel, getStatusLabel, getPriorityColor, formatRelativeTime } from '../utils/formatters';
import { hapticFeedback } from '../utils/telegram';

export const Incidents: React.FC = () => {
  const navigate = useNavigate();
  const { incidents, orders } = useStore();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredIncidents = incidents.filter(incident => {
    const matchesCategory = categoryFilter === 'all' || incident.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || incident.priority === priorityFilter;
    return matchesCategory && matchesStatus && matchesPriority;
  });

  const categoryOptions = [
    { value: 'all', label: 'Todas' },
    { value: 'damaged', label: 'Dañado' },
    { value: 'missing', label: 'Faltante' },
    { value: 'delayed', label: 'Retrasado' },
    { value: 'incorrect', label: 'Incorrecto' },
    { value: 'other', label: 'Otro' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'open', label: 'Abierto' },
    { value: 'in_progress', label: 'En Progreso' },
    { value: 'resolved', label: 'Resuelto' },
    { value: 'closed', label: 'Cerrado' }
  ];

  const stats = {
    total: incidents.length,
    open: incidents.filter(i => i.status === 'open').length,
    inProgress: incidents.filter(i => i.status === 'in_progress').length,
    urgent: incidents.filter(i => i.priority === 'urgent').length,
    resolved: incidents.filter(i => i.status === 'resolved').length
  };

  const handleCreateIncident = () => {
    hapticFeedback('impact', 'medium');
    window.Telegram?.WebApp?.showAlert('Esta función estará disponible próximamente');
  };

  return (
    <div className="page">
      <header className="page-header">
        <div className="header-main">
          <h1>Incidencias</h1>
          <button onClick={handleCreateIncident} className="create-button">
            <Plus size={20} />
            Nueva
          </button>
        </div>
        <div className="header-stats-grid">
          <div className="stat-card mini">
            <AlertCircle size={16} />
            <div className="stat-content">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          <div className="stat-card mini urgent">
            <AlertTriangle size={16} />
            <div className="stat-content">
              <span className="stat-value">{stats.urgent}</span>
              <span className="stat-label">Urgentes</span>
            </div>
          </div>
          <div className="stat-card mini warning">
            <TrendingUp size={16} />
            <div className="stat-content">
              <span className="stat-value">{stats.open}</span>
              <span className="stat-label">Abiertas</span>
            </div>
          </div>
          <div className="stat-card mini success">
            <Package size={16} />
            <div className="stat-content">
              <span className="stat-value">{stats.resolved}</span>
              <span className="stat-label">Resueltas</span>
            </div>
          </div>
        </div>
      </header>

      <div className="filters-section">
        <div className="filter-group">
          <label className="filter-label">
            <Filter size={16} />
            Categoría
          </label>
          <div className="filter-chips">
            {categoryOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setCategoryFilter(option.value)}
                className={`filter-chip ${categoryFilter === option.value ? 'active' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            <Filter size={16} />
            Estado
          </label>
          <div className="filter-chips">
            {statusOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`filter-chip ${statusFilter === option.value ? 'active' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            <Filter size={16} />
            Prioridad
          </label>
          <div className="filter-chips">
            <button
              onClick={() => setPriorityFilter('all')}
              className={`filter-chip ${priorityFilter === 'all' ? 'active' : ''}`}
            >
              Todas
            </button>
            <button
              onClick={() => setPriorityFilter('urgent')}
              className={`filter-chip priority-urgent ${priorityFilter === 'urgent' ? 'active' : ''}`}
            >
              Urgente
            </button>
            <button
              onClick={() => setPriorityFilter('high')}
              className={`filter-chip priority-high ${priorityFilter === 'high' ? 'active' : ''}`}
            >
              Alta
            </button>
            <button
              onClick={() => setPriorityFilter('medium')}
              className={`filter-chip priority-medium ${priorityFilter === 'medium' ? 'active' : ''}`}
            >
              Media
            </button>
            <button
              onClick={() => setPriorityFilter('low')}
              className={`filter-chip priority-low ${priorityFilter === 'low' ? 'active' : ''}`}
            >
              Baja
            </button>
          </div>
        </div>
      </div>

      <div className="incidents-list">
        {filteredIncidents.map(incident => {
          const order = orders.find(o => o.id === incident.orderId);
          
          return (
            <div
              key={incident.id}
              className="incident-card enhanced"
              onClick={() => {
                hapticFeedback('impact', 'light');
                navigate(`/incidents/${incident.id}`);
              }}
            >
              <div className="incident-card-header">
                <div className="incident-main-info">
                  <div className="incident-order-info">
                    <Package size={16} />
                    <span className="order-code">{order?.orderCode || 'N/A'}</span>
                  </div>
                  <div className="incident-badges">
                    <span className={`incident-category category-${incident.category}`}>
                      {getCategoryLabel(incident.category)}
                    </span>
                    <span 
                      className="incident-priority"
                      style={{ backgroundColor: getPriorityColor(incident.priority) }}
                    >
                      {incident.priority === 'urgent' ? 'URGENTE' : 
                       incident.priority === 'high' ? 'ALTA' : 
                       incident.priority === 'medium' ? 'MEDIA' : 'BAJA'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="incident-card-body">
                <p className="incident-description">
                  {incident.description}
                </p>
                {order && (
                  <div className="incident-customer-info">
                    <span className="customer-name">{order.customer.name}</span>
                    <span className="separator">•</span>
                    <span className="customer-location">{order.shippingAddress.city}</span>
                  </div>
                )}
              </div>
              
              <div className="incident-card-footer">
                <div className="footer-left">
                  <span className={`incident-status status-${incident.status}`}>
                    {getStatusLabel(incident.status)}
                  </span>
                  {incident.assignedTo && (
                    <span className="assigned-indicator">
                      <User size={12} />
                      Asignado
                    </span>
                  )}
                </div>
                <div className="footer-right">
                  <span className="incident-time">
                    <Clock size={12} />
                    {formatRelativeTime(incident.createdAt)}
                  </span>
                  <ChevronRight size={18} className="incident-chevron" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredIncidents.length === 0 && (
        <div className="empty-state">
          <AlertCircle size={48} />
          <h3>No se encontraron incidencias</h3>
          <p>Intenta ajustar los filtros</p>
        </div>
      )}
    </div>
  );
};