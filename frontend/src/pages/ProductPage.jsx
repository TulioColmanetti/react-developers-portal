import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineFilePdf as FilePdfIcon } from 'react-icons/ai';
import { AiOutlineFileZip as FileZipIcon } from 'react-icons/ai';
import { AiOutlineFileUnknown as FileUnknownIcon } from 'react-icons/ai';

import Loading from '../components/Loading';
import Error from '../components/Error';
import { apiGetProductFrom } from '../services/apiService';

const PRODUCT_FILES_FOLDER = '/files/products/';
const PRODUCT_IMAGES_FOLDER = '/img/products/';

export default function ProductPage() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getProduct() {
      try {
        const apiProduct = await apiGetProductFrom(productId);
        // .sort((a, b) => a.name.localeCompare(b.name));
        // .map((city) => ({ ...city, description: city.name }));

        if (apiProduct && apiProduct.length > 0) setProduct(apiProduct[0]);
        else setError('Produto não encontrado!');

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }

    getProduct();
  }, [productId]);

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <h3 className="text-center font-semibold mb-6">{product.name}</h3>
        <div className="w-3/5 mx-auto p-4 bg-gray-200 rounded-lg shadow-md">
          <div className="flex flex-row mx-auto space-x-2">
            <img src={PRODUCT_IMAGES_FOLDER + product.image} alt="" className="h-48 m-4" />
            <div className="flex flex-col">
              <p className="text-justify mb-4">{product.description}</p>
              <p className="text-justify mb-4">
                <span className="font-semibold">Categoria: </span>
                {product.category}
              </p>
              <p className="text-justify mb-4">
                <span className="font-semibold">Modelo: </span>
                {product.model}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <p className="text-center font-semibold mb-4">Arquivos:</p>
              <div className="grid grid-cols-5 gap-4 mx-auto">
                {product.files.map(({ id, name_with_version, archive_name, extension }) => {
                  return (
                    <a
                      key={id}
                      href={PRODUCT_FILES_FOLDER + archive_name}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center space-y-1"
                    >
                      {extension.toLowerCase() == 'zip' && <FileZipIcon size="2rem" />}
                      {extension.toLowerCase() == 'pdf' && <FilePdfIcon size="2rem" />}
                      {!['zip', 'pdf'].includes(extension.toLowerCase()) && <FileUnknownIcon size="2rem" />}
                      <span className="text-center ">{name_with_version}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <div className="flex flex-col space-y-2 p-4">{mainJsx}</div>;
}
