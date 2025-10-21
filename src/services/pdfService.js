import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Función para generar boleta PDF mejorada
export const generarBoletaPDF = (orden, usuario) => {
  const doc = new jsPDF();
  
  // Configuración del documento
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(139, 69, 19); // Color chocolate
  doc.text('PASTELERÍA MIL SABORES', 105, 25, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text('Av. Libertador Bernardo O\'Higgins 1234, Santiago Centro', 105, 35, { align: 'center' });
  doc.text('Tel: +56 2 2345 6789 | Email: contacto@mil-sabores.cl', 105, 42, { align: 'center' });
  doc.text('RUT: 12.345.678-9 | 50 años de tradición', 105, 49, { align: 'center' });
  
  // Línea separadora decorativa
  doc.setDrawColor(255, 182, 193); // Color rosa
  doc.setLineWidth(2);
  doc.line(20, 55, 190, 55);
  
  // Información de la boleta
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(139, 69, 19);
  doc.text('BOLETA DE VENTA', 105, 70, { align: 'center' });
  
  // Información del cliente en una caja
  doc.setFillColor(248, 248, 255);
  doc.rect(20, 80, 170, 50, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(20, 80, 170, 50, 'S');
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('INFORMACIÓN DEL CLIENTE', 25, 90);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  // Usar datos del usuario o datos de envío
  const nombreCompleto = usuario.nombre && usuario.apellidos 
    ? `${usuario.nombre} ${usuario.apellidos}`
    : (usuario.nombre || 'Cliente');
  
  doc.text(`Cliente: ${nombreCompleto}`, 25, 100);
  doc.text(`Email: ${usuario.email || 'No especificado'}`, 25, 107);
  doc.text(`Teléfono: ${usuario.telefono || 'No especificado'}`, 25, 114);
  doc.text(`Fecha: ${new Date(orden.fecha).toLocaleDateString('es-CL')}`, 25, 121);
  doc.text(`N° Orden: ${orden.numeroOrden}`, 25, 128);
  
  // Tabla de productos usando autoTable
  const productosData = orden.productos.map(producto => [
    producto.nombre,
    producto.cantidad,
    `$${producto.precio.toLocaleString('es-CL')}`,
    `$${(producto.precio * producto.cantidad).toLocaleString('es-CL')}`
  ]);
  
  autoTable(doc, {
    startY: 140,
    head: [['Producto', 'Cant.', 'Precio Unit.', 'Total']],
    body: productosData,
    theme: 'grid',
    headStyles: {
      fillColor: [255, 182, 193],
      textColor: [139, 69, 19],
      fontStyle: 'bold'
    },
    bodyStyles: {
      textColor: [0, 0, 0]
    },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 30, halign: 'right' },
      3: { cellWidth: 30, halign: 'right' }
    }
  });
  
  // Obtener la posición final de la tabla
  const finalY = doc.lastAutoTable.finalY + 10;
  
  // Totales en una caja separada
  doc.setFillColor(248, 248, 255);
  doc.rect(120, finalY, 70, 60, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(120, finalY, 70, 60, 'S');
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  
  // Subtotal
  doc.text('Subtotal:', 125, finalY + 10);
  doc.text(`$${(orden.subtotal || 0).toLocaleString('es-CL')}`, 180, finalY + 10, { align: 'right' });
  
  // Descuentos
  if (orden.descuentos && orden.descuentos > 0) {
    doc.text('Descuentos:', 125, finalY + 18);
    doc.text(`-$${orden.descuentos.toLocaleString('es-CL')}`, 180, finalY + 18, { align: 'right' });
  }
  
  // IVA
  doc.text('IVA (19%):', 125, finalY + 26);
  doc.text(`$${(orden.iva || 0).toLocaleString('es-CL')}`, 180, finalY + 26, { align: 'right' });
  
  // Línea separadora
  doc.setDrawColor(200, 200, 200);
  doc.line(125, finalY + 30, 180, finalY + 30);
  
  // Total
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(139, 69, 19);
  doc.text('TOTAL:', 125, finalY + 40);
  doc.text(`$${(orden.total || 0).toLocaleString('es-CL')}`, 180, finalY + 40, { align: 'right' });
  
  // Información adicional
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text(`Método de pago: ${orden.metodoPago || 'No especificado'}`, 125, finalY + 50);
  
  // Pie de página
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text('¡Gracias por tu compra!', 105, finalY + 60, { align: 'center' });
  doc.text('Pastelería Mil Sabores - 50 años de tradición', 105, finalY + 67, { align: 'center' });
  doc.text('Tiempo estimado de entrega: 2-3 días hábiles', 105, finalY + 74, { align: 'center' });
  
  // Guardar el PDF
  const nombreArchivo = `boleta_${orden.numeroOrden}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(nombreArchivo);
};

// Función para generar boleta desde componente React
export const generarBoletaDesdeComponente = (orden, usuario, elementoRef) => {
  if (!elementoRef.current) return;
  
  // Crear un elemento temporal para capturar
  const elemento = elementoRef.current.cloneNode(true);
  elemento.style.position = 'absolute';
  elemento.style.left = '-9999px';
  elemento.style.top = '0';
  elemento.style.width = '800px';
  elemento.style.background = 'white';
  elemento.style.padding = '20px';
  
  document.body.appendChild(elemento);
  
  // Generar PDF usando html2canvas
  import('html2canvas').then(html2canvas => {
    html2canvas.default(elemento, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const nombreArchivo = `boleta_${orden.numeroOrden}_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(nombreArchivo);
      
      // Limpiar elemento temporal
      document.body.removeChild(elemento);
    });
  });
};
