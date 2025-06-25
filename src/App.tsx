import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Orders } from './pages/Orders';
import { OrderDetail } from './pages/OrderDetail';
import { Incidents } from './pages/Incidents';
import { IncidentDetail } from './pages/IncidentDetail';
import { Inventory } from './pages/Inventory';
import { Profile } from './pages/Profile';
import { ScanPage } from './pages/ScanPage';
import { initTelegram } from './utils/telegram';
import { useStore } from './store/useStore';
import './App.css';

function App() {
  const { theme } = useStore();

  useEffect(() => {
    const tg = initTelegram();
    if (tg) {
      document.body.setAttribute('data-theme', tg.colorScheme);
    } else {
      document.body.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <BrowserRouter basename="/ep-app-logistic">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="incidents" element={<Incidents />} />
          <Route path="incidents/:id" element={<IncidentDetail />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="scan" element={<ScanPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
