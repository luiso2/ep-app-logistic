import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X } from 'lucide-react';

interface ScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

// Function to detect if device is mobile
const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 2);
};

export const Scanner: React.FC<ScannerProps> = ({ onScan, onClose }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop'>('desktop');

  useEffect(() => {
    if (!scannerRef.current && isScanning) {
      // Determine camera facing mode based on device type
      const isMobile = isMobileDevice();
      setDeviceType(isMobile ? 'mobile' : 'desktop');
      
      const cameraConfig = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
        // Use back camera for mobile devices, front camera for desktop
        facingMode: isMobile ? "environment" : "user"
      };

      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        cameraConfig,
        false
      );

      scanner.render(
        (decodedText) => {
          onScan(decodedText);
          scanner.clear();
          setIsScanning(false);
        },
        (error) => {
          console.warn(error);
        }
      );

      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [onScan, isScanning]);

  return (
    <div className="scanner-overlay">
      <div className="scanner-container">
        <div className="scanner-header">
          <h3>Escanear Código</h3>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>
        <div id="qr-reader" />
        <p className="scanner-hint">
          Coloca el código QR o de barras dentro del recuadro
        </p>
        <p className="scanner-camera-info">
          {deviceType === 'mobile' 
            ? '📱 Usando cámara trasera' 
            : '💻 Usando cámara frontal'}
        </p>
      </div>
    </div>
  );
};