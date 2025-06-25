import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, AlertCircle, User, Clock, MessageSquare, Send, Edit, Check, X, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatDateTime, formatRelativeTime, getCategoryLabel, getStatusLabel, getPriorityColor } from '../utils/formatters';
import { showTelegramBackButton, hideTelegramBackButton, hapticFeedback } from '../utils/telegram';
import type { Incident } from '../types';

export const IncidentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { incidents, orders, currentUser, updateIncidentStatus, addNotification } = useStore();
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<Incident['status']>('open');
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  const incident = incidents.find(i => i.id === id);
  const order = incident ? orders.find(o => o.id === incident.orderId) : undefined;

  useEffect(() => {
    showTelegramBackButton(() => navigate(-1));
    return () => hideTelegramBackButton();
  }, [navigate]);

  if (!incident || !order) {
    return (
      <div className="page">
        <div className="empty-state">
          <AlertCircle size={48} />
          <h3>Incidencia no encontrada</h3>
          <button onClick={() => navigate('/incidents')} className="button">
            Volver a incidencias
          </button>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = () => {
    if (newStatus !== incident.status) {
      updateIncidentStatus(incident.id, newStatus);
      hapticFeedback('notification', 'success');
      
      // Add notification
      addNotification({
        userId: incident.createdBy,
        type: 'incident',
        title: 'Estado de incidencia actualizado',
        message: `La incidencia #${incident.id} cambió a ${getStatusLabel(newStatus)}`,
        read: false,
        relatedId: incident.id
      });
      
      window.Telegram?.WebApp?.showAlert('Estado actualizado correctamente');
    }
    setIsEditingStatus(false);
  };

  const handleAddComment = () => {
    if (comment.trim() && currentUser) {
      // In a real app, this would save the comment to the backend
      hapticFeedback('impact', 'light');
      window.Telegram?.WebApp?.showAlert('Comentario agregado');
      setComment('');
    }
  };

  const statusOptions: { value: Incident['status']; label: string }[] = [
    { value: 'open', label: 'Abierto' },
    { value: 'in_progress', label: 'En Progreso' },
    { value: 'resolved', label: 'Resuelto' },
    { value: 'closed', label: 'Cerrado' }
  ];

  return (
    <div className="page">
      <header className="detail-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1>Incidencia #{incident.id}</h1>
          <p className="subtitle">Creada {formatRelativeTime(incident.createdAt)}</p>
        </div>
      </header>

      <div className="detail-section">
        <div className="incident-detail-badges">
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

        <div className="detail-row">
          <span className="detail-label">Estado</span>
          {isEditingStatus ? (
            <div className="status-edit-group">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as Incident['status'])}
                className="status-select"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button onClick={handleStatusUpdate} className="icon-button success">
                <Check size={16} />
              </button>
              <button onClick={() => setIsEditingStatus(false)} className="icon-button danger">
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="status-display-group">
              <span className={`incident-status status-${incident.status}`}>
                {getStatusLabel(incident.status)}
              </span>
              <button onClick={() => {
                setNewStatus(incident.status);
                setIsEditingStatus(true);
              }} className="icon-button">
                <Edit size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="detail-row">
          <span className="detail-label">Actualizada</span>
          <span>{formatDateTime(incident.updatedAt)}</span>
        </div>
      </div>

      <div className="detail-section">
        <h2 className="section-title">Descripción</h2>
        <p className="incident-full-description">{incident.description}</p>
      </div>

      <div className="detail-section clickable" onClick={() => navigate(`/orders/${order.id}`)}>
        <h2 className="section-title">
          <Package size={20} />
          Pedido Asociado
        </h2>
        <div className="associated-order">
          <div className="order-info">
            <h3>{order.orderCode}</h3>
            <p className="order-customer">{order.customer.name}</p>
            <div className="order-meta">
              <span className="order-status" style={{ backgroundColor: '#3B82F6' }}>
                {getStatusLabel(order.status)}
              </span>
              <span className="order-date">{formatDateTime(order.createdAt)}</span>
            </div>
          </div>
          <ChevronRight size={20} className="chevron-icon" />
        </div>
      </div>

      {incident.assignedTo && (
        <div className="detail-section">
          <h2 className="section-title">
            <User size={20} />
            Asignado a
          </h2>
          <div className="assignee-info">
            <div className="assignee-avatar">
              <User size={24} />
            </div>
            <div>
              <p className="assignee-name">Usuario #{incident.assignedTo}</p>
              <p className="assignee-role">Equipo de Almacén</p>
            </div>
          </div>
        </div>
      )}

      {incident.resolution && (
        <div className="detail-section">
          <h2 className="section-title">Resolución</h2>
          <div className="resolution-box">
            <p>{incident.resolution}</p>
          </div>
        </div>
      )}

      <div className="detail-section">
        <h2 className="section-title" onClick={() => setShowComments(!showComments)} style={{ cursor: 'pointer' }}>
          <MessageSquare size={20} />
          Comentarios {incident.comments ? `(${incident.comments.length})` : '(0)'}
        </h2>
        
        {showComments && (
          <>
            <div className="comments-list">
              {incident.comments && incident.comments.length > 0 ? (
                incident.comments.map(comment => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <span className="comment-author">{comment.userName}</span>
                      <span className="comment-time">
                        <Clock size={12} />
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="no-comments">No hay comentarios aún</p>
              )}
            </div>

            <div className="comment-input-group">
              <input
                type="text"
                placeholder="Agregar un comentario..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="comment-input"
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <button 
                onClick={handleAddComment} 
                className="send-button"
                disabled={!comment.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </>
        )}
      </div>

      <div className="detail-section">
        <h2 className="section-title">Información del Sistema</h2>
        <div className="system-info">
          <div className="info-row">
            <span className="info-label">ID de Incidencia</span>
            <span className="info-value">#{incident.id}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Creado por</span>
            <span className="info-value">Usuario #{incident.createdBy}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Fecha de creación</span>
            <span className="info-value">{formatDateTime(incident.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};