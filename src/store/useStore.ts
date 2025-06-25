import { create } from 'zustand';
import type { User, Order, Product, Incident, Notification } from '../types';
import { demoUsers, demoOrders, demoProducts, demoIncidents, demoNotifications } from '../data/demoData';

interface Store {
  // User
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // Orders
  orders: Order[];
  getOrder: (id: string) => Order | undefined;
  getOrderByCode: (code: string) => Order | undefined;
  
  // Products
  products: Product[];
  searchProducts: (query: string, location?: string) => Product[];
  getProductBySku: (sku: string) => Product | undefined;
  
  // Incidents
  incidents: Incident[];
  getIncidentsByStatus: (status: Incident['status']) => Incident[];
  getIncidentsByCategory: (category: Incident['category']) => Incident[];
  updateIncidentStatus: (id: string, status: Incident['status']) => void;
  
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  markNotificationAsRead: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  
  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useStore = create<Store>((set, get) => ({
  // Initial data
  currentUser: demoUsers[0],
  orders: demoOrders,
  products: demoProducts,
  incidents: demoIncidents,
  notifications: demoNotifications,
  theme: 'dark',
  
  // User actions
  setCurrentUser: (user) => set({ currentUser: user }),
  
  // Order actions
  getOrder: (id) => get().orders.find(order => order.id === id),
  getOrderByCode: (code) => get().orders.find(order => order.orderCode === code),
  
  // Product actions
  searchProducts: (query, location) => {
    const products = get().products;
    return products.filter(product => {
      const matchesQuery = query.toLowerCase().trim() === '' ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.sku.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesLocation = !location || product.location === location;
      
      return matchesQuery && matchesLocation;
    });
  },
  
  getProductBySku: (sku) => get().products.find(product => product.sku === sku),
  
  // Incident actions
  getIncidentsByStatus: (status) => get().incidents.filter(incident => incident.status === status),
  getIncidentsByCategory: (category) => get().incidents.filter(incident => incident.category === category),
  
  updateIncidentStatus: (id, status) => set((state) => ({
    incidents: state.incidents.map(incident =>
      incident.id === id ? { ...incident, status, updatedAt: new Date().toISOString() } : incident
    )
  })),
  
  // Notification actions
  unreadCount: demoNotifications.filter(n => !n.read).length,
  
  markNotificationAsRead: (id) => set((state) => {
    const notifications = state.notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    return {
      notifications,
      unreadCount: notifications.filter(n => !n.read).length
    };
  }),
  
  addNotification: (notification) => set((state) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const notifications = [newNotification, ...state.notifications];
    return {
      notifications,
      unreadCount: notifications.filter(n => !n.read).length
    };
  }),
  
  // Theme actions
  setTheme: (theme) => set({ theme })
}));