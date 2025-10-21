import { blogsService } from '../../data/dataService';

describe('BlogsService', () => {
  beforeEach(() => {
    // Limpiar cualquier estado previo si es necesario
  });

  it('debe obtener todos los blogs', () => {
    const blogs = blogsService.getAll();
    expect(Array.isArray(blogs)).toBe(true);
    expect(blogs.length).toBeGreaterThan(0);
  });

  it('debe obtener blog por ID', () => {
    const blog = blogsService.getById(1);
    expect(blog).toBeDefined();
    expect(blog.id).toBe(1);
  });
});
