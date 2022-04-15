import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Loading from '../components/utils/Loading';
import { apiGetAllProducts } from '../services/apiService';

const PRODUCT_PATH = '/products/';
const PRODUCT_IMAGES_FOLDER = '/img' + PRODUCT_PATH;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      const apiProducts = await apiGetAllProducts();

      setProducts(apiProducts);

      setLoading(false);
    }

    getProducts();
  }, []);

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (!loading) {
    mainJsx = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto">
        {products.map(({ id, name, image }) => {
          return (
            <NavLink
              key={id}
              exact
              to={PRODUCT_PATH + id}
              className="w-56 p-4 bg-gray-200 rounded-lg shadow-md 
              hover:text-yellow-500 hover:scale-105"
            >
              <div className="flex flex-col items-center space-y-1">
                <img src={PRODUCT_IMAGES_FOLDER + image} alt="" className="h-24 m-4" />
                <span className="text-center font-semibold">{name}</span>
              </div>
            </NavLink>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 p-4">
      <h3 className="text-center font-semibold mb-6">Lista de produtos disponíveis no Portal:</h3>
      {mainJsx}
    </div>
  );
}
