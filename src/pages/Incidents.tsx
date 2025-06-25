import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Filter, Clock, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getCategoryLabel, getStatusLabel, getPriorityColor, formatRelativeTime } from '../utils/formatters';

export const Incidents: React.FC = () => {
  const navigate = useNavigate();
  const { incidents, orders } = useStore();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredIncidents = incidents.filter(incident => {
    const matchesCategory = categoryFilter === 'all' || incident.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    return matchesCategory && matchesStatus;
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

  return (
    <div className="page">
      <header className="page-header">
        <h1>Incidencias</h1>
        <div className="header-stats">
          <span className="stat-badge critical">
            {incidents.filter(i => i.priority === 'urgent').length} Urgentes
          </span>
          <span className="stat-badge warning">
            {incidents.filter(i => i.status === 'open').length} Abiertas
          </span>
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
      </div>

      <div className="incidents-list">
        {filteredIncidents.map(incident => {
          const order = orders.find(o => o.id === incident.orderId);
          
          return (
            <div
              key={incident.id}
              className="incident-card"
              onClick={() => navigate(`/incidents/${incident.id}`)}
            >
              <div className="incident-header">
                <div className="incident-badges">
                  <span className={`incident-category category-${incident.category}`}>
                    {getCategoryLabel(incident.category)}
                  </span>
                  <span 
                    className="incident-priority"
                    style={{ backgroundColor: getPriorityColor(incident.priority) }}
                  >
                    {incident.priority.toUpperCase()}
                  </span>
                </div>
                <ChevronRight size={20} className="incident-chevron" />
              </div>

              <h3 className="incident-order">
                Pedido: {order?.orderCode || 'N/A'}
              </h3>
              
              <p className="incident-description">
                {incident.description}
              </p>

              <div className="incident-footer">
                <span className={`incident-status status-${incident.status}`}>
                  {getStatusLabel(incident.status)}
                </span>
                <span className="incident-time">
                  <Clock size={14} />
                  {formatRelativeTime(incident.createdAt)}
                </span>
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