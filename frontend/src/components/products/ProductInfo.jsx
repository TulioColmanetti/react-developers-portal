import React from 'react';

export default function ProductInfo({ product }) {
  return (
    <>
      <p>{product.description}</p>
      <p>
        <span className="font-semibold">Categoria: </span>
        {product.category}
      </p>
      <p>
        <span className="font-semibold">Modelo: </span>
        {product.model}
      </p>
    </>
  );
}
