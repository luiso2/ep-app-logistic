export const initTelegram = () => {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    return tg;
  }
  return null;
};

export const getTelegramTheme = () => {
  const tg = window.Telegram?.WebApp;
  if (!tg) return null;
  
  return {
    isDark: tg.colorScheme === 'dark',
    bgColor: tg.themeParams.bg_color || '#ffffff',
    textColor: tg.themeParams.text_color || '#000000',
    hintColor: tg.themeParams.hint_color || '#999999',
    linkColor: tg.themeParams.link_color || '#2481cc',
    buttonColor: tg.themeParams.button_color || '#2481cc',
    buttonTextColor: tg.themeParams.button_text_color || '#ffffff',
    secondaryBgColor: tg.themeParams.secondary_bg_color || '#f1f1f1',
    headerBgColor: tg.themeParams.header_bg_color || '#ffffff',
    accentTextColor: tg.themeParams.accent_text_color || '#2481cc',
    sectionBgColor: tg.themeParams.section_bg_color || '#ffffff',
    sectionHeaderTextColor: tg.themeParams.section_header_text_color || '#000000',
    subtitleTextColor: tg.themeParams.subtitle_text_color || '#999999',
    destructiveTextColor: tg.themeParams.destructive_text_color || '#ff3b30'
  };
};

export const showTelegramBackButton = (onClick: () => void) => {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;
  
  tg.BackButton.show();
  tg.BackButton.onClick(onClick);
};

export const hideTelegramBackButton = () => {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;
  
  tg.BackButton.hide();
};

export const showTelegramMainButton = (text: string, onClick: () => void) => {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;
  
  tg.MainButton.setText(text);
  tg.MainButton.show();
  tg.MainButton.onClick(onClick);
};

export const hideTelegramMainButton = () => {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;
  
  tg.MainButton.hide();
};

export const hapticFeedback = (type: 'impact' | 'notification' | 'selection', style?: string) => {
  const tg = window.Telegram?.WebApp;
  if (!tg?.HapticFeedback) return;
  
  if (type === 'impact' && style) {
    tg.HapticFeedback.impactOccurred(style as any);
  } else if (type === 'notification' && style) {
    tg.HapticFeedback.notificationOccurred(style as any);
  } else if (type === 'selection') {
    tg.HapticFeedback.selectionChanged();
  }
};

export const showQrScanner = (callback: (data: string) => void) => {
  const tg = window.Telegram?.WebApp;
  if (!tg) {
    console.warn('Telegram WebApp not available');
    return;
  }
  
  if (tg.isVersionAtLeast('6.4')) {
    tg.showScanQrPopup({ text: 'Escanea el código QR o de barras' }, callback);
  } else {
    tg.showAlert('Tu versión de Telegram no soporta el escáner QR. Por favor actualiza la aplicación.');
  }
};

export const closeQrScanner = () => {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;
  
  tg.closeScanQrPopup();
};