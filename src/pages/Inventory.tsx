import React, { useState } from 'react';
import { Search, Package, MapPin, Barcode } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../utils/formatters';

export const Inventory: React.FC = () => {
  const { searchProducts } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  const products = searchProducts(searchTerm, locationFilter === 'all' ? undefined : locationFilter);

  const locationOptions = [
    { value: 'all', label: 'Todas' },
    { value: 'La Habana', label: 'La Habana' },
    { value: 'Camagüey', label: 'Camagüey' }
  ];

  const getStockLevel = (stock: number) => {
    if (stock === 0) return { label: 'Sin stock', color: '#EF4444' };
    if (stock < 20) return { label: 'Stock bajo', color: '#F59E0B' };
    return { label: 'En stock', color: '#10B981' };
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Inventario</h1>
      </header>

      <div className="search-section">
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-chips">
          {locationOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setLocationFilter(option.value)}
              className={`filter-chip ${locationFilter === option.value ? 'active' : ''}`}
            >
              <MapPin size={14} />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {products.map(product => {
          const stockLevel = getStockLevel(product.stock);
          
          return (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <h3>{product.name}</h3>
                <span 
                  className="stock-badge"
                  style={{ backgroundColor: stockLevel.color }}
                >
                  {product.stock} unidades
                </span>
              </div>

              <p className="product-description">{product.description}</p>

              <div className="product-details">
                <div className="product-detail">
                  <Barcode size={16} />
                  <span>SKU: {product.sku}</span>
                </div>
                <div className="product-detail">
                  <MapPin size={16} />
                  <span>{product.location}</span>
                </div>
              </div>

              <div className="product-footer">
                <span className="product-category">{product.category}</span>
                <span className="product-price">{formatCurrency(product.price)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="empty-state">
          <Package size={48} />
          <h3>No se encontraron productos</h3>
          <p>Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};