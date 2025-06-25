import React from 'react';
import { User, Mail, Phone, Shield, LogOut, Bell, Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { currentUser, theme, setTheme, notifications } = useStore();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="page">
        <div className="empty-state">
          <User size={48} />
          <h3>No hay usuario activo</h3>
        </div>
      </div>
    );
  }

  const roleLabels: Record<string, string> = {
    admin: 'Administrador',
    warehouse: 'Almacén',
    delivery: 'Entregas'
  };

  const handleLogout = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showConfirm(
        '¿Estás seguro de que quieres cerrar sesión?',
        (confirmed: boolean) => {
          if (confirmed) {
            window.Telegram?.WebApp.close();
          }
        }
      );
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Mi Perfil</h1>
      </header>

      <div className="profile-section">
        <div className="profile-avatar">
          <User size={48} />
        </div>
        <h2>{currentUser.name}</h2>
        <span className="profile-role">{roleLabels[currentUser.role]}</span>
      </div>

      <div className="profile-info">
        <div className="info-item">
          <Mail size={20} />
          <div>
            <span className="info-label">Email</span>
            <span className="info-value">{currentUser.email || 'No configurado'}</span>
          </div>
        </div>

        <div className="info-item">
          <Phone size={20} />
          <div>
            <span className="info-label">Teléfono</span>
            <span className="info-value">{currentUser.phone || 'No configurado'}</span>
          </div>
        </div>

        <div className="info-item">
          <Shield size={20} />
          <div>
            <span className="info-label">ID de Telegram</span>
            <span className="info-value">{currentUser.telegramId}</span>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Configuración</h3>
        
        <button 
          className="setting-item"
          onClick={() => navigate('/notifications')}
        >
          <div className="setting-left">
            <Bell size={20} />
            <span>Notificaciones</span>
          </div>
          <div className="setting-right">
            <span className="setting-value">
              {notifications.filter(n => !n.read).length} sin leer
            </span>
          </div>
        </button>

        <button 
          className="setting-item"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <div className="setting-left">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <span>Tema</span>
          </div>
          <div className="setting-right">
            <span className="setting-value">
              {theme === 'light' ? 'Claro' : 'Oscuro'}
            </span>
          </div>
        </button>
      </div>

      <div className="profile-actions">
        <button 
          className="logout-button"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>

      <div className="app-info">
        <p>Esencial Pack - Sistema de Gestión v1.0.0</p>
        <p className="company-info">© 2025 Esencial Pack</p>
      </div>
    </div>
  );
};