import { ordenesService } from '../../data/dataService';

describe('OrdenesService', () => {
  // localStorage ya está mockeado globalmente en setupTests.js

  it('debe obtener todas las órdenes', () => {
    const ordenes = ordenesService.getAll();
    expect(Array.isArray(ordenes)).toBe(true);
  });

  it('debe crear una nueva orden', () => {
    const nuevaOrden = {
      usuarioId: 1,
      productos: [],
      subtotal: 100000,
      descuentos: 0,
      iva: 19000,
      total: 119000,
      metodoPago: 'tarjeta',
      estado: 'pendiente'
    };
    
    const orden = ordenesService.create(nuevaOrden);
    expect(orden).toBeDefined();
    expect(orden.id).toBeDefined();
    expect(orden.numeroOrden).toBeDefined();
    expect(orden.fecha).toBeDefined();
    expect(orden.estado).toBe('pendiente');
  });

  it('debe obtener estadísticas correctamente', () => {
    const estadisticas = ordenesService.getEstadisticas();
    expect(estadisticas).toBeDefined();
    expect(typeof estadisticas.totalOrdenes).toBe('number');
    expect(typeof estadisticas.totalVentas).toBe('number');
    expect(typeof estadisticas.ventasHoy).toBe('number');
  });
});
