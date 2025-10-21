import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../testUtils';
import ProductCard from '../../components/productos/ProductCard';

describe('ProductCard Component', () => {
  const productoMock = {
    id: 'TC001',
    nombre: 'Torta de Chocolate',
    precio: 15000,
    precioOriginal: 18000,
    imagen: 'test-imagen.jpg',
    categoria: 'Tortas',
    stock: 10,
    enOferta: true
  };

  // Mock function compatible con Jest y Jasmine
  const mockAgregarAlCarrito = typeof jest !== 'undefined' 
    ? jest.fn() 
    : jasmine.createSpy('agregarAlCarrito');

  beforeEach(() => {
    if (typeof jest !== 'undefined') {
      mockAgregarAlCarrito.mockClear();
    } else {
      mockAgregarAlCarrito.calls.reset();
    }
  });

  it('debe renderizar todos los elementos del producto', () => {
    renderWithRouter(
      <ProductCard producto={productoMock} agregarAlCarrito={mockAgregarAlCarrito} />
    );
    
    expect(screen.getByText('Torta de Chocolate')).toBeTruthy();
    expect(screen.getByText('Tortas')).toBeTruthy();
  });

  it('debe ejecutar la función agregarAlCarrito cuando se hace clic', () => {
    renderWithRouter(
      <ProductCard producto={productoMock} agregarAlCarrito={mockAgregarAlCarrito} />
    );
    
    const botonAgregar = screen.getByRole('button', { name: /Añadir/i });
    fireEvent.click(botonAgregar);
    
    expect(mockAgregarAlCarrito).toHaveBeenCalledTimes(1);
    expect(mockAgregarAlCarrito).toHaveBeenCalledWith(productoMock);
  });

  it('debe mostrar badge de oferta cuando enOferta es true', () => {
    renderWithRouter(
      <ProductCard producto={productoMock} agregarAlCarrito={mockAgregarAlCarrito} />
    );
    
    expect(screen.getByText(/¡OFERTA!/i)).toBeTruthy();
  });

  it('debe deshabilitar botón cuando no hay stock', () => {
    const productoSinStock = { ...productoMock, stock: 0 };
    
    renderWithRouter(
      <ProductCard producto={productoSinStock} agregarAlCarrito={mockAgregarAlCarrito} />
    );
    
    const botonAgregar = screen.getByRole('button', { name: /Sin Stock/i });
    expect(botonAgregar.disabled).toBe(true);
  });

  it('debe mostrar precio original tachado cuando está en oferta', () => {
    renderWithRouter(
      <ProductCard producto={productoMock} agregarAlCarrito={mockAgregarAlCarrito} />
    );
    
    const precioOriginal = screen.getByText(/18\.000/i);
    expect(precioOriginal.className).toContain('text-decoration-line-through');
  });
});
