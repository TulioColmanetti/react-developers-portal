import React from 'react';

const PRODUCT_IMAGES_FOLDER = '/img/products/';

export default function ProductImage({ image }) {
  return <img src={PRODUCT_IMAGES_FOLDER + image} alt={image} className="h-48 m-4" />;
}
