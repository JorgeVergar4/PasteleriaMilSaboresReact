import { usuariosService } from '../../data/dataService';

describe('UsuariosService', () => {
  beforeEach(() => {
    // Limpiar cualquier estado previo si es necesario
  });

  it('debe obtener todos los usuarios', () => {
    const usuarios = usuariosService.getAll();
    expect(Array.isArray(usuarios)).toBe(true);
    expect(usuarios.length).toBeGreaterThan(0);
  });

  it('debe obtener usuario por ID', () => {
    const usuario = usuariosService.getById(1);
    expect(usuario).toBeDefined();
    expect(usuario.id).toBe(1);
  });

  it('debe obtener usuario por email', () => {
    const usuario = usuariosService.getByEmail('Test@pasteleria.cl');
    expect(usuario).toBeDefined();
    expect(usuario.email).toBe('Test@pasteleria.cl');
  });

  it('debe hacer login correctamente', () => {
    const usuario = usuariosService.login('Test@pasteleria.cl', '123456');
    expect(usuario).toBeDefined();
    expect(usuario.password).toBeUndefined();
  });

  it('debe fallar el login con credenciales incorrectas', () => {
    const usuario = usuariosService.login('Test@pasteleria.cl', 'wrongpassword');
    expect(usuario).toBeNull();
  });
});
