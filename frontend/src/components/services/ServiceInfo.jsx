import React from 'react';

export default function ServiceInfo({ product }) {
  return (
    <>
      <p>{product.description}</p>
      <p>
        <span className="font-semibold">Categoria: </span>
        {product.category}
      </p>
    </>
  );
}
