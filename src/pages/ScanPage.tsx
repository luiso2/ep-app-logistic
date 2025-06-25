import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Package, AlertCircle, Keyboard } from 'lucide-react';
import { Scanner } from '../components/Scanner';
import { useStore } from '../store/useStore';
import { showQrScanner, hapticFeedback } from '../utils/telegram';

export const ScanPage: React.FC = () => {
  const navigate = useNavigate();
  const { getOrderByCode, getProductBySku } = useStore();
  const [showScanner, setShowScanner] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const handleScan = (data: string) => {
    hapticFeedback('notification', 'success');
    processScanData(data);
    setShowScanner(false);
  };

  const processScanData = (data: string) => {
    setScanResult(data);
    setScanError(null);

    // Try to find order by code
    const order = getOrderByCode(data);
    if (order) {
      navigate(`/orders/${order.id}`);
      return;
    }

    // Try to find product by SKU
    const product = getProductBySku(data);
    if (product) {
      navigate('/inventory', { state: { searchTerm: data } });
      return;
    }

    // If nothing found
    setScanError('No se encontró ningún pedido o producto con este código');
    hapticFeedback('notification', 'error');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      processScanData(manualCode.trim());
    }
  };

  const handleTelegramScan = () => {
    showQrScanner((data) => {
      handleScan(data);
    });
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Escanear Código</h1>
      </header>

      <div className="scan-options">
        <button
          className="scan-option-card"
          onClick={handleTelegramScan}
        >
          <div className="scan-option-icon telegram">
            <QrCode size={32} />
          </div>
          <h3>Escáner de Telegram</h3>
          <p>Usa el escáner nativo de Telegram (recomendado)</p>
        </button>

        <button
          className="scan-option-card"
          onClick={() => setShowScanner(true)}
        >
          <div className="scan-option-icon camera">
            <QrCode size={32} />
          </div>
          <h3>Escáner Web</h3>
          <p>Usa la cámara del dispositivo</p>
        </button>
      </div>

      <div className="manual-input-section">
        <h2>
          <Keyboard size={20} />
          Introducir manualmente
        </h2>
        
        <form onSubmit={handleManualSubmit} className="manual-form">
          <input
            type="text"
            placeholder="Código de pedido o SKU..."
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            className="manual-input"
          />
          <button 
            type="submit" 
            className="button button-primary"
            disabled={!manualCode.trim()}
          >
            Buscar
          </button>
        </form>
      </div>

      {scanResult && (
        <div className="scan-result">
          <h3>Último código escaneado:</h3>
          <p className="scan-code">{scanResult}</p>
        </div>
      )}

      {scanError && (
        <div className="scan-error">
          <AlertCircle size={20} />
          <p>{scanError}</p>
        </div>
      )}

      <div className="scan-info">
        <h3>¿Qué puedes escanear?</h3>
        <div className="scan-info-items">
          <div className="scan-info-item">
            <Package size={20} />
            <div>
              <h4>Códigos de pedido</h4>
              <p>Formato: EP-2025-XXX</p>
            </div>
          </div>
          <div className="scan-info-item">
            <Package size={20} />
            <div>
              <h4>SKU de productos</h4>
              <p>Formato: XXX-000</p>
            </div>
          </div>
        </div>
      </div>

      {showScanner && (
        <Scanner 
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
};