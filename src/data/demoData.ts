import type { User, Order, Product, Incident, Notification } from '../types';

export const demoUsers: User[] = [
  {
    id: '1',
    telegramId: '123456789',
    name: 'Juan Pérez',
    role: 'admin',
    email: 'juan@esencialpack.com',
    phone: '+53 5 1234567'
  },
  {
    id: '2',
    telegramId: '987654321',
    name: 'María García',
    role: 'warehouse',
    email: 'maria@esencialpack.com',
    phone: '+53 5 7654321'
  }
];

export const demoOrders: Order[] = [
  {
    id: 1,
    orderCode: 'EP-2025-001',
    status: 'processing',
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-15T14:45:00Z',
    customer: {
      id: '1',
      name: 'Roberto Martínez',
      email: 'roberto@email.com',
      phone: '+53 5 9876543',
      recipient: 'Ana Martínez'
    },
    items: [
      {
        id: '1',
        productId: '1',
        productName: 'Combo Familiar Básico',
        quantity: 1,
        price: 150,
        sku: 'HB-CFB-001'
      },
      {
        id: '2',
        productId: '2',
        productName: 'Pack de Aseo Personal',
        quantity: 2,
        price: 45,
        sku: 'HB-PAP-002'
      }
    ],
    shippingAddress: {
      street: 'Calle 23 #456 e/ 10 y 12',
      city: 'La Habana',
      province: 'La Habana',
      country: 'Cuba',
      postalCode: '10400'
    },
    trackingNumber: 'EP001234567CU',
    incidents: [
      {
        id: '1',
        orderId: 1,
        category: 'delayed',
        status: 'open',
        priority: 'high',
        description: 'El cliente reporta que no ha recibido el pedido en la fecha estimada',
        createdAt: '2025-01-16T09:00:00Z',
        updatedAt: '2025-01-16T09:00:00Z',
        createdBy: '2'
      }
    ]
  },
  {
    id: 2,
    orderCode: 'EP-2025-002',
    status: 'shipped',
    createdAt: '2025-01-14T08:00:00Z',
    updatedAt: '2025-01-16T11:00:00Z',
    customer: {
      id: '2',
      name: 'Elena Rodríguez',
      email: 'elena@email.com',
      phone: '+53 7 1234567',
      recipient: 'Pedro Rodríguez'
    },
    items: [
      {
        id: '3',
        productId: '3',
        productName: 'Combo Premium Plus',
        quantity: 1,
        price: 280,
        sku: 'CM-CPP-003'
      }
    ],
    shippingAddress: {
      street: 'Ave. República #123',
      city: 'Camagüey',
      province: 'Camagüey',
      country: 'Cuba',
      postalCode: '70100'
    },
    trackingNumber: 'EP001234568CU',
    incidents: []
  },
  {
    id: 3,
    orderCode: 'EP-2025-003',
    status: 'delivered',
    createdAt: '2025-01-10T14:30:00Z',
    updatedAt: '2025-01-13T16:00:00Z',
    customer: {
      id: '3',
      name: 'Carlos Fernández',
      email: 'carlos@email.com',
      phone: '+53 5 5551234'
    },
    items: [
      {
        id: '4',
        productId: '4',
        productName: 'Pack Medicinas Esenciales',
        quantity: 1,
        price: 95,
        sku: 'HB-PME-004'
      }
    ],
    shippingAddress: {
      street: 'Calle Martí #789',
      city: 'La Habana',
      province: 'La Habana',
      country: 'Cuba'
    },
    incidents: []
  }
];

