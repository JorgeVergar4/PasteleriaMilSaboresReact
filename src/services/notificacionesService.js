// Servicio para manejar notificaciones de pedidos
export class NotificacionesService {
  constructor() {
    this.notificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
  }

  // Crear nueva notificación
  crear(notificacion) {
    const nuevaNotificacion = {
      id: Date.now(),
      fecha: new Date(),
      leida: false,
      ...notificacion
    };
    
    this.notificaciones.unshift(nuevaNotificacion);
    this.guardar();
    return nuevaNotificacion;
  }

  // Obtener notificaciones por usuario
  getByUsuario(usuarioId) {
    return this.notificaciones.filter(n => n.usuarioId === usuarioId);
  }

  // Marcar como leída
  marcarLeida(id) {
    const notificacion = this.notificaciones.find(n => n.id === id);
    if (notificacion) {
      notificacion.leida = true;
      this.guardar();
    }
  }

  // Marcar todas como leídas
  marcarTodasLeidas(usuarioId) {
    this.notificaciones.forEach(n => {
      if (n.usuarioId === usuarioId) {
        n.leida = true;
      }
    });
    this.guardar();
  }

  // Obtener cantidad de notificaciones no leídas
  getNoLeidas(usuarioId) {
    return this.notificaciones.filter(n => n.usuarioId === usuarioId && !n.leida).length;
  }

  // Guardar en localStorage
  guardar() {
    localStorage.setItem('notificaciones', JSON.stringify(this.notificaciones));
  }

  // Simular actualización de estado de pedido
  actualizarEstadoPedido(ordenId, nuevoEstado) {
    const estados = {
      'confirmado': {
        titulo: 'Pedido Confirmado',
        mensaje: 'Tu pedido ha sido confirmado y está siendo preparado.',
        icono: 'bi-check-circle',
        color: '#28a745'
      },
      'preparando': {
        titulo: 'Preparando tu Pedido',
        mensaje: 'Nuestros chefs están preparando tus productos con amor.',
        icono: 'bi-egg-fried',
        color: '#ffc107'
      },
      'listo': {
        titulo: 'Pedido Listo',
        mensaje: 'Tu pedido está listo para ser enviado.',
        icono: 'bi-check2-all',
        color: '#17a2b8'
      },
      'enviado': {
        titulo: 'Pedido Enviado',
        mensaje: 'Tu pedido está en camino hacia tu dirección.',
        icono: 'bi-truck',
        color: '#6f42c1'
      },
      'entregado': {
        titulo: 'Pedido Entregado',
        mensaje: '¡Tu pedido ha sido entregado exitosamente!',
        icono: 'bi-gift',
        color: '#28a745'
      }
    };

    const estadoInfo = estados[nuevoEstado];
    if (estadoInfo) {
      // En una app real, aquí buscarías el usuario del pedido
      // Por ahora simulamos con un usuario genérico
      this.crear({
        tipo: 'pedido',
        ordenId: ordenId,
        usuarioId: 1, // En una app real esto vendría del pedido
        titulo: estadoInfo.titulo,
        mensaje: estadoInfo.mensaje,
        icono: estadoInfo.icono,
        color: estadoInfo.color,
        estado: nuevoEstado
      });
    }
  }
}

export const notificacionesService = new NotificacionesService();
