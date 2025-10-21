import { categoriasService } from '../../data/dataService';

describe('CategoriasService', () => {
  beforeEach(() => {
    // Limpiar cualquier estado previo si es necesario
  });

  it('debe obtener todas las categorías', () => {
    const categorias = categoriasService.getAll();
    expect(Array.isArray(categorias)).toBe(true);
    expect(categorias.length).toBeGreaterThan(0);
  });

  it('debe obtener categoría por ID', () => {
    const categoria = categoriasService.getById(1);
    expect(categoria).toBeDefined();
    expect(categoria.id).toBe(1);
  });

  it('debe crear una nueva categoría', () => {
    const nuevaCategoria = {
      nombre: 'Test Category',
      descripcion: 'Test Description',
      icono: 'bi-test'
    };
    
    const categoria = categoriasService.create(nuevaCategoria);
    expect(categoria).toBeDefined();
    expect(categoria.id).toBeDefined();
  });
});
