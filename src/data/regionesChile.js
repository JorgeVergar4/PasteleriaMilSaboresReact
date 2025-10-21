// Regiones de Chile para el selector
export const regionesChile = [
  { codigo: 'RM', nombre: 'Región Metropolitana de Santiago' },
  { codigo: 'I', nombre: 'Región de Tarapacá' },
  { codigo: 'II', nombre: 'Región de Antofagasta' },
  { codigo: 'III', nombre: 'Región de Atacama' },
  { codigo: 'IV', nombre: 'Región de Coquimbo' },
  { codigo: 'V', nombre: 'Región de Valparaíso' },
  { codigo: 'VI', nombre: 'Región del Libertador General Bernardo O\'Higgins' },
  { codigo: 'VII', nombre: 'Región del Maule' },
  { codigo: 'VIII', nombre: 'Región del Biobío' },
  { codigo: 'IX', nombre: 'Región de La Araucanía' },
  { codigo: 'X', nombre: 'Región de Los Lagos' },
  { codigo: 'XI', nombre: 'Región Aysén del General Carlos Ibáñez del Campo' },
  { codigo: 'XII', nombre: 'Región de Magallanes y de la Antártica Chilena' },
  { codigo: 'XIV', nombre: 'Región de Los Ríos' },
  { codigo: 'XV', nombre: 'Región de Arica y Parinacota' },
  { codigo: 'XVI', nombre: 'Región de Ñuble' }
];

// Función para buscar regiones por nombre
export const buscarRegiones = (termino) => {
  if (!termino) return regionesChile;
  return regionesChile.filter(region => 
    region.nombre.toLowerCase().includes(termino.toLowerCase())
  );
};
