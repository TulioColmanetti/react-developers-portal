import React from 'react';

const SERVICE_IMAGES_FOLDER = '/img/services/';

export default function ServiceImage({ image }) {
  return <img src={SERVICE_IMAGES_FOLDER + image} alt={image} className="h-48 m-4" />;
}
