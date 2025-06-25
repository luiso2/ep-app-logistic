import React, { useState } from 'react';
import { Search, Package, MapPin, Barcode, X, Eye } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../utils/formatters';
import type { Product } from '../types';

export const Inventory: React.FC = () => {
  const { searchProducts } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

      <div className="inventory-grid">
        {products.map(product => {
          const stockLevel = getStockLevel(product.stock);
          
          return (
            <div 
              key={product.id} 
              className="inventory-card"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="inventory-card-header">
                <div className="sku-section">
                  <Barcode size={14} />
                  <span className="sku-text">{product.sku}</span>
                </div>
                <button className="view-details-btn">
                  <Eye size={14} />
                </button>
              </div>
              
              <h4 className="product-name">{product.name}</h4>
              
              <div className="inventory-info">
                <div className="stock-info">
                  <span className="stock-label">Stock:</span>
                  <span 
                    className="stock-value"
                    style={{ color: stockLevel.color }}
                  >
                    {product.stock}
                  </span>
                </div>
                
                <div className="status-info">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: stockLevel.color }}
                  >
                    {stockLevel.label}
                  </span>
                </div>
              </div>
              
              <div className="inventory-footer">
                <span className="category-tag">{product.category}</span>
                <div className="location-info">
                  <MapPin size={12} />
                  <span>{product.location}</span>
                </div>
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

      {selectedProduct && (
        <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalles del Producto</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setSelectedProduct(null)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="modal-section">
                <h3>Información General</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">SKU:</span>
                    <span className="detail-value">{selectedProduct.sku}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Nombre:</span>
                    <span className="detail-value">{selectedProduct.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Categoría:</span>
                    <span className="detail-value">{selectedProduct.category}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Precio:</span>
                    <span className="detail-value">{formatCurrency(selectedProduct.price)}</span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Inventario</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Stock Actual:</span>
                    <span className="detail-value stock-highlight">
                      {selectedProduct.stock} unidades
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Estado:</span>
                    <span 
                      className="detail-value status-highlight"
                      style={{ color: getStockLevel(selectedProduct.stock).color }}
                    >
                      {getStockLevel(selectedProduct.stock).label}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Ubicación:</span>
                    <span className="detail-value">
                      <MapPin size={16} />
                      {selectedProduct.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Descripción</h3>
                <p className="product-description-full">
                  {selectedProduct.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};