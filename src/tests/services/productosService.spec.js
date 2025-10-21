import { productosService } from '../../data/dataService';

describe('ProductosService', () => {
  beforeEach(() => {
    // Limpiar cualquier estado previo si es necesario
  });

  it('debe obtener todos los productos', () => {
    const productos = productosService.getAll();
    expect(Array.isArray(productos)).toBe(true);
    expect(productos.length).toBeGreaterThan(0);
  });

  it('debe obtener producto por ID', () => {
    const producto = productosService.getById('TC001');
    expect(producto).toBeDefined();
    expect(producto.id).toBe('TC001');
  });

  it('debe obtener productos por categoría', () => {
    const productos = productosService.getByCategoria('Tortas Cuadradas');
    expect(Array.isArray(productos)).toBe(true);
    expect(productos.every(p => p.categoria === 'Tortas Cuadradas')).toBe(true);
  });

  it('debe obtener productos en oferta', () => {
    const ofertas = productosService.getOfertas();
    expect(Array.isArray(ofertas)).toBe(true);
    expect(ofertas.every(p => p.enOferta === true)).toBe(true);
  });

  it('debe buscar productos por término', () => {
    const resultados = productosService.buscar('chocolate');
    expect(Array.isArray(resultados)).toBe(true);
    expect(resultados.every(p => 
      p.nombre.toLowerCase().includes('chocolate') ||
      p.descripcion.toLowerCase().includes('chocolate')
    )).toBe(true);
  });
});
