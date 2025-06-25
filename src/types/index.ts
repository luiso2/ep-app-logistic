export interface User {
  id: string;
  telegramId: string;
  name: string;
  role: 'admin' | 'warehouse' | 'delivery';
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface Order {
  id: string;
  orderCode: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  items: OrderItem[];
  shippingAddress: Address;
  trackingNumber?: string;
  incidents: Incident[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  recipient?: string;
}

export interface Address {
  street: string;
  city: string;
  province: string;
  country: string;
  postalCode?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  sku: string;
}

export interface Incident {
  id: string;
  orderId: string;
  category: 'damaged' | 'missing' | 'delayed' | 'incorrect' | 'other';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  assignedTo?: string;
  resolution?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  location: 'La Habana' | 'Camagüey';
  image?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'incident' | 'order' | 'inventory';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  relatedId?: string;
}