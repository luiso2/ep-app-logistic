import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale/es';

export const formatDate = (date: string | Date) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'dd/MM/yyyy', { locale: es });
};

export const formatDateTime = (date: string | Date) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'dd/MM/yyyy HH:mm', { locale: es });
};

export const formatRelativeTime = (date: string | Date) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(parsedDate, { addSuffix: true, locale: es });
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CU', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: '#FFA500',
    processing: '#3B82F6',
    shipped: '#8B5CF6',
    delivered: '#10B981',
    cancelled: '#EF4444',
    open: '#F59E0B',
    in_progress: '#3B82F6',
    resolved: '#10B981',
    closed: '#6B7280'
  };
  return colors[status] || '#6B7280';
};

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: 'Pendiente',
    processing: 'Procesando',
    shipped: 'Enviado',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
    open: 'Abierto',
    in_progress: 'En Progreso',
    resolved: 'Resuelto',
    closed: 'Cerrado'
  };
  return labels[status] || status;
};

export const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#F97316',
    urgent: '#EF4444'
  };
  return colors[priority] || '#6B7280';
};

export const getPriorityLabel = (priority: string): string => {
  const labels: Record<string, string> = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
    urgent: 'Urgente'
  };
  return labels[priority] || priority;
};

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    damaged: 'Dañado',
    missing: 'Faltante',
    delayed: 'Retrasado',
    incorrect: 'Incorrecto',
    other: 'Otro'
  };
  return labels[category] || category;
};