export const demoProducts: Product[] = [
  {
    id: '1',
    sku: 'HB-CFB-001',
    name: 'Combo Familiar Básico',
    description: 'Incluye arroz, frijoles, aceite, azúcar y productos básicos para una familia',
    category: 'Alimentos',
    price: 150,
    stock: 45,
    location: 'La Habana',
    image: '/images/combo-basico.jpg'
  },
  {
    id: '2',
    sku: 'HB-PAP-002',
    name: 'Pack de Aseo Personal',
    description: 'Jabón, champú, pasta dental, papel higiénico y artículos de higiene',
    category: 'Aseo',
    price: 45,
    stock: 120,
    location: 'La Habana',
    image: '/images/pack-aseo.jpg'
  },
  {
    id: '3',
    sku: 'CM-CPP-003',
    name: 'Combo Premium Plus',
    description: 'Combo completo con carnes, productos gourmet y artículos especiales',
    category: 'Alimentos',
    price: 280,
    stock: 15,
    location: 'Camagüey',
    image: '/images/combo-premium.jpg'
  },
  {
    id: '4',
    sku: 'HB-PME-004',
    name: 'Pack Medicinas Esenciales',
    description: 'Medicamentos básicos, vitaminas y suplementos',
    category: 'Salud',
    price: 95,
    stock: 30,
    location: 'La Habana',
    image: '/images/pack-medicinas.jpg'
  },
  {
    id: '5',
    sku: 'CM-PBB-005',
    name: 'Pack Bebé Completo',
    description: 'Pañales, leche en polvo, y productos para bebé',
    category: 'Bebé',
    price: 125,
    stock: 25,
    location: 'Camagüey',
    image: '/images/pack-bebe.jpg'
  },
  {
    id: '6',
    sku: 'HB-CEE-006',
    name: 'Combo Escolar Esencial',
    description: 'Útiles escolares, mochilas y materiales educativos',
    category: 'Escolar',
    price: 75,
    stock: 60,
    location: 'La Habana',
    image: '/images/combo-escolar.jpg'
  }
];

export const demoIncidents: Incident[] = [
  {
    id: '1',
    orderId: 1,
    category: 'delayed',
    status: 'open',
    priority: 'high',
    description: 'El cliente reporta que no ha recibido el pedido en la fecha estimada',
    createdAt: '2025-01-16T09:00:00Z',
    updatedAt: '2025-01-16T09:00:00Z',
    createdBy: '2'
  },
  {
    id: '2',
    orderId: 4,
    category: 'damaged',
    status: 'resolved',
    priority: 'medium',
    description: 'Producto llegó con el empaque dañado, pero el contenido está intacto',
    createdAt: '2025-01-15T11:30:00Z',
    updatedAt: '2025-01-15T15:00:00Z',
    createdBy: '1',
    assignedTo: '2',
    resolution: 'Se ofreció descuento del 10% al cliente. Cliente satisfecho.'
  },
  {
    id: '3',
    orderId: 5,
    category: 'missing',
    status: 'in_progress',
    priority: 'urgent',
    description: 'Falta uno de los productos del combo (aceite de cocina)',
    createdAt: '2025-01-16T13:00:00Z',
    updatedAt: '2025-01-16T14:30:00Z',
    createdBy: '2',
    assignedTo: '1'
  }
];

export const demoNotifications: Notification[] = [
  {
    id: '1',
    userId: '2',
    type: 'incident',
    title: 'Nueva incidencia asignada',
    message: 'Se te ha asignado la incidencia #3 - Producto faltante',
    read: false,
    createdAt: '2025-01-16T13:05:00Z',
    relatedId: '3'
  },
  {
    id: '2',
    userId: '1',
    type: 'order',
    title: 'Nuevo pedido recibido',
    message: 'Pedido EP-2025-004 listo para procesar',
    read: false,
    createdAt: '2025-01-16T12:00:00Z',
    relatedId: '4'
  },
  {
    id: '3',
    userId: '2',
    type: 'inventory',
    title: 'Stock bajo',
    message: 'El producto "Combo Premium Plus" tiene solo 15 unidades',
    read: true,
    createdAt: '2025-01-16T08:00:00Z',
    relatedId: '3'
  }
];