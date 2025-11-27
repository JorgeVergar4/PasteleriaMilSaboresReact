import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';

function ApiTest() {
  console.log('ApiTest se ha montado');

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect de ApiTest se ejecuta');

    async function loadProducts() {
      try {
        const data = await getProducts();
        console.log('Productos recibidos:', data);
        setProducts(data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Productos desde API</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id || p._id || p.name}>
            {p.name || p.titulo || JSON.stringify(p)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApiTest;
