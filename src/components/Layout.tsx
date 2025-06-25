import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, AlertCircle, Search, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getTelegramTheme } from '../utils/telegram';

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCount, theme: appTheme } = useStore();
  const telegramTheme = getTelegramTheme();

  useEffect(() => {
    // Apply theme based on app state
    document.documentElement.setAttribute('data-theme', appTheme);
    
    // Override with Telegram theme if available
    if (telegramTheme) {
      document.documentElement.style.setProperty('--tg-theme-bg-color', telegramTheme.bgColor);
      document.documentElement.style.setProperty('--tg-theme-text-color', telegramTheme.textColor);
      document.documentElement.style.setProperty('--tg-theme-hint-color', telegramTheme.hintColor);
      document.documentElement.style.setProperty('--tg-theme-link-color', telegramTheme.linkColor);
      document.documentElement.style.setProperty('--tg-theme-button-color', telegramTheme.buttonColor);
      document.documentElement.style.setProperty('--tg-theme-button-text-color', telegramTheme.buttonTextColor);
      document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', telegramTheme.secondaryBgColor);
    }
  }, [telegramTheme, appTheme]);

  const navItems = [
    { path: '/', icon: Home, label: 'Inicio' },
    { path: '/orders', icon: Package, label: 'Pedidos' },
    { path: '/incidents', icon: AlertCircle, label: 'Incidencias', badge: unreadCount },
    { path: '/inventory', icon: Search, label: 'Inventario' },
    { path: '/profile', icon: User, label: 'Perfil' }
  ];

  return (
    <div className="app-container">
      <main className="main-content">
        <Outlet />
      </main>
      
      <nav className="bottom-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="nav-icon-wrapper">
                <item.icon size={24} />
                {item.badge && item.badge > 0 && (
                  <span className="badge">{item.badge}</span>
                )}
              </div>
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};